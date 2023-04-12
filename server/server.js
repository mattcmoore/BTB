const express = require("express");
const morgan = require("morgan");
const postgres = require("postgres");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { sq } = require("date-fns/locale");
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth, sendEmailVerification,createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, signOut } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMJF54HDsaSJ6k4OrVZ9EK796i18zAzVE",
  authDomain: "barracks-to-boardroom.firebaseapp.com",
  projectId: "barracks-to-boardroom",
  storageBucket: "barracks-to-boardroom.appspot.com",
  messagingSenderId: "72331003800",
  appId: "1:72331003800:web:c139c86d8e26a48ad6cded",
  measurementId: "G-HZRVT2BDF9",
};

// Initialize Firebase
const init = initializeApp(firebaseConfig);

const auth = getAuth(init);

dotenv.config();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY || "my_secret_key";
const saltRounds = 10;

const app = express();
const sql = postgres(process.env.DATABASE_URL);

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors("*"));
app.use(cookieParser());

app.use(express.static("../dist"));


app.get("/classes", async (req, res) => {
  try {
    console.log("Fetching classes...");
    const data = await sql`SELECT * FROM mcsps`;
    console.log("Classes fetched:", data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.json(error);
  }
});

app.post("/createNewClass", async (req, res) => {
  const { start_date, end_date, code, mcsp_name } = req.body;
  try {
    // Insert the new class into the database
    const data = await sql`
      INSERT INTO mcsps (start_date, end_date, code, mcsp_name)
      VALUES (${start_date},${end_date},${code},${mcsp_name})
      RETURNING id`;
    const classId = data[0].id;

    res.json({ msg: "Class created", classId });
  } catch (error) {
    res.status(500).json({ msg: "Failed to create class" });
  }
});


app.post("/makeStudent", async (req, res) => {
  const {
    code,
    name,
    email,
    password,
    separationDate,
    branch,
    hasFamily,
    livesInBarracks,
  } = req.body;
  const emailsInUse = await sql`
  SELECT email FROM users
  `;
  let emailNotUsed = true;
  emailsInUse.forEach((elem) => {
    if (elem.email === email) {
      emailNotUsed = false;
    }
  });
  if (emailNotUsed) {
    const codes = await sql`
      SELECT id, code FROM mcsps
      `;
    let classId = null;
    console.log(codes);
    codes.forEach((element) => {
      if (element.code === code) {
        classId = element.id;
      }
    });
    if (classId) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          updateProfile(auth.currentUser, {
            displayName: name
          })
          // ...
          onAuthStateChanged(auth, async user=>{
            console.log('first')
            const data = await sql`
                   INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks)
                   VALUES (${email}, ${password}, ${name}, false, ${classId}, ${separationDate}, ${branch}, ${hasFamily}, ${livesInBarracks}) returning id, admin, name, email
                   `;
            const userId = data[0];
            res.json({ ...userId, msg: "logged in" });
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          res.json(error)
          // ..
        });
    } else {
      res.json({ msg: "Invalid code" });
    }
  } else {
    res.json({ msg: "Email in use" });
  }
});

app.post("/makeAdmin", async (req, res) => {
  const { email, name } = req.body;
  const password = 'G4L1V1B0iz4Life'
  const emailsInUse = await sql`
  SELECT email FROM users
  `;
  let emailNotUsed = true;
  emailsInUse.forEach((elem) => {
    if (elem.email === email) {
      emailNotUsed = false;
    }
  });
  if (emailNotUsed) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          updateProfile(auth.currentUser, {
            displayName: name
          })
          // ...
          onAuthStateChanged(auth, async user=>{
            const data = await sql`
                  INSERT INTO users (email, password, name, admin)
                  VALUES (${email}, ${password}, ${name}, true) returning id
                  `;
            const userId = data[0].id;
            res.json({ msg: "Admin created", userId });
          })
        })
  } else {
    res.json({ msg: "Email in use" });
  }
});

app.patch("/updateAdmin", async (req, res) => {
  const { email, name, id } = req.body;
  await bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      res.status(500).json({ msg: "Error hashing password" });
    } else {
      try {
        await sql`
            UPDATE users
            SET email = ${email},
            name = ${name}
            WHERE id = ${id}
            `;
        res.json({ msg: "Admin Edited" });
      } catch (error) {
        res.status(500).json({ msg: "Failed" });
      }
    }
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const emails = await sql`
   SELECT email, password, admin, id, name FROM users
   `;
  let exists = false;
  let hash = "";
  let admin = null;
  let name = "";
  let userId ;
  emails.forEach((mail) => {
    if (mail.email === email) {
      exists = true;
      hash = mail.password;
      admin = mail.admin;
      userId = mail.id;
      name = mail.name;
    }
  });
  const payload = { name: name, userId: userId, admin: admin };
  if (exists) {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    onAuthStateChanged(auth, user=>{
      console.log("first")
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      res.cookie("jwt", token);
      res.json({ msg: "logged in", ...payload });
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.json({ msg: "Email or password does not exist" });
  });
}
});

app.get("/checkToken", async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    // If JWT exists, decode it
    try {
      const decoded = jwt.verify(token, secretKey);
      const userId = decoded;
      res.json({ msg: "Success", ...userId });
    } catch (error) {
      // If JWT is invalid or has expired, clear the cookie and redirect to login page
      res.clearCookie("jwt");
      res.json({ msg: "Jwt expired" });
    }
  } else {
    // If JWT does not exist, redirect to login page
    res.json({ msg: "No jwt" });
  }
});

app.get("/logOut", (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ msg: "logged out" });
  } catch (error) {
    res.json({ msg: "Not logged in" });
  }
});

app.get("/test", (req, res) => {
  res.send("working");
});

app.get("/tasks/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const data = await sql`SELECT * FROM tasks WHERE user_id = ${id}`;
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

app.get('/admins', async (req, res) => {
   try{
      const data = await sql `SELECT * FROM users WHERE admin = true`
      console.log(data)
      res.json(data)
   } catch(error){
      res.json(error)
   }
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
