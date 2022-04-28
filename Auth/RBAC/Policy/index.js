const roles = require('../../Enums/roles')
const studentPolicy = require('../Policy/studentPolicy')
const professorPolicy = require('../Policy/professorPolicy')
const adminPolicy = require('../Policy/adminPolicy')

const opts = {
    // options
    [roles.ADMIN]: {
        can: adminPolicy,
    },
    [roles.STUDENT]: {
        can: studentPolicy,
    },
    [roles.PROFESSOR]: {
        can: professorPolicy,
    },
}

module.exports = opts
