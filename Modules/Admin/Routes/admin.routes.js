//Global Modules
const app = require('express').Router()

//Controllers:
const { signupAdmin, loginAdmin } = require('../Controller/admin.controls')

//validation:
const isAuth = require('../../../Configuration/isAuth')
const validator = require('../../../Validator/common.valid')
const {
    signupAdminSchema,
    loginAdminSchema,
} = require('../validation/admin.valid')
//endpoints
app.post('/signupAdmin', validator(signupAdminSchema), signupAdmin) // will not be used in FrontEnd
app.post('/loginAdmin', validator(loginAdminSchema), loginAdmin)
module.exports = app
