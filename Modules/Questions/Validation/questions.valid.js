const joi = require('joi')
module.exports = {
    tofSchema: {
        body: joi.object().required().keys({
            examId: joi.string(),
            question: joi.string().required(),
            answers: joi.required(),
        }),
    },
}
