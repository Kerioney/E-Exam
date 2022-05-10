const { StatusCodes, getReasonPhrase } = require('http-status-codes')

module.exports = (schema) => {
    return (req, res, next) => {
        var validation = []
        var validationResult = schema.body.validate(req.body)
        //console.log(validationResult.error);
        if (validationResult.error) {
            //if there is any errors in the validation
            validation.push(validationResult.error.details[0].message)
        }
        if (validation.length) {
            res.status(StatusCodes.BAD_REQUEST)
            //to change the status value in the postman
            res.json({
                message: validation.join(),
                //join take the array and turn it into string
                Code: getReasonPhrase(StatusCodes.BAD_REQUEST),
            })
            return
        }

        next()
    }
}
