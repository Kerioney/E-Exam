const joi = require('joi')
module.exports = {
    examSchema: {
        body: joi.object().required().keys({
            professorId: joi.string(),
            professorName: joi.string(),
            subjectName: joi.string().required(),
            examScore: joi.number().required(),
            passingScore: joi.number().required(),
            timeInMin: joi.number().required(),
            department: joi.string().required(),
            level: joi.number().required(),
        }),
    },
}
