//Global Modules
const app = require('express').Router()

//Controllers:
const {
    addTofQuestion,
    updateTofQuestion,
    deleteTofQuestion,
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
//true or false:
app.post(
    '/addTofQuestion/:id', //id = exam Id
    isAuth(ADD_QUESTIONS),
    validator(tofSchema),
    addTofQuestion
)
app.put(
    '/updateTofQuestion/:updateId',
    isAuth(UPDATE_QUESTION),
    updateTofQuestion
)
app.delete(
    '/deleteTofQuestion/:deleteId',
    isAuth(DELETE_QUESTION),
    deleteTofQuestion
)
app.get('/showQuestions/:id', showQuestions) //id = exam Id
//? ShowQuestions isn't authorized because the student will have access too

module.exports = app
