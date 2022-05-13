const joi = require('joi')
module.exports = {
    questionSchema: {
        body: joi.object().required().keys({
            examId: joi.string(),
            question: joi.string().required(),
            answers: joi.array().required(),
        }),
    },
}
