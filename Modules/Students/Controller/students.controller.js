//Global Modules:
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

//local models:
const studentModel = require('../Model/students.model')
const examModel = require('../../Exams/Model/exam.model')

//Register:
let signupStudent = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        department,
        level,
        password,
        confirmPassword,
    } = req.body

    try {
        let student = await studentModel.findOne({ email })
        if (student) {
            res.status(400).json({ message: 'The email is already exist' })
        } else {
            const newStudent = new studentModel({
                firstName,
                lastName,
                email,
                department,
                level,
                password,
                phoneNumber,
            })

            await newStudent
                .save()
                .then(res.status(201).json({ message: 'Done' }))
        }
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
    }
}

//Login:
let loginStudent = async (req, res) => {
    const { email, password } = req.body
    try {
        let studentValid = await studentModel.findOne({ email })
        if (!studentValid) {
            res.status(400).json({ message: "The Email doesn't Exist" })
        } else if (studentValid) {
            let match = await bcrypt.compare(password, studentValid.password)
            if (match) {
                let token = jwt.sign(
                    {
                        _id: studentValid._id,
                        role: studentValid.role,
                        email: studentValid.email,
                        level: studentValid.level,
                    },
                    process.env.TOKEN_HASH
                )
                res.status(200).json({
                    message: 'Welcome ' + studentValid.firstName,
                    token,
                })
            } else {
                res.status(422).json({ message: 'Wrong Password' })
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong' })
    }
}

//Profile:
let studentProfile = async (req, res) => {
    let profile = await studentModel
        .findById({ _id: req.user._id })
        .select('-_id -password -__v -perviousExams._id')

    res.status(200).json(profile)
}
//exams:
//?Home Page:
let showExams = async (req, res) => {
    let level = req.user.level
    //We won't show exams by department because there is a common subjects
    let exams = await examModel.find({ level }).select('-_id -professorId -__v')
    res.status(200).json(exams)
}

////Under Construction:
let getResult = async (req, res) => {
    let result = 500 //?result  from the front end
    let examName = req.params.examName
    let id = req.user._id
    //insert into the student Profile
    await studentModel.findByIdAndUpdate(
        { _id: id },
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
    res.status(200).json({ result, examName })
}
module.exports = {
    signupStudent,
    loginStudent,
    studentProfile,
    showExams,
    getResult,
}
