const express = require('express')
const morgan = require('morgan')
const postgres = require('postgres')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const PORT = process.env.PORT

const app = express()
const sql = postgres(process.env.DATABASE_URL)

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors('*'))

app.use(express.static('../dist'))

app.get('/test', (req: any, res: any): void => {
   res.send('working')
})

app.listen(PORT, () => {
   console.log(`listening on port ${PORT}`)
})