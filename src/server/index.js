var express = require('express');
var app = express();
app.use(express.bodyParser());

app.use('/',express.static(__dirname + '/'));      

var port = Number(process.env.PORT || 5000);
console.log('port', port);
app.listen(port, function() {
  console.log("Listening on " + port);
});