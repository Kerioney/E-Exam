// Global Modules:
const express = require("express")
const connection = require("./Configuration/config")
const app = express()
const bp = require("body-parser")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const cors = require("cors")

//local routes:
const Students = require("./Modules/Students/Routes/students.routes")
const Professors = require("./Modules/Professors/Routes/professor.routes")
const Admin = require("./Modules/Admin/Routes/admin.routes")
const Exams = require("./Modules/Exams/Routes/exam.routes")
const Questions = require("./Modules/Questions/Routes/question.routes")

//middleware:
app.use(bp.json())
app.use(helmet())
app.use(mongoSanitize())
app.use(Students)
app.use(Professors)
app.use(Admin)
app.use(Exams)
app.use(Questions)
app.use(cors())

connection(app) //db Connection
require("dotenv").config() //.env
