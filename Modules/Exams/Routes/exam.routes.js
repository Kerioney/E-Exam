//Global Modules
const app = require('express').Router()

//Controllers:
const {
    addExam,
    myExams,
    updateExam,
    deleteExam,
} = require('../Controller/exam.controller')

//validation:
const isAuth = require('../../../Common/common.isAuth')
const validator = require('../../../Common/common.valid')
const { examSchema } = require('../Validation/exam.valid')

//Auth:
const {
    ADD_EXAM,
    MY_EXAMS,
    UPDATE_EXAM,
    DELETE_EXAM,
} = require('../../../Auth/endpoints')

//*endpoints:
//Exam:
app.post('/addExam', isAuth(ADD_EXAM), validator(examSchema), addExam)
app.get('/myExams', isAuth(MY_EXAMS), myExams) //? (the Professor Home PAGE) to prevent that any other professor could edit in the exams
app.put('/updateExam/:id', isAuth(UPDATE_EXAM), updateExam)
app.delete('/deleteExam/:id', isAuth(DELETE_EXAM), deleteExam)

module.exports = app
