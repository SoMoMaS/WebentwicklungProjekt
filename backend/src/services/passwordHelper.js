const bcrypt = require('bcrypt');

const saltrounds = 10;

// not used for now


 function hashPassword(plainPW){
    var hashedPW;
    bcrypt.hash(plainPW, saltrounds, (err, encrypted) =>{
        if (err) {
            console.log(err)
        }

        hashedPW = encrypted;
    });
    return hashedPW;
}

function comparePasswords(plainPW, hashedPW, next){
    bcrypt.compare(plainPW, hashedPW, (err, same) =>{
        if (err) {
            console.log(err);
        }
        
        if (same) {
            return true;
        }
        else{
            // If the plain password isn't the same pw which is stored in the db.
            // not sure yet if it works
            next.res.status(400).send();
            return false;
        }

    });
}

exports.hashPassword = hashPassword;
exports.comparePasswords = comparePasswords;
