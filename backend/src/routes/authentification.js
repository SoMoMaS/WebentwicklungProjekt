const { concatSeries } = require('async');
const express = require('express');
const rethink = require('rethinkdb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = require('../jwt.json')

let router = express.Router();

//   /login and /register doesnt need token check 
router
    .route('/register')
    // Creating user
    .post((req, res, next) =>{
        createUser(req, res, next);
     })
     

router
    .route('/login')
    // Checking if username and password are in the database and if theyre correct.
    .post((req, res, next) =>{
        loginDataCheck(req, res, next);
    })





function createUser(req, res, next){
    // Checking if username already exist
    userExistenceDetection(req, res, req.body.username, next);
    var plainPW = req.body.password;
        // Hasing plain pw.
        console.log(next.avaliable);
        bcrypt.hash(plainPW, 10, (err, password) =>{
            if(next.avaliable){
                console.log('Username doesnt exist, creating new user...')
        
                // Setting the username and the hashed password.
                username = req.body.username;
                console.dir({username, password});
    
                rethink.table('users').insert({username, password}, {returnChanges: true}).run(req.app._rdbConn, function(err, result) {
                    if(err) {
                    return next(err);
                    }
                    
                    // Sending back the changes.
                    res.json(result.changes[0].new_val);
                });
            }
            else{
                console.log('Username already exist, sending errormessage');
                // The username already exist in the database
                res.status(400).send('This username already exists in the database.');
            }
        })
    
}  

function userExistenceDetection(req, res, username, next){
    rethink.db('PoolOperations')
    .table('users')
    .filter({username: username})
    .count()
    .eq(0)
    .run(req.app._rdbConn, function(err, exist){
        if (err) {
            console.log(err);
            res.status(400).send();
        }
        console.log(exist);
        if (exist) {
            next.avaliable = true;
            return true;
        }
        else{
            next.avaliable = false;
            return false;
        }
    });
}


function loginDataCheck(req, res, next){

    var usernamee = req.body.username;
    var password = req.body.password;
    
    rethink.db('PoolOperations')
    .table('users')
    .get(usernamee)
    .run(req.app._rdbConn, function(err, user){
        if (err) {
            console.log(err);
            res.json({message: 'Error occured in the db query'}).status(400).send();
            return;
        }

        // User doesnt exist
        if (!user) {
            res.json({message: 'User doenst exist in the db.'}).status(400).send();
            return;
        }
        else{
            hashedPW = user.password;
        }
         
           

    bcrypt.compare(password, hashedPW, (err, areSame) =>{
        if (err) {
            console.log(err);
            res.json({message: 'Incorrect username or password, please try again.'}).status(400).send();
            return;
        }
        if (areSame) {
            // We logged here in successfull so we call the jwt sign method
            const token = jwt.sign( { 
                username: usernamee,
            }
            ,jwtKey.jwtPrivateKey,{
                expiresIn: '1h'
            })
            res.json({
                message: 'Correct username and password.',
                token: token
            }).status(200).send();
            return;
        }
        else{
            res.json({message: 'Incorrect username or password, please try again.'}).status(400).send();
            return;
        }
        })
    });
}
    

// export the users via the router
module.exports = router;