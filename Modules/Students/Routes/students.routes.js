//Global Modules
const app = require('express').Router()
//local Modules:

//Controllers:
const {
    signupStudent,
    loginStudent,
    studentProfile,
    showExams,
    getResult,
} = require('../Controller/students.controller')

//validation:
const isAuth = require('../../../Common/common.isAuth')
const validator = require('../../../Common/common.valid')
const {
    signupStudentSchema,
    loginStudentSchema,
} = require('../Validation/students.valid')

//Auth
const {
    STUDENT_PROFILE,
    GET_EXAMS,
    GET_RESULT,
} = require('../../../Auth/endpoints')

//endpoints:

app.post('/signupStudent', validator(signupStudentSchema), signupStudent)
app.post('/loginStudent', validator(loginStudentSchema), loginStudent)
app.get('/studentProfile', isAuth(STUDENT_PROFILE), studentProfile)
app.get('/showExams', isAuth(GET_EXAMS), showExams) //?homePage
app.get('/getResult/:examName', isAuth(GET_RESULT), getResult)
module.exports = app
