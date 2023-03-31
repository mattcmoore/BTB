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
                const userId = await sql`
                INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks)
                VALUES (${email}, ${hash}, ${name}, false, ${classId}, ${separationDate}, ${branch}, ${hasFamily}, ${livesInBarracks}) returning id
                `
                console.log(userId)
            }
        })
   } else{
      res.json({msg: 'Invalid code'})
   }
})

app.get('/test', (req, res) => {
   res.send('working')
})

app.listen(PORT, () => {
   console.log(`listening on port ${PORT}`)
})