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
	var inv_data = docs[0]
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
    ws.cell(1,1,1,30,true).string('Diecast Material ledger').style({alignment: {horizontal: 'center'}, font: {bold: true, size: 16}});
    ws.cell(2,1).string("Trans ID").style({font: {bold: true}}).style(box_all);
    ws.cell(2,2).string("Employee").style({font: {bold: true}}).style(box_all);
    ws.cell(2,3).string("Department").style({font: {bold: true}}).style(box_all);
    ws.cell(2,4).string("Supplier").style({font: {bold: true}}).style(box_all);
    ws.cell(2,5).string("SO ID").style({font: {bold: true}}).style(box_all);
    ws.cell(2,6).string("Item").style({font: {bold: true}}).style(box_all);
    ws.cell(2,7).string("Trans type").style({font: {bold: true}}).style(box_all);
    ws.cell(2,8).string("Trans date").style({font: {bold: true}}).style(box_all);
    ws.cell(2,9).string("Return type").style({font: {bold: true}}).style(box_all);
	ws.cell(2,10).string("Ref issue id").style({font: {bold: true}}).style(box_all);
	ws.cell(2,11).string("Op. qty").style({font: {bold: true}}).style(box_all);
    ws.cell(2,12).string("Item UoM").style({font: {bold: true}}).style(box_all);
    ws.cell(2,13).string("Op.wt").style({font: {bold: true}}).style(box_all);
    ws.cell(2,14).string("Wt. UoM").style({font: {bold: true}}).style(box_all);
    ws.cell(2,15).string("Issue qty)").style({font: {bold: true}}).style(box_all);
    ws.cell(2,16).string("Issue wt").style({font: {bold: true}}).style(box_all);
    ws.cell(2,17).string("Rec ok qty").style({font: {bold: true}}).style(box_all);
    ws.cell(2,18).string("Rec ok wt").style({font: {bold: true}}).style(box_all);
    ws.cell(2,19).string("Rec rej qty").style({font: {bold: true}}).style(box_all);
	ws.cell(2,20).string("Rec rej wt").style({font: {bold: true}}).style(box_all);
	ws.cell(2,21).string("Rec scrap qty").style({font: {bold: true}}).style(box_all);
    ws.cell(2,22).string("Rec scrap wt").style({font: {bold: true}}).style(box_all);
    ws.cell(2,23).string("Rec unused qty").style({font: {bold: true}}).style(box_all);
    ws.cell(2,24).string("Rec unused wt").style({font: {bold: true}}).style(box_all);
    ws.cell(2,25).string("Loss qty").style({font: {bold: true}}).style(box_all);
    ws.cell(2,26).string("Loss wt").style({font: {bold: true}}).style(box_all);
    ws.cell(2,27).string("Cl. qty").style({font: {bold: true}}).style(box_all);
    ws.cell(2,28).string("Cl. wt").style({font: {bold: true}}).style(box_all);
    ws.cell(2,29).string("Status").style({font: {bold: true}}).style(box_all);
	ws.cell(2,30).string("Remarks").style({font: {bold: true}}).style(box_all);
    for(var i=0; i<inv_data.length; i++){
        if (inv_data[i].sysid==null) inv_data[i]['sysid']=0;
        if (inv_data[i].complete_name==null) inv_data[i]['complete_name']='';
        if (inv_data[i].dept_name==null) inv_data[i]['dept_name']='';
        if (inv_data[i].supp_name==null) inv_data[i]['supp_name']='';
        if (inv_data[i].so_id==null) inv_data[i]['so_id']=0;
        if (inv_data[i].item_name==null) inv_data[i]['item_name']='';
        if (inv_data[i].trans_type==null) inv_data[i]['trans_type']='';
        if (inv_data[i].trans_date==null) inv_data[i]['trans_date']='';
        if (inv_data[i].return_type==null) inv_data[i]['return_type']='';
        if (inv_data[i].ref_issue_id==null) inv_data[i]['ref_issue_id']=0;
		if (inv_data[i].op_qty==null) inv_data[i]['op_qty']=0;
        if (inv_data[i].item_uom==null) inv_data[i]['item_uom']='';
        if (inv_data[i].op_wt==null) inv_data[i]['op_wt']=0;
        if (inv_data[i].wt_uom==null) inv_data[i]['wt_uom']='';
        if (inv_data[i].iss_qty==null) inv_data[i]['iss_qty']=0;
        if (inv_data[i].iss_wt==null) inv_data[i]['iss_wt']=0;
        if (inv_data[i].rec_ok_qty==null) inv_data[i]['rec_ok_qty']=0;
        if (inv_data[i].rec_ok_wt==null) inv_data[i]['rec_ok_wt']=0;
        if (inv_data[i].rec_rej_qty==null) inv_data[i]['rec_rej_qty']=0;
        if (inv_data[i].rec_rej_wt==null) inv_data[i]['rec_rej_wt']=0;
		if (inv_data[i].rec_scrap_qty==null) inv_data[i]['rec_scrap_qty']=0;
        if (inv_data[i].rec_scrap_wt==null) inv_data[i]['rec_scrap_wt']=0;
        if (inv_data[i].rec_unused_qty==null) inv_data[i]['rec_unused_qty']=0;
        if (inv_data[i].rec_unused_wt==null) inv_data[i]['rec_unused_wt']=0;
        if (inv_data[i].loss_qty==null) inv_data[i]['loss_qty']=0;
        if (inv_data[i].loss_wt==null) inv_data[i]['loss_wt']=0;
        if (inv_data[i].cl_qty==null) inv_data[i]['cl_qty']=0;
        if (inv_data[i].cl_wt==null) inv_data[i]['cl_wt']=0;
        if (inv_data[i].status==null) inv_data[i]['status']='';
        if (inv_data[i].remarks==null) inv_data[i]['remarks']='';
		
        ws.cell(row,1).number((inv_data[i].sysid)).style(box_all);
        ws.cell(row,2).string(inv_data[i].complete_name).style(box_all);
        ws.cell(row,3).string(inv_data[i].dept_name).style(box_all);
        ws.cell(row,4).string(inv_data[i].supp_name).style(box_all);
        ws.cell(row,5).number(inv_data[i].so_id).style(box_all);
        ws.cell(row,6).string(inv_data[i].item_name).style(box_all);
        ws.cell(row,7).string(inv_data[i].trans_type).style(box_all);
		ws.cell(row,8).string(inv_data[i].trans_date).style(box_all);
		ws.cell(row,9).string(inv_data[i].return_type).style(box_all);
        ws.cell(row,10).number(inv_data[i].ref_issue_id).style(box_all);
		ws.cell(row,11).number(inv_data[i].op_qty).style(box_all);
		ws.cell(row,12).string((inv_data[i].item_uom)).style(box_all);
        ws.cell(row,13).number(inv_data[i].op_wt).style(box_all);
        ws.cell(row,14).string(inv_data[i].wt_uom).style(box_all);
        ws.cell(row,15).number(inv_data[i].iss_qty).style(box_all);
        ws.cell(row,16).number(inv_data[i].iss_wt).style(box_all);
        ws.cell(row,17).number(inv_data[i].rec_ok_qty).style(box_all);
        ws.cell(row,18).number(inv_data[i].rec_ok_wt).style(box_all);
        ws.cell(row,19).number(inv_data[i].rec_rej_qty).style(box_all);
        ws.cell(row,20).number(inv_data[i].rec_rej_wt).style(box_all);
		ws.cell(row,21).number(inv_data[i].rec_scrap_qty).style(box_all);
		ws.cell(row,22).number((inv_data[i].rec_scrap_wt)).style(box_all);
        ws.cell(row,23).number(inv_data[i].rec_unused_qty).style(box_all);
        ws.cell(row,24).number(inv_data[i].rec_unused_wt).style(box_all);
        ws.cell(row,25).number(inv_data[i].loss_qty).style(box_all);
        ws.cell(row,26).number(inv_data[i].loss_wt).style(box_all);
        ws.cell(row,27).number(inv_data[i].cl_qty).style(box_all);
        ws.cell(row,28).number(inv_data[i].cl_wt).style(box_all);
        ws.cell(row,29).string(inv_data[i].status).style(box_all);
        ws.cell(row++,30).string(inv_data[i].remarks).style(box_all);
    }

	var filePath = dirname+'/data/diecast_ledger.xlsx'; 
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}
	wb.write(filePath);
}

module.exports = {
	generate
}