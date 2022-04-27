const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const professorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    role: { type: String, default: 'professor' },
    password: { type: String, required: true },
});

professorSchema.pre('save', async function (next) {
    //save is the name of the method that will do the change before it
    this.password = await bcrypt.hash(this.password, 5);
});
const professorModel = mongoose.model('professor', professorSchema);

module.exports = professorModel;
