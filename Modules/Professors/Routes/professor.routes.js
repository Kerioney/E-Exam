//Global Modules
const app = require('express').Router()
//local Modules:

//Controllers:
const {
    signupProfessor,
    loginProfessor,
    professorProfile,
} = require('../Controller/professor.controller')

//validation:
const isAuth = require('../../../Configuration/isAuth')
const validator = require('../../../Validator/common.valid')
const {
    signupProfessorSchema,
    loginProfessorSchema,
} = require('../Validation/professors.valid')
//Auth
//Professor Auth
const { PROFESSOR_PROFILE } = require('../../../Auth/endpoints')

//endpoints:

app.post('/signupProfessor', validator(signupProfessorSchema), signupProfessor)
app.post('/loginProfessor', validator(loginProfessorSchema), loginProfessor)
app.get('/professorProfile', isAuth(PROFESSOR_PROFILE), professorProfile)
module.exports = app
