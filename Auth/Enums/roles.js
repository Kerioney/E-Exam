const roles = Object.freeze({
    ADMIN: 'admin',
    STUDENT: 'student',
    PROFESSOR: 'professor',
});
// object.freeze to make sure that no one will be use these names anymore
module.exports = roles;
