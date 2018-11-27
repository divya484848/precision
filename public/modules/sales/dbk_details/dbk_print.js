var fs = require('fs');
var xl = require('excel4node');
var numberToWords = require('number-to-words');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname));
app.use(bodyParser.json());

var generate = function(docs, res, dirname){
	var inv_data = docs[0];
	var wb = new xl.Workbook({
		defaultFont:{
			name: 'Calibri',
			size: 10
		}
	});
	var box_all = {
		border: {
			left: {
				style: 'thin'
			},
			right: {
				style: 'thin'
			},
			top: {
				style: 'thin'
			},
			bottom: {
				style: 'thin'
			}
		}
	}

	var options = {
		margins: {
			left: 0.25,
			right: 0.25,
			top: 0.25,
			bottom: 0.25
		},
		printOptions: {
			printGridLines: false
		},
		pageSetup: {
			paperWidth: '210mm',
            paperHeight: '297mm',
            orientation: 'landscape'
		},
		sheetFormat: {
			baseColWidth: 12,
			defaultColWidth: 12
        },
        margins:{
            left: 0.25,
            right: 0.25
        }
	}

	var headerStyle = {
		font: {
			name: 'Calibri',
			size: 10,
			bold: true
		},
		alignment: {
			indent: 3
		}
	}

	var headerStyleEntity = {
		font: {
			name: 'Sans serif',
			size: 12
		},
		alignment: {
			indent: 3
		}
	}

	var indentStyle = {
		alignment: {
			indent: 3
		}
	}

	var ws = wb.addWorksheet('Sheet1',options);
	// for(var i=1; i<9; i++)
	// 	ws.column(i).setWidth(13);

    var row=3;
    ws.cell(1,1,1,10,true).string('Invoice details Report').style({alignment: {horizontal: 'center'}, font: {bold: true, size: 16}});
    ws.cell(2,1).string("Invoice No").style({font: {bold: true}}).style(box_all);
    ws.cell(2,2).string("Invoice date").style({font: {bold: true}}).style(box_all);
    ws.cell(2,3).string("Currency $").style({font: {bold: true}}).style(box_all);
    ws.cell(2,4).string("Exchange Rate").style({font: {bold: true}}).style(box_all);
    ws.cell(2,5).string("INR (Value)").style({font: {bold: true}}).style(box_all);
    ws.cell(2,6).string("Shipping Value").style({font: {bold: true}}).style(box_all);
    ws.cell(2,7).string("Shipping Date").style({font: {bold: true}}).style(box_all);
    ws.cell(2,8).string("Port Code  (Indian)").style({font: {bold: true}}).style(box_all);
    ws.cell(2,9).string("DBK Amount").style({font: {bold: true}}).style(box_all);
	ws.cell(2,10).string("DBK date").style({font: {bold: true}}).style(box_all);
    for(var i=0; i<inv_data.length; i++){
        if (inv_data[i].inv_no==null) inv_data[i]['inv_no']='';
        if (inv_data[i].inv_date==null) inv_data[i]['inv_date']='';
        if (inv_data[i].curr_name==null) inv_data[i]['curr_name']='';
        if (inv_data[i].exchange_rate==null) inv_data[i]['exchange_rate']=0;
        if (inv_data[i].inr_final_amount==null) inv_data[i]['inr_final_amount']=0;
        if (inv_data[i].final_total_inv_amt==null) inv_data[i]['final_total_inv_amt']=0;
        if (inv_data[i].inv_date==null) inv_data[i]['inv_date']='';
        if (inv_data[i].dom_port_code==null) inv_data[i]['dom_port_code']='';
        if (inv_data[i].dbk_amount==null) inv_data[i]['dbk_amount']=0;
        if (inv_data[i].dbk_date==null) inv_data[i]['dbk_date']='';
        
        ws.cell(row,1).string((inv_data[i].inv_no)).style(box_all);
        ws.cell(row,2).string(inv_data[i].inv_date).style(box_all);
        ws.cell(row,3).string(inv_data[i].curr_name).style(box_all);
        ws.cell(row,4).number(inv_data[i].exchange_rate).style(box_all);
        ws.cell(row,5).number(inv_data[i].inr_final_amount).style(box_all);
        ws.cell(row,6).number(inv_data[i].final_total_inv_amt).style(box_all);
        ws.cell(row,7).string(inv_data[i].inv_date).style(box_all);
        ws.cell(row,8).string(inv_data[i].dom_port_code).style(box_all);
        ws.cell(row,9).number(inv_data[i].dbk_amount).style(box_all);
        ws.cell(row++,10).string(inv_data[i].dbk_date).style(box_all);
    }
    var dt = new Date();

	var filePath = dirname+'/data/DBK_REPORT.xlsx'; 
	// var filePath = '/home/ebs/Storage/Prod/Precision/EBS3/dist/public/data/GIN_DEPT.xlsx'; 
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}
	wb.write(filePath);
console.log(__dirname);
}

module.exports = {
	generate
}