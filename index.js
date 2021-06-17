const express = require('express');
const morgan = require('morgan');
//const bodyParser = require('body-parser');
const  {db}  = require('./models');
const app = express();
//const {db} = require('./models');

//logging and body-parsing
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//route
app.use('/', require('./routes/router'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send("Something went wrong: " + err.message);
});


const port = 8080;

const init = async function(){
   // await db.sync();
    app.listen(port, function(){
        console.log(`Server is listening on port ${port}`);
    });
};


init();