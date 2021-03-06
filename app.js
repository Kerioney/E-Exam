// Global Modules:
const express = require('express')
const connection = require('./Configuration/config')
const app = express()
const bp = require('body-parser')
const cors = require('cors')

//local routes:
const Students = require('./Modules/Students/Routes/students.routes')
const Professors = require('./Modules/Professors/Routes/professor.routes')
const Admin = require('./Modules/Admin/Routes/admin.routes')
const Exams = require('./Modules/Exams/Routes/exam.routes')
const Questions = require('./Modules/Questions/Routes/question.routes')

//middleware:
app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))
app.use(cors())
app.use(Students)
app.use(Professors)
app.use(Admin)
app.use(Exams)
app.use(Questions)

app.get('/', (req, res) => res.send('Api is working....'))
app.listen(process.env.PORT, () =>
    console.log(`Server is running on Port ${process.env.PORT} ........`)
)

connection() //db Connection
require('dotenv').config() //.env
