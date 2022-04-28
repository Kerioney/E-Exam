const jwt = require('jsonwebtoken')
// auth schema
const rbac = require('../Auth/RBAC/rbac')
// // we get the rbc that we created

module.exports = (endpoint) => {
    //the parameter that will take it in the function
    return async (req, res, next) => {
        let bareToken = req.headers.authorization

        let token = bareToken.split(' ')[1]

        let decoded = jwt.verify(token, 'HHH')

        const isAllowed = await rbac.can(decoded.role, endpoint)
        req.user = decoded

        if (isAllowed) {
            next()
        } else {
            res.status(401).json({ message: "You aren't authorized" })
            //401 unauthorized
        }
    }
}
