//Global Modules
const app = require('express').Router()

//*Controllers:

//Admin:
const { signupAdmin, loginAdmin } = require('../Controller/admin.controls')

//Students:
const {
    getAllStudents,
    updateStudents,
    deleteStudent,
} = require('../Controller/admin.controls')

//Professors:
const {
    getAllProfessor,
    updateProfessor,
    deleteProfessor,
} = require('../Controller/admin.controls')

//Exams:
const { getAllExams } = require('../Controller/admin.controls')

//*validation:
const validator = require('../../../Common/common.valid')
const {
    signupAdminSchema,
    loginAdminSchema,
} = require('../validation/admin.valid')

//*Authorization:
const isAuth = require('../../../Common/common.isAuth')
//STUDENT:
const {
    GET_ALL_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
} = require('../../../Auth/endpoints')

//PROFESSOR:
const {
    GET_ALL_PROFESSOR,
    UPDATE_PROFESSOR,
    DELETE_PROFESSOR,
} = require('../../../Auth/endpoints')

//Exams:
const { GET_ALL_EXAMS } = require('../../../Auth/endpoints')

//*endpoints:

//Register:
app.post('/signupAdmin', validator(signupAdminSchema), signupAdmin) //? will not be used in FrontEnd
app.post('/loginAdmin', validator(loginAdminSchema), loginAdmin)

//Students:
app.get('/getAllStudents', isAuth(GET_ALL_STUDENT), getAllStudents)
app.put('/updateStudents/:_id', isAuth(UPDATE_STUDENT), updateStudents)
app.delete('/deleteStudent/:_id', isAuth(DELETE_STUDENT), deleteStudent)

//Professors:
app.get('/getAllProfessor', isAuth(GET_ALL_PROFESSOR), getAllProfessor)
app.put('/updateProfessor/:_id', isAuth(UPDATE_PROFESSOR), updateProfessor)
app.delete('/deleteProfessor/:_id', isAuth(DELETE_PROFESSOR), deleteProfessor)

//Exams:
app.get('/getAllExams', isAuth(GET_ALL_EXAMS), getAllExams)

module.exports = app
