//Global modules:
const mongoose = require('mongoose')

//Exam Schema:
const examSchema = new mongoose.Schema({
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'professors' },
    professorName: { type: String },
    subjectName: { type: String, required: true },
    department: { type: String, required: true },
    level: { type: Number, required: true },
    examScore: { type: Number, required: true },
    passingScore: { type: Number, required: true },
    timeInMin: { type: Number, required: true },
})

//create the model:
const examModel = mongoose.model('exam', examSchema)
module.exports = examModel
