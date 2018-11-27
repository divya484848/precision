var mongojs = require('mysql');
var moment = require('moment');

var sql;

var listCTC = function(pool, req, res){
	var empid;
	if(req.body.SysEmpId == '' || req.body.SysEmpId == undefined)
	{
		empid = 0;
	}
	else
	{
		empid = req.body.SysEmpId;
	}
	pool.query('call payroll_CompensationDetails(?)', 
		JSON.stringify({ 
			SysEmpId: empid, SysCompensationId: 0}), function(err, docs){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.json(docs);
		}
	})
}

var addCTC = function(pool, req, res){
	console.log(req.body);
	pool.query('call payroll_compensationOps(?)',
		JSON.stringify(req.body), function(err, docs){
		if(err)		{
			console.log(err);
		}
		else		{
			res.json(docs);
		}
	})
}



module.exports = {
	listCTC,
	addCTC
}