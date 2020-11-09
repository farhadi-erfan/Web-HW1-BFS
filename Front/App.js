function sendNum(where) {
    var num1 = parseInt(document.getElementById('number1').value);
    var num2 = parseInt(document.getElementById('number2').value);
	if (isNaN(num2))
		num2 = 'NaN';
	if (isNaN(num1))
		num1 = 'NaN';
    var res = document.getElementById('resultSum');
    // var xhr = new XMLHttpRequest();
    // xhr.open()
    fetch(where, {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify({
            n1: num1,
            n2: num2
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
  .then((response) => {
    if(response.status == 200)
        return response.json();
    else
        return response.text();

  })
  .then((val) => {
	  if (typeof val === 'string' || val instanceof String)
		res.innerHTML = val;
	  else
		res.innerHTML = val.result;});
    // res.innerHTML = `${num1} + ${num2} = ${num1+num2}\n${where}`;
}

function sendLine(where) {
    var line = parseInt(document.getElementById('lineNumber').value);
    var res = document.getElementById('resultLine');
    fetch(where+"?l="+line, {
        mode: 'cors',
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
  .then((response) => {
    return response.text();
  })
  .then((val) => res.innerHTML = val);
}

var sendNum2Go = () => sendNum("http://192.168.43.173/go/sha256");
var sendNum2Node = () => sendNum("http://192.168.43.173/nodejs/sha256");
var sendLine2Go = () => sendLine("http://192.168.43.173/go/write");
var sendLine2Node = () => sendLine("http://192.168.43.173/nodejs/write");
