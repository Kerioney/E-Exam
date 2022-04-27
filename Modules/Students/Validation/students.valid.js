const joi = require('joi')
const strongPasswordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

module.exports = {
    signupStudentSchema: {
        body: joi
            .object()
            .required()
            .keys({
                firstName: joi
                    .string()
                    .required()
                    .messages({
                        'string.empty': 'Display name cannot be empty',
                        'string.min': 'Min 6 characters',
                    })
                    .optional(),
                lastName: joi
                    .string()
                    .required()
                    .messages({
                        'string.empty': 'Display name cannot be empty',
                        'string.min': 'Min 6 characters',
                    })
                    .optional(),
                email: joi
                    .string()
                    .required()
                    .email()
                    .message('Must be a valid email address'),

                phoneNumber: joi.number().required(),
                password: joi
                    .string()
                    .regex(strongPasswordRegex)
                    .message({
                        'string.pattern.base':
                            'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length',
                    })
                    // .error(stringPasswordError)
                    .required()
                    .min(8)
                    .max(20),
                confirmPassword: joi
                    .string()
                    .equal(joi.ref('password'))
                    .required()
                    .label('Confirm password')
                    .messages({ 'any.only': '{{#label}} does not match' }),
                role: joi.string(),
                department: joi.string().required(),
                academicYear: joi.number().required(),
            }),
    },
    loginStudentSchema: {
        body: joi.object().required().keys({
            email: joi.string().email().required(),
            password: joi.string().required(),
        }),
    },
}
