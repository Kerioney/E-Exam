const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'admin' },
    password: { type: String, required: true },
})

adminSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 5)
})

const adminModel = mongoose.model('admin', adminSchema)

module.exports = adminModel
