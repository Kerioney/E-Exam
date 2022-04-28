//Global Modules:
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//local models:
const adminModel = require('../Model/admin.model')
const studentModel = require('../../Students/Model/students.model')
const professorModel = require('../../Professors/Model/professor.model')

//Register Controllers:
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
                .then(res.status(200).json({ message: 'added' }))
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
                    'HHH'
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
        .select(
            '-_id firstName lastName email phoneNumber department academicYear'
        )
    res.status(200).json(students)
}

//Professor Controllers:
let getAllProfessor = async (req, res) => {
    let professors = await professorModel
        .find({})
        .select('-_id firstName lastName email phoneNumber')
    res.status(200).json(professors)
}

module.exports = { signupAdmin, loginAdmin, getAllStudents, getAllProfessor }
