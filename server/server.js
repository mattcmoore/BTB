const express = require('express')
const morgan = require('morgan')
const postgres = require('postgres')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()

dotenv.config()

app.use(express.static('../dist'))

app.use(cors({ origin: '*' }))
app.use(morgan('tiny'))
app.use(express.json())

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 8000
const sql = postgres(DATABASE_URL)



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

app.get('/messages/:to/:from', async (req, res) => {
    let { to, from } = req.params

    try {
        const data = await sql`
            SELECT * FROM messages
            WHERE (to_user = ${to} AND from_user = ${from}) 
            OR (to_user = ${from} AND from_user = ${to})
            `
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, () => {
   console.log(`listening on port ${PORT}`)
})