//Global Modules:
const jwt = require("jsonwebtoken")

//local Modules:
const examModel = require("../../Exams/Model/exam.model")

//*Exams:
let addExam = async (req, res) => {
    try {
        const {
            subjectName,
            examScore,
            passingScore,
            timeInMin,
            department,
            level,
        } = req.body

        const professorName = "Dr " + req.user.fName + " " + req.user.lName
        const professorId = req.user._id

        const newExam = await new examModel({
            subjectName,
            examScore,
            passingScore,
            professorName,
            professorId,
            timeInMin,
            department,
            level,
        })
        newExam.save().then(
            res.status(201).json({
                message: "Done",
            })
        )
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" })
    }
}

//home page for the professor:
let myExams = async (req, res) => {
    let exam = await examModel
        .find({ professorId: req.user._id })
        .select("_id -professorId -__v -results._id")
    res.status(200).json(exam)
}

let updateExam = async (req, res) => {
    const {
        subjectName,
        examScore,
        passingScore,
        timeInMin,
        department,
        level,
    } = req.body
    const _id = req.params.id
    await examModel.findByIdAndUpdate(
        { _id },
        { subjectName, examScore, passingScore, timeInMin, department, level }
    )
    res.status(200).json({ message: "Updated" })
}

let deleteExam = async (req, res) => {
    const _id = req.params.id
    await examModel.findByIdAndDelete({ _id })
    res.status(200).json({ message: "Deleted" })
}
////Under Construction:
let getResult = async (req, res) => {
    let result = 500 //?result  from the front end
    let examName = req.params.examName
    let studentId = req.user._id
    let examId = req.params.id
    let studentName = req.user.name
    //insert into the student Profile
    await studentModel.findByIdAndUpdate(
        { _id: studentId },
        {
            $push: {
                perviousExams: [
                    {
                        examName,
                        result,
                    },
                ],
            },
        }
    )
    // insert into the exam profile :
    await examModel.findByIdAndUpdate(
        { _id: examId },
        {
            $push: {
                results: [
                    {
                        studentName,
                        result,
                    },
                ],
            },
        }
    )
    res.status(200).json({ examName, studentName, result })
}
module.exports = {
    addExam,
    myExams,
    updateExam,
    deleteExam,
    getResult,
}
