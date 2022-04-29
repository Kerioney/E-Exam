// Global Modules:
const express = require('express')
const connection = require('./Configuration/config')
const app = express()
const bp = require('body-parser')
//local routes:
const Students = require('./Modules/Students/Routes/students.routes')
const Professors = require('./Modules/Professors/Routes/professor.routes')
const Admin = require('./Modules/Admin/Routes/admin.routes')

//middleware:
require('dotenv').config()
app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))
app.use(Students)
app.use(Professors)
app.use(Admin)
// app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT, () => console.log(`Server is running ........`))
connection()
