//Global Modules:
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//local models:
const adminModel = require('../Model/admin.model')
const studentModel = require('../../Students/Model/students.model')
const professorModel = require('../../Professors/Model/professor.model')
const examModel = require('../../Exams/Model/exam.model')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

//*Register Controllers:
let signupAdmin = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    try {
        let admin = await adminModel.findOne({ email })
        if (admin) {
            res.status(400).json({ message: 'The email is already exist' })
        } else {
            const newAdmin = new adminModel({ name, email, password })

            await newAdmin
                .save()
                .then(res.status(201).json({ message: 'added' }))
        }
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
    }
}

let loginAdmin = async (req, res) => {
    const { email, password } = req.body
    try {
        let adminValid = await adminModel.findOne({ email })
        if (!adminValid) {
            res.status(400).json({ message: "The Email doesn't Exist" })
        } else if (adminValid) {
            let match = await bcrypt.compare(password, adminValid.password)
            if (match) {
                let token = jwt.sign(
                    {
                        role: adminValid.role,
                        _id: adminValid._id,
                        email: adminValid.email,
                    },
                    process.env.TOKEN_HASH
                )
                res.status(200).json({
                    message: 'Welcome ' + adminValid.name,
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

//Students Controllers:
let getAllStudents = async (req, res) => {
    let students = await studentModel
        .find({})
        .select(' firstName lastName email phoneNumber department academicYear')
    res.status(200).json(students)
}

let updateStudents = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        department,
        academicYear,
    } = req.body
    const id = req.params._id
    await studentModel.findByIdAndUpdate(
        { _id: id },
        { firstName, lastName, email, phoneNumber, department, academicYear }
    )
    res.status(200).json({ message: 'Updated' })
}

let deleteStudent = async (req, res) => {
    const id = req.params._id
    await studentModel.findByIdAndDelete({ _id: id })
    res.status(204).json({ message: 'Deleted' })
}

//*Professor Controllers:
let getAllProfessor = async (req, res) => {
    let professors = await professorModel
        .find({})
        .select(' firstName lastName email phoneNumber')
    res.status(200).json(professors)
}
let updateProfessor = async (req, res) => {
    const { firstName, lastName, email, phoneNumber } = req.body
    const id = req.params._id
    await professorModel.findByIdAndUpdate(
        { _id: id },
        { firstName, lastName, email, phoneNumber }
    )
    res.status(200).json({ message: 'Updated' })
}

let deleteProfessor = async (req, res) => {
    const id = req.params._id
    await professorModel.findByIdAndDelete({ _id: id })
    res.status(200).json({ message: 'Deleted' })
}

//Exam:
let getAllExams = async (req, res) => {
    let exams = await examModel.find()
    res.status(200).json(exams)
}
//?Admin have all the Auth to update and delete the Exams like the professor
module.exports = {
    signupAdmin,
    loginAdmin,
    getAllStudents,
    updateStudents,
    deleteStudent,
    getAllProfessor,
    updateProfessor,
    deleteProfessor,
    getAllExams,
}
