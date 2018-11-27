var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var conn = require('mysql');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });

var pool = conn.createPool({
	connectionLimit: 2000,
	host: 'enwys.com',
	user: 'ebs',
	password: 'ebs1234',
	database: 'ebs3_vinay',
	debug: false,
	multipleStatements: true,
	connectTimeout: 60000, 
	acquireTimeout: 60000
})

app.post('/db_data', function(req, res){
	console.log(req.body);
	pool.query('call '+req.body.proc+"(?)",JSON.stringify(req.body.trans),function(err, docs){
		var output = {};
		if (err){
			console.log(err);
			output = {error: err, data: ''};
			res.send(output);
		}
		else{
			output = {error: 'None', data: docs};
			res.send(output);
		}
	})
})

app.listen(7100);
console.log('Server started on port 7100');