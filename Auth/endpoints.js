//Students Endpoints:
const STUDENT_PROFILE = 'student:STUDENT_PROFILE'
const GET_EXAMS = 'student:GET_EXAMS'
const GET_RESULT = 'student:GET_RESULT'

//Professor Endpoints:
const PROFESSOR_PROFILE = 'professor:PROFESSOR_PROFILE'
const ADD_EXAM = 'professor:ADD_EXAM'
const MY_EXAMS = 'professor:MY_EXAMS'
const UPDATE_EXAM = 'professor:UPDATE_EXAM'
const DELETE_EXAM = 'professor:DELETE_EXAM'
const ADD_QUESTIONS = 'professor:ADD_QUESTIONS'
const UPDATE_QUESTION = 'professor:UPDATE_QUESTION'
const DELETE_QUESTION = 'professor:DELETE_QUESTION'

// Admin Endpoints:
const GET_ALL_STUDENT = 'admin:GET_ALL_STUDENT'
const UPDATE_STUDENT = 'admin:UPDATE_STUDENT'
const DELETE_STUDENT = 'admin:DELETE_STUDENT'
const GET_ALL_PROFESSOR = 'admin:GET_ALL_PROFESSOR'
const UPDATE_PROFESSOR = 'admin:UPDATE_PROFESSOR'
const DELETE_PROFESSOR = 'admin:DELETE_PROFESSOR'
const GET_ALL_EXAMS = 'admin:GET_ALL_EXAMS'

module.exports = {
    STUDENT_PROFILE,
    GET_ALL_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
    PROFESSOR_PROFILE,
    GET_ALL_PROFESSOR,
    UPDATE_PROFESSOR,
    DELETE_PROFESSOR,
    ADD_EXAM,
    MY_EXAMS,
    UPDATE_EXAM,
    DELETE_EXAM,
    GET_EXAMS,
    ADD_QUESTIONS,
    UPDATE_QUESTION,
    DELETE_QUESTION,
    GET_RESULT,
    GET_ALL_EXAMS,
}
