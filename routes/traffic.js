var fs = require('fs'),moment = require('moment'),path = require('path');

exports.getTrafficPerDay = function (req, res) {
	console.log("traffic_per_day called");
	
	var file = "data.json", jsonData = {title:"Traffic Statistics",  data:[]}, tempData;	 
	fs.readFile(file, 'utf8', function (err, data) {	  
		if (err) {
			console.log('Error: ' + err);
			res.send(500, 'data.json not found!');
			return;
		}
		try{
			data = JSON.parse(data);
			var fromData = moment(new Date(req.query.from));
			var toDate = moment(new Date(req.query.to));
			for (var i = fromData; i.isBefore(toDate); i.add(1,'days')) {
				jsonData.data.push({"date":i.format('YYYY-MM-DD'), "traffic":data[i.format('YYYY-MM-DD')] ? parseInt(data[i.format('YYYY-MM-DD')]) : 0});
			}		
			res.send(jsonData);	
		} catch(er){
			console.log("Error: "+er);
			res.send(500, 'oops! something broke');
		}
		
	});		
}