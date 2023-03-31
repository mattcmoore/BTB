const express = require('express')
const morgan = require('morgan')
const postgres = require('postgres')
const dotenv = require('dotenv')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const { sq } = require('date-fns/locale')


dotenv.config()
const PORT = process.env.PORT || 3000
const secretKey = process.env.SECRET_KEY || 'my_secret_key'
const saltRounds = 10

const app = express()
const sql = postgres(process.env.DATABASE_URL)

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors('*'))
app.use(cookieParser())

app.use(express.static('../dist'))

app.post('/makeStudent', async (req,res)=>{
   const {code, name, email, password, separationDate, branch, hasFamily, livesInBarracks} = req.body
   const codes = await sql`
   SELECT id, code FROM mcsps
   `
   let classId = null
   console.log(codes)
   codes.forEach(element => {
      if(element.code === code){
         classId = element.id
         console.log('first')
      } 
   });
   if(classId){
        await bcrypt.hash(password, saltRounds, async (err, hash)=>{
            if(err){
                res.status(500).json({msg:'Error hashing password'})
            } else {
                const data = await sql`
                INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks)
                VALUES (${email}, ${hash}, ${name}, false, ${classId}, ${separationDate}, ${branch}, ${hasFamily}, ${livesInBarracks}) returning id
                `
                const userId = data[0].id
                res.json({msg:`User created with the id of ${userId}`})
            }
        })
   } else{
      res.json({msg: 'Invalid code'})
   }
})

app.post('/login', async(req,res)=>{
   const {email, password} = req.body
   const emails = await sql`
   SELECT email, password, admin, id, name FROM users
   `
   let exists = false
   let hash = ''
   let admin = null
   let name = ''
   emails.forEach(mail=>{
      if(mail.email === email){
         exists = true
         hash = mail.password
         admin = mail.admin
         userId = mail.id
         name = mail.name
      }
   })
   console.log(admin, hash)
   if(exists){
      const match = await bcrypt.compare(password, hash)
      if(match){
         const payload = {name: name, userId: userId, admin: admin}
         const token = jwt.sign(payload, secretKey, {expiresIn: '1h'})
         res.cookie('jwt', token, {httpOnly: true })
         res.json({msg:'logged in', ...payload})
      } else {
         res.json({msg: 'Email or password does not exist'})
      }
   }else{
      res.json({msg: 'Email or password does not exist'})
   }
})

app.get('/checkToken', async(req, res)=>{
   const token = req.cookies.jwt;

   if (token) {
     // If JWT exists, decode it
     try {
       const decoded = jwt.verify(token, secretKey);
       const userId = decoded;
      res.json({msg:'Success', ...userId })
     } catch (error) {
       // If JWT is invalid or has expired, clear the cookie and redirect to login page
       res.clearCookie('jwt');
       res.json({msg:'Jwt expired'})
     }
   } else {
     // If JWT does not exist, redirect to login page
     res.json({msg:'No jwt'})
   }
})

app.get('/test', (req, res) => {
   res.send('working')
})

app.get('/tasks/:id', async (req, res) => {
   let id = req.params.id

   try {
      const data = await sql`SELECT * FROM tasks WHERE user_id = ${id}`
      res.json(data)
   } catch (error) {
      res.json(error)
   }
})

app.listen(PORT, () => {
   console.log(`listening on port ${PORT}`)
})