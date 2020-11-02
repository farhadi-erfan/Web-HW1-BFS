var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var crypto = require('crypto');

var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.json());

var lines = null

fs.readFile('../text.txt', 'utf8', function(err, data) {
    if (err) throw err;
    lines = data.split(/\r?\n/);
});

app.get('/nodejs/write', function(req, res) {
	var line_num = parseInt(req.param('l'));
	if (isNaN(line_num)) {
		res.status(400).send('invalid number')
	}
	else if( line_num < 1 || line_num > 100) {
		res.status(400).send('out of range')
	} else {
		res.send(lines[line_num]);
	}
});

app.post('/nodejs/sha256', function(req, res) {
	var n1 = req.body.n1;
	var n2 = req.body.n2;
	if ((typeof n1) != "number" || (typeof n2) != "number") {
		res.status(400).send('invalid numbers')
	} else {
		var hash = crypto.createHash('sha256').update((n1 + n2).toString()).digest('base64');
		res.type('json');
		res.end(JSON.stringify({result: hash}));
	}
});


app.listen(port);
console.log('Server started! At http://localhost:' + port);