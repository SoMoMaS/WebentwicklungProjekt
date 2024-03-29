const async = require('async');
const express = require('express');
const bodyParser = require('body-parser');
const rethink = require('rethinkdb');
const users = require('./routes/users');
const poollogs = require('./routes/poollogs');
const auth = require('./routes/authentification');
const cors = require('cors');
const app = express();


//For serving the index.html and all the other front-end assets.
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// Cors header middleware 


app.use(cors()) // Use this after the variable declaration

// Assinging the /users to the users route
app.use('/users' ,users);

// Assinging the /poollogs to the poollogs route
app.use('/poollogs' ,poollogs);

// Assinging the /auth to the authentificaton route
app.use('/auth' ,auth);




//If we reach this middleware the route could not be handled and must be unknown.
app.use(handle404);

//Generic error handling middleware.
app.use(handleError);



/*
 * Get a specific todo item.
 */
function getTodoItem(req, res, next) {
  var todoItemID = req.params.id;

  rethink.table('todos').get(todoItemID).run(req.app._rdbConn, function(err, result) {
    if(err) {
      return next(err);
    }

    res.json(result);
  });
}

/*
 * Update a todo item.
 */
function updateTodoItem(req, res, next) {
  var todoItem = req.body;
  var todoItemID = req.params.id;

  rethink.table('todos').get(todoItemID).update(todoItem, {returnChanges: true}).run(req.app._rdbConn, function(err, result) {
    if(err) {
      return next(err);
    }

    res.json(result.changes[0].new_val);
  });
}

/*
 * Delete a todo item.
 */
function deleteTodoItem(req, res, next) {
  var todoItemID = req.params.id;

  rethink.table('todos').get(todoItemID).delete().run(req.app._rdbConn, function(err, result) {
    if(err) {
      return next(err);
    }

    res.json({success: true});
  });
}

/*
 * Page-not-found middleware.
 */
function handle404(req, res, next) {
  res.status(404).end('not found');
}

/*
 * Generic error handling middleware.
 * Send back a 500 page and log the error to the console.
 */
function handleError(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({err: err.message});
}

/*
 * Store the db connection and start listening on a port.
 */
function startExpress(connection) {
  app._rdbConn = connection;
  app.listen(3000);
  console.log('Listening on port 3000');
}

/*
 * Connect to rethinkdb, create the needed tables/indexes and then start express.
 * Create tables/indexes then start express
 */
async.waterfall([
  function connect(callback) {
    const rethinkConfig = {
        host: 'localhost',
        port: 28015,
        authKey: '',
        db: 'PoolOperations'
      };
      rethink.connect(rethinkConfig, callback);
  },
  function createDatabase(connection, callback) {
    //Create the database if needed.
    rethink.dbList().contains("PoolOperations").do(function(containsDb) {
      return rethink.branch(
        containsDb,
        {created: 0},
        rethink.dbCreate("PoolOperations")
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function createTable(connection, callback) {
    //Create the table if needed.
    
    
    rethink.db('PoolOperations').tableCreate('users', {primary_key: 'username'}).run(connection, (err, result)=>{
      
    })


    rethink.tableList().contains('poollogs').do(function(containsTable) {
      return rethink.branch(
        containsTable,
        {created: 0},
        rethink.tableCreate('poollogs')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });

   
  // },
  // function createIndex(connection, callback) {
  //   //Create the index if needed.
  //   rethink.table('users').indexList().contains('username').do(function(hasIndex) {
  //     return rethink.branch(
  //       hasIndex,
  //       {created: 0},
  //       rethink.table('users').indexCreate('uniqID')
  //     );
  //   }).run(connection, function(err) {
  //     callback(err, connection);
  //   });
   
  // },
  // function waitForIndex(connection, callback) {
  //   //Wait for the index to be ready.
  //   rethink.table('users').indexWait('uniqID').run(connection, function(err, result) {
  //     callback(err, connection);
  //   });
   
 }
], function(err, connection) {
  if(err) {
    console.error(err);
    process.exit(1);
    return;
  }

  startExpress(connection);
});