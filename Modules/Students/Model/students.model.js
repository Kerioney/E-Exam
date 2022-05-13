const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    level: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
    role: { type: String, default: 'student' },
    password: { type: String, required: true },
    perviousExams: [
        {
            examName: { type: String },
            result: { type: Number },
        },
    ],
})

studentSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 5)
})
const studentModel = mongoose.model('Student', studentSchema)

module.exports = studentModel
