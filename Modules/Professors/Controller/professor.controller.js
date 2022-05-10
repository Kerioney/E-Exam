//Global Modules:
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

//local models:
const professorModel = require('../Model/professor.model')
const examModel = require('../Model/exam.model')

//*Register:
let signupProfessor = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
    } = req.body

    //verify email:
    let professor = await professorModel.findOne({ email })

    if (professor) {
        res.status(400).json({ message: 'The email is already exist' })
    } else {
        //Token:
        let token = jwt.sign(
            { email, firstName, lastName, password, phoneNumber },
            'HHH'
        )
        //Create transport:
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        })
        //send the mail
        await transporter.sendMail({
            from: `${email}`,
            to: `"Fares El-Kerioney" <${process.env.USER}> `,
            subject: ' Verify Professor',
            html: `Dr. ${firstName} ${lastName} want to register with the email: ${email} 
            <br> 
            <a href='http://localhost:4200/verifyProfessor?token=${token}' target='_blank'> Click here </a>to confirm the registration`,
        })

        res.status(202).json({
            message: `Thanks for signup Dr.${firstName}The admin will confirm your registration soon`,
        })
    }
}

//verify the Professor:
let verifyProfessor = async (req, res) => {
    try {
        //the Token:
        let { token } = req.query
        let decoded = jwt.verify(token, 'HHH')
        //Signup:
        const newProfessor = new professorModel({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            password: decoded.password,
            phoneNumber: decoded.phoneNumber,
        })
        await newProfessor.save().then(
            res.status(201).json({
                message: 'The professor registration is completed',
            })
        )
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
    }
}

//*Login:
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
                        fName: professorValid.firstName,
                        lName: professorValid.lastName,
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
        res.status(500).json({ message: 'Something Went Wrong' }).log(error)
    }
}

//Profile:
let professorProfile = async (req, res) => {
    let profile = await professorModel
        .findById({ _id: req.user._id })
        .select('-_id firstName lastName email phoneNumber')

    res.status(200).json(profile)
}
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

        const professorName = 'Dr ' + req.user.fName + req.user.lName
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
                message: 'Done',
            })
        )
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong' }).log(error)
    }
}
//home page for the professor:
let showExams = async (req, res) => {
    let exam = await examModel
        .find({ professorId: req.user._id })
        .select('-_id -professorId -__v')
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
    res.status(200).json({ message: 'Updated' })
}

let deleteExam = async (req, res) => {
    const _id = req.params.id
    await examModel.findByIdAndDelete({ _id })
    res.status(200).json({ message: 'Deleted' })
}

module.exports = {
    signupProfessor,
    loginProfessor,
    professorProfile,
    verifyProfessor,
    addExam,
    showExams,
    updateExam,
    deleteExam,
}
