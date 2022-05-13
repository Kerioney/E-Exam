//Global Modules
const app = require('express').Router()

//Controllers:
const {
    addQuestion,
    updateQuestion,
    deleteQuestion,
    showQuestions,
} = require('../Controller/questions.controller')

//validation:
const validator = require('../../../Common/common.valid')
const { tofSchema } = require('../Validation/questions.valid')

//Auth:
const isAuth = require('../../../Common/common.isAuth')
const {
    ADD_QUESTIONS,
    UPDATE_QUESTION,
    DELETE_QUESTION,
} = require('../../../Auth/endpoints')

//*endpoints:

app.get('/showQuestions/:id', showQuestions) //id = exam Id
app.post(
    '/addQuestion/:id', //id = exam Id
    isAuth(ADD_QUESTIONS),
    validator(tofSchema),
    addQuestion
)
app.put('/updateQuestion/:updateId', isAuth(UPDATE_QUESTION), updateQuestion)
app.delete('/deleteQuestion/:deleteId', isAuth(DELETE_QUESTION), deleteQuestion)
//? ShowQuestions isn't authorized because the student will have access too

module.exports = app
