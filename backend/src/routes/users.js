const { concatSeries } = require('async');
const express = require('express');
const rethink = require('rethinkdb');
const bcrypt = require('bcrypt');
const passwordHelper = require('../services/passwordHelper');
const authChecker = require('../middlewares/authChecker');
let router = express.Router();

function users(){
    // Initializing the pw validator
    
}

// /users/:id updating user data
    router
    .route('/:id', authChecker)
    .put((req, res, next) =>{
        updateUserByID(req, res, next, "7c4845d9-96da-499b-a4ca-92da2976626b");
     })

function updateUserByID(req, res, next, id){

    rethink
    .table('users')
    .get(id)
    .update(
        {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },)
    .run(req.app._rdbConn, (err, result ) => {
        if (err) {
            res.status(400).send();
        }

        // update was successful
        res.json('Update was successful');
    });
}




    

// export the users via the router
module.exports = router;