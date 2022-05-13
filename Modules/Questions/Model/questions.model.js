//Global modules:
const mongoose = require('mongoose')

//Question Schema
const questionSchema = new mongoose.Schema({
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'exams' },
    question: { type: String, required: true },
    answers: [
        {
            option: {
                type: String,
                required: true,
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
    ],
})

//The model:
const questionModel = mongoose.model('Question', questionSchema)

module.exports = questionModel
