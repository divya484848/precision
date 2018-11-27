// Require library
var fs = require('fs');
var xl = require('excel4node');
var _ = require('underscore');

// var ws = wb.addWorksheet(options);

var generate_report = function(inv_data){
    // Create a new instance of a Workbook class
    console.log('Generating report...');
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
    ws.cell(1,1,1,9,true).string('Material Issue Report - Department').style({alignment: {horizontal: 'center'}, font: {bold: true, size: 16}});
    ws.cell(2,1).string("Trans ID").style({font: {bold: true}}).style(box_all);
    ws.cell(2,2).string("Department").style({font: {bold: true}}).style(box_all);
    ws.cell(2,3).string("Employee").style({font: {bold: true}}).style(box_all);
    ws.cell(2,4).string("Date").style({font: {bold: true}}).style(box_all);
    // ws.cell(2,5).string("Short code").style({font: {bold: true}}).style(box_all);
    ws.cell(2,5).string("Item").style({font: {bold: true}}).style(box_all);
    ws.cell(2,6).string("Quantity").style({font: {bold: true}}).style(box_all);
    ws.cell(2,7).string("UoM").style({font: {bold: true}}).style(box_all);
    ws.cell(2,8).string("Unit wt").style({font: {bold: true}}).style(box_all);
    ws.cell(2,9).string("Total wt").style({font: {bold: true}}).style(box_all);
    for(var i=0; i<inv_data.length; i++){
        if (inv_data[i].sys_mrh_id==null) inv_data[i]['sys_mrh_id']='';
        if (inv_data[i].dept_name==null) inv_data[i]['dept_name']='';
        if (inv_data[i].party_name==null) inv_data[i]['party_name']='';
        if (inv_data[i].trans_date==null) inv_data[i]['trans_date']='';
        if (inv_data[i].short_code==null) inv_data[i]['short_code']='';
        if (inv_data[i].item_name==null) inv_data[i]['item_name']='';
        if (inv_data[i].item_qty==null) inv_data[i]['item_qty']='';
        if (inv_data[i].item_uom==null) inv_data[i]['item_uom']='';
        if (inv_data[i].unit_wt==null) inv_data[i]['unit_wt']='';
        if (inv_data[i].total_wt==null) inv_data[i]['total_wt']='';
        
        ws.cell(row,1).string((inv_data[i].sys_mrh_id).toString()).style(box_all);
        ws.cell(row,2).string(inv_data[i].dept_name).style(box_all);
        ws.cell(row,3).string(inv_data[i].party_name).style(box_all);
        ws.cell(row,4).string(inv_data[i].trans_date).style(box_all);
        // ws.cell(row,5).string(inv_data[i].short_code).style(box_all);
        ws.cell(row,5).string(inv_data[i].item_name).style(box_all);
        ws.cell(row,6).string((inv_data[i].item_qty).toString()).style(box_all);
        ws.cell(row,7).string(inv_data[i].item_uom).style(box_all);
        ws.cell(row,8).string((inv_data[i].unit_wt).toString()).style(box_all);
        ws.cell(row++,9).string((inv_data[i].total_wt).toString()).style(box_all);
        
    }
    var dt = new Date();

	//var filePath = 'public/data/GIN_DEPT.xlsx'; 
	 var filePath = '/home/ebs/Storage/Prod/Precision/EBS3/dist/public/data/GIN_DEPT.xlsx'; 
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}
	wb.write(filePath);
}

module.exports = {
	generate_report
}
