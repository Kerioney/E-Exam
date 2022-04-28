//Global Modules
const app = require('express').Router()

//Controllers:
const {
    signupAdmin,
    loginAdmin,
    getAllStudents,
    getAllProfessor,
} = require('../Controller/admin.controls')

//validation:
const validator = require('../../../Validator/common.valid')
const {
    signupAdminSchema,
    loginAdminSchema,
} = require('../validation/admin.valid')

//Authorization:
const isAuth = require('../../../Configuration/isAuth')
const {
    GET_ALL_STUDENT,
    GET_ALL_PROFESSOR,
} = require('../../../Auth/endpoints')

//endpoints
app.post('/signupAdmin', validator(signupAdminSchema), signupAdmin) // will not be used in FrontEnd
app.post('/loginAdmin', validator(loginAdminSchema), loginAdmin)
app.get('/getAllStudents', isAuth(GET_ALL_STUDENT), getAllStudents)
app.get('/getAllProfessor', isAuth(GET_ALL_PROFESSOR), getAllProfessor)
module.exports = app
