//local models:
const questionModel = require('../Model/questions.model') //true or false model

//Controllers:
//show questions:
//?home page of the exam
let showQuestions = async (req, res) => {
    let examId = req.params.id
    let question = await questionModel.find({ examId }).select('-__v -examId')
    res.status(200).json(question)
}

//add question:
let addQuestion = async (req, res) => {
    try {
        const { question, answers } = req.body
        const examId = req.params.id

        const newQuestion = await new questionModel({
            question,
            answers,
            examId,
        })
        newQuestion.save().then(
            res.status(201).json({
                message: 'Done',
            })
        )
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong' })
    }
}

//update question:
let updateQuestion = async (req, res) => {
    const { question, answers } = req.body
    const updateId = req.params.updateId
    await questionModel.findByIdAndUpdate(
        { _id: updateId },
        { question, answers }
    )
    res.status(200).json({ message: 'Updated' })
}

//delete question:
let deleteQuestion = async (req, res) => {
    const deleteId = req.params.deleteId
    await questionModel.findByIdAndDelete({ _id: deleteId })
    res.status(200).json({ message: 'Deleted' })
}

module.exports = {
    addQuestion,
    updateQuestion,
    deleteQuestion,
    showQuestions,
}
