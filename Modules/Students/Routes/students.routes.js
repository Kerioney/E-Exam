//Global Modules
const app = require('express').Router()
//local Modules:

//Controllers:
const {
    signupStudent,
    loginStudent,
    studentProfile,
} = require('../Controller/students.controller')

//validation:
const isAuth = require('../../../Common/common.isAuth')
const validator = require('../../../Common/common.valid')
const {
    signupStudentSchema,
    loginStudentSchema,
} = require('../Validation/students.valid')
//Auth
//Student Auth
const { STUDENT_PROFILE } = require('../../../Auth/endpoints')

//endpoints:

app.post('/signupStudent', validator(signupStudentSchema), signupStudent)
app.post('/loginStudent', validator(loginStudentSchema), loginStudent)
app.get('/studentProfile', isAuth(STUDENT_PROFILE), studentProfile)
module.exports = app
