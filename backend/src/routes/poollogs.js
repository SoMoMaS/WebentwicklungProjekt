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

router.put('/', authChecker, (req, res, next) =>{
    updatePoolLogByID(req, res, next, "839be5ab-3ce5-49eb-888a-32c6f26c210f");
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
    poolLog.cretedAt = rethink.now();
  
    console.dir(poolLog);
  
    rethink.table('poollogs').insert(poolLog, {returnChanges: true}).run(req.app._rdbConn, function(err, result) {
      if(err) {
        return next(err);
      }
  
      res.json(result.changes[0].new_val);
    });
}

function updatePoolLogByID(req, res, next, id){

    rethink
    .table('poollogs')
    .get(id)
    .update(
        {
            airTemp: req.body.airTemp,
            backflushInterval: req.body.backflushInterval,
            chlorineValue: req.body.chlorineValue,
            comment: req.body.comment,
            waterTemp: req.body.waterTemp
        },)
    .run(req.app._rdbConn, callback =>{
        res.json('Update was successful');
    });
}

// export the logs via the router
module.exports = router;