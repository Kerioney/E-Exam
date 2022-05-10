//Global modules:
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//the Schema:
const professorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    role: { type: String, default: 'professor' },
    password: { type: String, required: true },
})

//password encryption:
professorSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 5)
})

//create the model:
const professorModel = mongoose.model('professor', professorSchema)

module.exports = professorModel
