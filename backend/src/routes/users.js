const { concatSeries } = require('async');
const express = require('express');
const rethink = require('rethinkdb');
const bcrypt = require('bcrypt');
const passwordHelper = require('../services/passwordHelper');
const authChecker = require('../middlewares/authChecker');
const bcryptSettings = require('../bcryptSettings.json');
let router = express.Router();

function users() {
    // Initializing the pw validator

}

// /users/:id updating user data
router
    .route('/:userID', authChecker)
    .put((req, res, next) => {
        updateUserByID(req, res, next, req.body.uniqID);
    })

router
    .route('/', authChecker)
    .get((req, res, next) => {
        listUsers(req, res, next);
    })


function updateUserByID(req, res, next, id) {

    let plainPW = req.body.password;
    bcrypt.hash(plainPW, bcryptSettings.saltRounds, (err, password) => {
        if (err) {
            console.log(err);
        }

        console.log(req.body.firstName);
        console.log(req.body.lastName);

        rethink
            .table('users')
            .filter({ uniqID: id })
            .update(
                {   //username: req.body.username,
                    password: password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                })
            .run(req.app._rdbConn, (err, result) => {
                if (err) {
                    res.status(400).send();
                }
                else {
                    console.log(req.body);
                    // update was successful
                    res.status(200).json({
                        message: 'Update was successful',
                        user: result,
                        statusCode: 200,
                    }).send();
                }


            });


    })

}

function listUsers(req, res, next) {
    rethink
        .table('users')
        // .orderBy({index: 'createdAt'})
        .run(req.app._rdbConn, (err, cursor) => {
            if (err) {
                return next(err);
            }

            //Retrieve all the pool logs in an array.
            cursor.toArray(function (err, result) {
                if (err) {
                    return next(err);
                }

                return res.json({
                    users: result,
                    statusCode: 200
                });
            });
        });
}






// export the users via the router
module.exports = router;