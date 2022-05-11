//Global modules:
const text = require('body-parser/lib/types/text')
const { boolean } = require('joi')
const mongoose = require('mongoose')
const examModel = require('./exam.model')

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

const tofModel = mongoose.model('tof', tofSchema)

module.exports = tofModel
