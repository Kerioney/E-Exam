const professorModel = require('../Model/professor.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let signupProfessor = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
    } = req.body

    try {
        let professor = await professorModel.findOne({ email })
        if (professor) {
            res.status(400).json({ message: 'The email is already exist' })
        } else {
            const newProfessor = new professorModel({
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
            })

            await newProfessor
                .save()
                .then(res.status(200).json({ message: 'added' }))
        }
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
    }
}

let loginProfessor = async (req, res) => {
    const { email, password } = req.body
    try {
        let professorValid = await professorModel.findOne({ email })
        if (!professorValid) {
            res.status(400).json({ message: "The Email doesn't Exist" })
        } else if (professorValid) {
            let match = await bcrypt.compare(password, professorValid.password)
            if (match) {
                let token = jwt.sign(
                    {
                        role: professorValid.role,
                        _id: professorValid._id,
                        email: professorValid.email,
                    },
                    'HHH'
                )
                res.status(200).json({
                    message: 'Welcome Dr.' + professorValid.firstName,
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

let professorProfile = async (req, res) => {
    let profile = await professorModel
        .findById({ _id: req.user._id })
        .select('-_id firstName lastName email phoneNumber')

    res.status(200).json(profile)
}

module.exports = { signupProfessor, loginProfessor, professorProfile }
