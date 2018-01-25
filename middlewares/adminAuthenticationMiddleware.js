// Import required models
const User  = require('../models/User')
const Token = require('../models/Token')

module.exports = (driver) => {
    return (req, res, next) => {
        let requestToken = req.headers['token']
        Token.get(driver, requestToken, (token) => {
            if(token){
                // We don't check for admin yet, maybe impl. later
                if(token){
                    next()
                } else {
                    res.status(401)
                    res.send('unauthorized')
                }
            } else {
                res.status(401)
                res.send('unauthorized')
            }
        })
    }
}