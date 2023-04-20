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
const {
  getAuth,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
} = require("firebase/auth");
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
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

app.use(express.static("../dist"));

app.get("/accordian", async (req, res) => {
  try {
    console.log('fetching data..');
    const data = await sql `
SELECT 
    m.mcsp_name AS mcsp_name,
    u.id AS user_id,
    u.name AS user_name,
    u.admin AS admin,
    u.mcsp AS mcsp,
    m.start_date AS start_date,
    m.end_date AS end_date,
    COUNT(t.complete) FILTER (WHERE t.complete = true) AS task_complete,
    COUNT(t.task) AS total,
    array_agg(t.task) AS tasks
FROM mcsps m
LEFT JOIN users u ON m.id = u.mcsp
LEFT JOIN tasks t ON u.id = t.user_id
GROUP BY m.mcsp_name, u.id, u.name, u.admin, u.mcsp, m.start_date, m.end_date;

    `

    const formattedData = data.map(item => ({
      ...item,
      task_complete: Number(item.task_complete),
      total: Number(item.total)
    }));
    
    res.json(formattedData);
    console.log(formattedData);
    
  } catch(err){

    
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});




function subtractDays(dateString, days) {
  // Convert the 'yyyy-mm-dd' string to a Date object
  const date = new Date(dateString);

  // Subtract the desired number of days
  date.setDate(date.getDate() - days);

  // Convert the new Date object back to the 'yyyy-mm-dd' format
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

app.route('/notes/:id').get( async (req, res) => {
   console.log('hit')
   const { id } = req.params
   try {
       const data = await sql`SELECT * FROM notes WHERE author = ${id}`
       res.json(data)
   } catch (error) {
       res.json(error)
   }
})

app.route('/accordian/:mcspName').delete( async (req, res) => {
  const {mcspName} = req.params;
  try {
    // Use your database connection to delete the mcsp_name from the mscps table
    const deleteMSCP = await sql `DELETE FROM mcsps WHERE mcsp_name = ${mcspName} RETURNING id`
    res.json(mcspName); // Send a successful response with status code 204 (No Content)
  } catch (err) {
    console.error('Error deleting mcsp:', err);
    res.sendStatus(500); // Send an error response with status code 500 (Internal Server Error)
  }
});

app.route('/tasks/:id').get( async (req, res) => {
  console.log('tasks hit')
  const { id } = req.params
  try {
    const data = await sql`SELECT * FROM tasks WHERE user_id = ${id}`
    res.json(data)
    console.log(data)
  }
  catch(error) {
    res.json(error)
  }
})

app.route('/notes').post( async (req, res) => {
   const { body, date, author } = req.body
   try {
      const newNote = await sql`INSERT INTO notes(body, date, author) VALUES (${body}, ${date}, ${author})`
      res.json(newNote)
   } catch(err) {
      console.log(err)
   }
})

app.route('/notes/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body, date, author } = req.body
  try {
    const editNote = await sql`UPDATE notes SET body = ${body}, date = ${date}, author = ${author} WHERE id = ${id} RETURNING id`
    res.json(editNote)
  } catch(err) {
    console.error(err)
  }
})

app.route('/notes/:id').delete( async (req, res) => {
  const { id } = req.params

  console.log(typeof id)
  try{
    const deleteNote = await sql`DELETE FROM notes WHERE id = ${id} RETURNING id`
    res.json(deleteNote)
  } catch(err) {
    console.error(err)
  }
})

app.route('/tasks/:id').put( async (req, res) => {
  const { id } = req.params
  const parseId = parseInt(id, 10)
  try {
    const currentTask = await sql`SELECT complete FROM tasks WHERE id = ${parseId}`
    const currentCompleteValue = currentTask[0].complete
    const newCompleteValue = !currentCompleteValue
    const completeTask = await sql`UPDATE tasks SET complete = ${newCompleteValue} WHERE id = ${id} RETURNING id`
    res.json(completeTask)
  } catch(err) {
    console.error(err)
  }
})

app.route('/users/:id').get( async ( req, res ) => {
  const { id } = req.params;
  const parseUserId = parseInt(id, 10)
  try {
    const data = await sql`SELECT * FROM users WHERE id = ${parseUserId}`
    res.json(data)
    console.log('student user fetched')
    console.log(data)
  } catch(error) {
    console.error(error)
    console.log('unable to fetch student user')
  }
})

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
    chat_history
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
            displayName: name,
          });
          // ...
          onAuthStateChanged(auth, async (user) => {
            console.log("first");
            const data = await sql`
                   INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks, chat_history)
                   VALUES (${email}, ${name}, false, ${classId}, ${separationDate}, ${branch}, ${hasFamily}, ${livesInBarracks}, ${chat_history}) returning id, admin, name, email
                   `;
            const userId = data[0];
            const sixMonths = subtractDays(separationDate, 180);
            const sixTasks = [
              "Decide whether to take transition leave or sell back your leave balance. If taking transition leave, prepare a branch-specific leave form",
              "If you plan to relocate upon separation, inquire for transportation counseling for your household goods",
              "Review/update and acquire your military documents, LES, SGLI, Certifications",
              "Schedule a Physical Evaluation appointment",
              "Review your clothing record and clean your gear for CIF turn-in",
              "Obtain copies of your Medical Records",
              "If retiring, meet with your service retirement officer",
            ];
            sixTasks.forEach(async (task) => {
              await sql`
              INSERT INTO tasks (task, complete, due, user_id)
              VALUES (${task}, false, ${sixMonths}, ${userId.id})
              `;
            });
            const threeMonths = subtractDays(separationDate, 90);
            const threeTasks = [
              "Attend briefings relevant to out-processing",
              "If taking transition leave, secure your leave form",
              "Contact medical facility to get copies of medical & dental records",
              "Complete dental and physical examinations",
              "Inquire/secure separation orders",
              "Research VA insurance coverage and other health insurance options if not sure of eligibility",
            ];
            threeTasks.forEach(async (task) => {
              await sql`
              INSERT INTO tasks (task, complete, due, user_id)
              VALUES (${task}, false, ${threeMonths}, ${userId.id})
              `;
            });
            const twoMonths = subtractDays(separationDate, 60);
            const twoTasks = [
              "Acquire your separation orders and if taking leave, leave form, make 15 copies for distribution",
              "Review your clothing record and inspect gear for CIF turn-in, or turn-in CIF gear",
              "If taking leave, begin clearing the installation",
              "Finalize relocation appointments and review benefits",
              "Begin to prepare disability claim with local VSO (if applicable and not completed previously)",
            ];
            twoTasks.forEach(async (task) => {
              await sql`
              INSERT INTO tasks (task, complete, due, user_id)
              VALUES (${task}, false, ${twoMonths}, ${userId.id})
              `;
            });
            const oneMonth = subtractDays(separationDate, 30);
            const oneTasks = [
              "Review your military records for accuracy. Request corrections, if necessary (awards, deployments, DOR).",
              "If not taking leave, begin clearing the installation",
              "Turn in your central issue (CIF)",
              "Finalize medical processes on post",
              "Review your disability claim (if applicable)",
              "Review your plan for life after the military",
              "Finalize unit clearing",
              "Finalize installation clearing",
              "Pick up DD-214 and make copies, store in a safe location",
              "Establish your local VA centers (Emergency and Clinic)",
              "Communicate ETS Ceremony with your unit (if needed)",
              "Communicate with local VSO",
              "Contact VA for benefits enrollment/verification",
            ];
            oneTasks.forEach(async (task) => {
              await sql`
              INSERT INTO tasks (task, complete, due, user_id)
              VALUES (${task}, false, ${oneMonth}, ${userId.id})
              `;
            });
            const token = jwt.sign(userId, secretKey, { expiresIn: "1h" });
            res.json({ msg: "logged in", ...userId, token: token });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          res.json(error);
          // ..
        });
    } else {
      res.json({ msg: "Invalid code" });
    }
  } else {
    res.json({ msg: "Email in use" });
  }
});

