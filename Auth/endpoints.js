//Students Endpoints:
const STUDENT_PROFILE = 'student:STUDENT_PROFILE'

//Professor Endpoints:
const PROFESSOR_PROFILE = 'professor:PROFESSOR_PROFILE'
const UPDATE_PROFESSOR = 'admin:UPDATE_PROFESSOR'
const DELETE_PROFESSOR = 'admin:DELETE_PROFESSOR'

// Admin Endpoints:
const GET_ALL_STUDENT = 'admin:GET_ALL_STUDENT'
const GET_ALL_PROFESSOR = 'admin:GET_ALL_PROFESSOR'
const UPDATE_STUDENT = 'admin:UPDATE_STUDENT'
const DELETE_STUDENT = 'admin:DELETE_STUDENT'

module.exports = {
    STUDENT_PROFILE,
    GET_ALL_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
    PROFESSOR_PROFILE,
    GET_ALL_PROFESSOR,
    UPDATE_PROFESSOR,
    DELETE_PROFESSOR,
}
