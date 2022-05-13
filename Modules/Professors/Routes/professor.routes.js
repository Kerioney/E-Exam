//Global Modules
const app = require('express').Router()

//Controllers:
const {
    signupProfessor,
    loginProfessor,
    professorProfile,
    verifyProfessor,
} = require('../Controller/professor.controller')

//validation:
const validator = require('../../../Common/common.valid')
const {
    signupProfessorSchema,
    loginProfessorSchema,
} = require('../Validation/professors.valid')

//Auth:
const isAuth = require('../../../Common/common.isAuth')
const { PROFESSOR_PROFILE } = require('../../../Auth/endpoints')

//*endpoints:
//Registration:
app.post('/signupProfessor', validator(signupProfessorSchema), signupProfessor)
app.post('/loginProfessor', validator(loginProfessorSchema), loginProfessor)
app.get('/professorProfile', isAuth(PROFESSOR_PROFILE), professorProfile)
app.get('/verifyProfessor', verifyProfessor)

module.exports = app