app.get('/admins/:id', async (req, res) => {
  const { id } = req.params
  try{
     const data = await sql `SELECT * FROM users WHERE admin = true AND id != ${id}`
     res.json(data)
  } catch(error){
     res.json(error)
  }
})

app.post("/makeAdmin", async (req, res) => {
  const { email, name } = req.body;
  const password = "G4L1V1B0iz4Life";
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
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        // ...
        onAuthStateChanged(auth, async (user) => {
          const data = await sql`
                  INSERT INTO users (email, name, admin)
                  VALUES (${email}, ${name}, true) returning id
                  `;
          const userId = data[0].id;
          res.json({ msg: "Admin created", userId });
        });
      }
    );
  } else {
    res.json({ msg: "Email in use" });
  }
});

app.patch("/updateAdmin", async (req, res) => {
  const { email, name, mcsp, id } = req.body;
  try {
    await sql`
            UPDATE users
            SET email = ${email},
            name = ${name},
            mcsp = ${mcsp}
            WHERE id = ${id}
            `;
    res.json({ msg: "Admin Edited" });
  } catch (error) {
    res.status(500).json({ msg: "Failed" });
  }
});

app.delete("/updateAdmin/:id", async (req, res) => {
  const {id} = req.params
  try{
    const data = await sql `DELETE FROM users WHERE id = ${id}`
    // res.json(data)  
  }catch(error){
    res.status(500).json({msg: "Failed"})
  }

})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const emails = await sql`
   SELECT email, admin, id, name FROM users
   `;
  let exists = false;
  let admin = null;
  let name = "";
  let e = "";
  let userId;
  emails.forEach((mail) => {
    if (mail.email === email) {
      exists = true;
      admin = mail.admin;
      e = mail.email;
      userId = mail.id;
      name = mail.name;
    }
  });
  const payload = { name: name, email: email, userId: userId, admin: admin };
  if (exists) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        onAuthStateChanged(auth, (user) => {
          console.log("first");
          const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
          res.json({ msg: "logged in", ...payload, token: token });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json({ msg: "Email or password does not exist" });
      });
  }
});

