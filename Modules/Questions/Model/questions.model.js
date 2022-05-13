//Global modules:
const mongoose = require('mongoose')

//True or False Schema
const tofSchema = new mongoose.Schema({
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'exams' },
    question: { type: String, required: true },
    answers: [
        {
            text: {
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
const tofModel = mongoose.model('tof', tofSchema)

module.exports = tofModel
