//Global Modules
const app = require('express').Router()
//local Modules:

//Controllers:
const {
    signupProfessor,
    loginProfessor,
    professorProfile,
    verifyProfessor,
    addExam,
} = require('../Controller/professor.controller')

//validation:
const isAuth = require('../../../Common/common.isAuth')
const validator = require('../../../Common/common.valid')
const {
    signupProfessorSchema,
    loginProfessorSchema,
    examSchema,
} = require('../Validation/professors.valid')
//Auth:
const { PROFESSOR_PROFILE, ADD_EXAM } = require('../../../Auth/endpoints')

//endpoints:

app.post('/signupProfessor', validator(signupProfessorSchema), signupProfessor)
app.post('/loginProfessor', validator(loginProfessorSchema), loginProfessor)

app.post('/addExam', isAuth(ADD_EXAM), validator(examSchema), addExam)

app.get('/professorProfile', isAuth(PROFESSOR_PROFILE), professorProfile)
app.get('/verifyProfessor', verifyProfessor)
module.exports = app
