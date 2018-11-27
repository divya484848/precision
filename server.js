var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var conn = require('mysql');
var os = require('os');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
var formidable = require('formidable');
// app.use(os);


var pool = conn.createPool({
	connectionLimit: 2000,
	database: 'precision_3_1',
	host: 'enwys.com',
	user: 'ebs',
	password: 'ebs1234',
	debug: false,
	multipleStatements: true,
	connectTimeout: 60000, 
	acquireTimeout: 60000
})

var excel = require('./excel_reports');

 var ax = os.hostname();
 console.log(ax);
 console.log(os.userInfo());

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
			if (req.body.report != undefined){
				excel.generate_report(docs, req.body.report['name'], res);
			} 
		}
	})
})

app.post('/db_report', function(req, res){
	if (req.body.report.name != undefined){
		console.log(req.body.report);
		excel.generate_report(req.body.data, req.body.report['name'], res);
	}
})

app.post('/upload', function (req, res) {
		console.log(req.body);
        var form = new formidable.IncomingForm();
        form.parse(req);
        form.on('fileBegin', function (name, file) {
                console.log(__dirname);
                console.log(file.name);
                file.path = __dirname + '/public/data/' + file.name;
        });
		form.on('file', function (name, file){
        		res.send('Uploaded ' + file.name);
    		});
})

app.listen(3100);
console.log('Server started on port 3100');