const jwt = require('jsonwebtoken');
const jwtKey = require('../jwtSettings.json')

module.exports = (req, res, next) => {


    console.log('Got into verifying the request header.');

    let token = req.headers['x-access-token'];


    // Verifying jwt token
    jwt.verify(token, jwtKey.jwtPrivateKey, (err) =>{
        if (err) {
            return res.json({
                message: "Authorization failed.",
                statusCode: 401
            }).status(401).send();
        }
        else{
            //req.userData = decoded
            next();
        }
    });

   
}