
//Global Modules:
const express = require("express")
const connection = require("./Configuration/config.js")
const app = express()
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const cors = require("cors")
require("dotenv").config()

//local routes:
const Students = require("./Modules/Students/Routes/students.routes")
const Professors = require("./Modules/Professors/Routes/professor.routes")
const Admin = require("./Modules/Admin/Routes/admin.routes")
const Exams = require("./Modules/Exams/Routes/exam.routes")
const Questions = require("./Modules/Questions/Routes/question.routes")

//middleware:
connection(app)

//Middleware:

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(mongoSanitize())
app.use(cors())

app.use(Students)
app.use(Professors)
app.use(Admin)
app.use(Exams)
app.use(Questions)
app.use(cors())

