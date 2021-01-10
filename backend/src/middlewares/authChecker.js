const jwt = require('jsonwebtoken');
const jwtKey = require('../jwt.json')

module.exports = (req, res, next) => {
    // Verifying jwt token
    const decoded = jwt.verify(req.body.token, jwtKey.jwtPrivateKey, (err) =>{
        if (err) {
            return res.json({message: "Authorization failed."}).status(401).send();
        }
    });

    req.userData = decoded

    next();
}