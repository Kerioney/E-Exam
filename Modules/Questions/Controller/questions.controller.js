//local models:
const tofModel = require('../Model/questions.model') //true or false model

//*True or False Questions:

//show questions:
//?home page of the exam
let showQuestions = async (req, res) => {
    let examId = req.params.id
    let question = await tofModel.find({ examId })
    res.status(200).json(question)
}

//add question:
let addTofQuestion = async (req, res) => {
    try {
        const { question, answers } = req.body
        const examId = req.params.id

        const newTof = await new tofModel({
            question,
            answers,
            examId,
        })
        newTof.save().then(
            res.status(201).json({
                message: 'Done',
            })
        )
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong' })
    }
}

//update question:
let updateTofQuestion = async (req, res) => {
    const { question, answers } = req.body
    const updateId = req.params.updateId
    await tofModel.findByIdAndUpdate({ _id: updateId }, { question, answers })
    res.status(200).json({ message: 'Updated' })
}

//delete question:
let deleteTofQuestion = async (req, res) => {
    const deleteId = req.params.deleteId
    await tofModel.findByIdAndDelete({ _id: deleteId })
    res.status(200).json({ message: 'Deleted' })
}

module.exports = {
    addTofQuestion,
    updateTofQuestion,
    deleteTofQuestion,
    showQuestions,
}
