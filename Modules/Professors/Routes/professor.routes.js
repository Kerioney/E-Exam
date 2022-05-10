//Global Modules
const app = require('express').Router()

//Controllers:
const {
    signupProfessor,
    loginProfessor,
    professorProfile,
    verifyProfessor,
    addExam,
    showExams,
    updateExam,
    deleteExam,
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
const {
    PROFESSOR_PROFILE,
    ADD_EXAM,
    SHOW_EXAMS,
    UPDATE_EXAM,
    DELETE_EXAM,
} = require('../../../Auth/endpoints')

//*endpoints:
//Registration:
app.post('/signupProfessor', validator(signupProfessorSchema), signupProfessor)
app.post('/loginProfessor', validator(loginProfessorSchema), loginProfessor)
app.get('/professorProfile', isAuth(PROFESSOR_PROFILE), professorProfile)
app.get('/verifyProfessor', verifyProfessor)

//Exam:
app.post('/addExam', isAuth(ADD_EXAM), validator(examSchema), addExam)
app.get('/showExams', isAuth(SHOW_EXAMS), showExams) //? (the Professor Home PAGE) to prevent that any other professor could edit in the exams
app.put('/updateExam/:id', isAuth(UPDATE_EXAM), updateExam)
app.delete('/deleteExam/:id', isAuth(DELETE_EXAM), deleteExam)

module.exports = app
