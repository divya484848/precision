var fs = require('fs');
var xl = require('excel4node');
var numberToWords = require('number-to-words');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname));
app.use(bodyParser.json());

var generate = function(docs, res, dirname){
	console.log('Ledger generating..');
	var inv_data = docs;
	var wb = new xl.Workbook({
		defaultFont:{
			name: 'Calibri',
			size: 10
		}
	});
	var box_all = {
		border: { left: { style: 'thin' }, right: { style: 'thin' }, top: { style: 'thin' }, bottom: { style: 'thin' }}
	}
	var box_l = {
		border: { left: { style: 'thin' }}
	}
	var box_r = {
		border: { right: { style: 'thin' }}
	}
	var box_t = {
		border: { top: { style: 'thin' }}
	}
	var box_b = {
		border: { bottom: { style: 'thin' }}
	}
	var box_lrt = {
		border: { left: { style: 'thin' }, right: { style: 'thin' }, top: { style: 'thin' }}
	}
	var box_lrb = {
		border: { left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' }}
	}
	var box_lr = {
		border: { left: { style: 'thin' }, right: { style: 'thin' }}
	}
	var box_lt = {
		border: { left: { style: 'thin' }, top: { style: 'thin' }}
	}
	var box_rt = {
		border: { right: { style: 'thin' }, top: { style: 'thin' }}
	}
	var box_rt = {
		border: { right: { style: 'thin' }, bottom: { style: 'thin' }}
	}
	var options = { margins: { left: 0.25, right: 0.25, top: 0.25, bottom: 0.25 },
		printOptions: { printGridLines: false },
		pageSetup: { paperWidth: '210mm', paperHeight: '297mm', orientation: 'landscape'},
		sheetFormat: { baseColWidth: 12, defaultColWidth: 12 }
	}
	var ws = wb.addWorksheet('Sheet1',options);
	
	var row=3;
    ws.cell(1,1,1,13,true).string('Vendor Bill').style({alignment: {horizontal: 'center'}, font: {bold: true, size: 16}});
    ws.cell(2,1).string("Trans ID").style({font: {bold: true}}).style(box_all);
    ws.cell(2,2).string("Employee").style({font: {bold: true}}).style(box_all);
    ws.cell(2,3).string("Department").style({font: {bold: true}}).style(box_all);
    ws.cell(2,4).string("Supplier").style({font: {bold: true}}).style(box_all);
    ws.cell(2,5).string("Item").style({font: {bold: true}}).style(box_all);
    ws.cell(2,6).string("Trans type").style({font: {bold: true}}).style(box_all);
    ws.cell(2,7).string("Trans date").style({font: {bold: true}}).style(box_all);
    ws.cell(2,8).string("Return type").style({font: {bold: true}}).style(box_all);
    ws.cell(2,9).string("Issue qty").style({font: {bold: true}}).style(box_all);
    ws.cell(2,10).string("Issue wt").style({font: {bold: true}}).style(box_all);
    ws.cell(2,11).string("Process type").style({font: {bold: true}}).style(box_all);
    ws.cell(2,12).string("Unit rate").style({font: {bold: true}}).style(box_all);
    ws.cell(2,13).string("Item value").style({font: {bold: true}}).style(box_all);
    for(var i=0; i<inv_data.length; i++){
        if (inv_data[i].sysid==null) inv_data[i]['sysid']=0;
        if (inv_data[i].complete_name==null) inv_data[i]['complete_name']='';
        if (inv_data[i].dept_name==null) inv_data[i]['dept_name']='';
        if (inv_data[i].supp_name==null) inv_data[i]['supp_name']='';
        if (inv_data[i].item_name==null) inv_data[i]['item_name']='';
        if (inv_data[i].trans_type==null) inv_data[i]['trans_type']='';
        if (inv_data[i].trans_date==null) inv_data[i]['trans_date']='';
        if (inv_data[i].return_type==null) inv_data[i]['return_type']='';
        if (inv_data[i].iss_qty==null) inv_data[i]['iss_qty']=0;
        if (inv_data[i].iss_wt==null) inv_data[i]['iss_wt']=0;
        if (inv_data[i].proc_name==null) inv_data[i]['proc_name']='';
        if (inv_data[i].unit_rate==null) inv_data[i]['unit_rate']=0;
        if (inv_data[i].item_cost==null) inv_data[i]['item_cost']=0;
		
        ws.cell(row,1).number((inv_data[i].sysid)).style(box_all);
        ws.cell(row,2).string(inv_data[i].complete_name).style(box_all);
        ws.cell(row,3).string(inv_data[i].dept_name).style(box_all);
        ws.cell(row,4).string(inv_data[i].supp_name).style(box_all);
        ws.cell(row,5).string(inv_data[i].item_name).style(box_all);
        ws.cell(row,6).string(inv_data[i].trans_type).style(box_all);
		ws.cell(row,7).string(inv_data[i].trans_date).style(box_all);
		ws.cell(row,8).string(inv_data[i].return_type).style(box_all);
        ws.cell(row,9).number(inv_data[i].iss_qty).style(box_all);
        ws.cell(row,10).number(inv_data[i].iss_wt).style(box_all);
        ws.cell(row,11).string(inv_data[i].proc_name).style(box_all);
        ws.cell(row,12).number(inv_data[i].unit_rate).style(box_all);
        ws.cell(row++,13).number(inv_data[i].item_cost).style(box_all);
    }
console.log('=sum(m3,m'+(row-1)+')');
	 ws.cell(row,13).formula('=sum(m3,m'+row-1+')').style(box_all);

	var filePath = dirname+'/data/vendor_bill.xlsx'; 
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}
	wb.write(filePath);
}

module.exports = {
	generate
}