//Global Modules
const app = require('express').Router()

//Controllers:
const {
    signupProfessor,
    loginProfessor,
    professorProfile,
    verifyProfessor,
    addTofQuestion,
    updateTofQuestion,
    deleteTofQuestion,
    showQuestions,
} = require('../Controller/professor.controller')

//validation:
const isAuth = require('../../../Common/common.isAuth')
const validator = require('../../../Common/common.valid')
const {
    signupProfessorSchema,
    loginProfessorSchema,
} = require('../Validation/professors.valid')

//Auth:
const { PROFESSOR_PROFILE } = require('../../../Auth/endpoints')

//*endpoints:
//Registration:
app.post('/signupProfessor', validator(signupProfessorSchema), signupProfessor)
app.post('/loginProfessor', validator(loginProfessorSchema), loginProfessor)
app.get('/professorProfile', isAuth(PROFESSOR_PROFILE), professorProfile)
app.get('/verifyProfessor', verifyProfessor)

//question:
app.post('/addTofQuestion/:id', addTofQuestion) //id = exam Id
app.put('/updateTofQuestion/:updateId', updateTofQuestion)
app.delete('/deleteTofQuestion/:deleteId', deleteTofQuestion)
app.get('/showQuestions/:id', showQuestions) //id = examId

module.exports = app