app.post("/checkToken", async (req, res) => {
  const { jwt } = req.body;
  if (jwt) {
    // If JWT exists, decode it
    try {
      const decoded = jwt.verify(jwt, secretKey);      
      const userId = decoded;
      res.json({ msg: "Success", ...userId });
    } catch (error) {
      // If JWT is invalid or has expired, clear the cookie and redirect to login page
      res.json({ msg: "Jwt expired" });
    }
  } else {
    // If JWT does not exist, redirect to login page
    res.json({ msg: "No jwt" });
  }
});

app.post("/resetPass", async (req, res) => {
  const { email } = req.body;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      res.status(200).json({ msg: "sent" });
    })
    .catch((error) => {
      res.status(404).json({ ...error });
    });
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
    res.status(500).json({error: 'server error'})
  }
});

app.get('/messages/:to/:from', async (req, res) => {
  let { to, from } = req.params

  try {
      const data = await sql
        `SELECT * FROM messages
        WHERE (to_user = ${to} AND from_user = ${from}) 
        OR (to_user = ${from} AND from_user = ${to})
        ORDER BY date DESC`;
      res.json(data)
  } catch (error) {
      res.status(500).json({error: 'server error'})
  }
})

app.post('/messages', async (req, res) => {
  let { to, from, body } = req.body

  try {
    const data = await sql
      `INSERT INTO messages
      (to_user, from_user, body, date)
      VALUES 
      (${to}, ${from}, ${body}, NOW())`;
    res.json(data)
  } catch (error) {
    res.status(500).json({error: 'server error'})
  }
})

app.post('/usersSearch/', async (req, res) => {
  let { search } = req.body

  try {
    const data = await sql
      `SELECT name, id 
      FROM users 
      WHERE name ILIKE ${'%' + search + '%'}`;

    res.json(data)
  } catch (error) {
    res.status(500).json({error: 'server error'})
  }
})

app.get('/chatHistory/:user', async (req, res) => {
  let { user } = req.params

  try {
    const data = await sql
      `SELECT users.name, messages.to_user 
      FROM messages 
      JOIN users ON messages.to_user = users.id 
      WHERE from_user = ${user} 
      UNION SELECT users.name, messages.from_user 
      FROM messages 
      JOIN users ON messages.from_user = users.id 
      WHERE to_user = ${user};`

    res.json(data)
  } catch (error) {
    res.status(500).json({error: 'server error'})
  }
})

app.listen(PORT, () => {
   console.log(`listening on port ${PORT}`)
})