const jwt = require('jsonwebtoken')
const rbac = require('../Auth/RBAC/rbac')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

module.exports = (endpoint) => {
    return async (req, res, next) => {
        let bareToken = req.headers.authorization

        let token = bareToken.split(' ')[1]

        let decoded = jwt.verify(token, process.env.TOKEN_HASH)

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
