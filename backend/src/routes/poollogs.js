const express = require('express');
const rethink = require('rethinkdb');
const authChecker = require('../middlewares/authChecker');
let router = express.Router();

// router
//     .route('/', [authChecker])
//     .get((req, res, next) =>{
//          // getting all pool posts from the rethink db 
//         listPoolPosts(req, res, next);
//     })
//     .post((req, res, next) =>{
//        createPoolLog(req, res, next);
//     })
//     .patch((req, res, next) =>{
//         // This is a test
//         updatePoolLogByID(req, res, next, "839be5ab-3ce5-49eb-888a-32c6f26c210f");
//     })

router.get('/', authChecker, (req, res, next) =>{
    // getting all pool posts from the rethink db 
   listPoolPosts(req, res, next);
})

router.post('/', authChecker,  (req, res, next) =>{
        createPoolLog(req, res, next);
})

router.put('/:id',authChecker, (req, res, next) =>{
    console.log(req.body.uniqID);
    updatePoolLogByID(req, res, next, req.body.uniqID);
})

router.delete('/:id', authChecker, (req, res, next) =>{
    deletePoolLogByID(req, res, next, req.params.id);
})

function listPoolPosts(req, res , next) {
    rethink
    .table('poollogs', )
    // .orderBy({index: 'createdAt'})
    .run(req.app._rdbConn, (err, cursor) => {
        if(err) {
            return next(err);
        }
        
        //Retrieve all the pool logs in an array.
        cursor.toArray(function(err, result) {
            if(err) {
                return next(err);
            }

            return res.json({
                poolLogs: result,
                statusCode: 200 
            });
        });
    });
}

function createPoolLog(req, res, next) {
    var poolLog = req.body;
    poolLog.uniqID =  makeid(20);
    console.dir(poolLog);
    rethink.table('poollogs').insert(poolLog, {returnChanges: true}).run(req.app._rdbConn, function(err, result) {
      if(err) {
        return next(err);
      }
  
      res.json(result.changes[0].new_val);
    });
}

function deletePoolLogByID(req, res, next, id){

    console.log('Got into the deleted log method in backend. ID:');
    console.log(id);
    rethink
    .table('poollogs')
    .filter({ id: id })
    .delete()
    .run(req.app._rdbConn, (err, result) => {
        if (err) {
            res.status(400).send();
        }
        else {
            console.log(result);
            // delete was successful
            res.status(200).json({
                message: 'Delete was successful',
                deletedLog: result,
                statusCode: 200,
            }).send();
        }


    });

}

function updatePoolLogByID(req, res, next, id){

    rethink
    .table('poollogs')
    .filter({ id: id })
    .update(
        {   
            comment: req.body.comment,
            date: req.body.date,
            phValue: req.body.phValue,
            backflushInterval: req.body.backflushInterval,
            chlorineValue: req.body.chlorineValue,
            waterTemp: req.body.waterTemp,
            airTemp: req.body.airTemp
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
                updatedLog: result,
                statusCode: 200,
            }).send();
        }


    });

}

// source : https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

// export the logs via the router
module.exports = router;