var express = require('express');
var traffic = require('./routes/traffic');
 
var app = module.exports = express();
app.use(app.router);
app.use(error); 
app.get('/api/v1/traffic_per_day', traffic.getTrafficPerDay);
app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }
  res.send(err.message || 'Not found');
});
function error(err, req, res, next) {
  console.error("Error: "+err.stack);
  res.send(500);
}
 
app.listen(8085);
console.log('Listening on port 8085...');
