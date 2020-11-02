function sendNum(where) {
    var num1 = document.getElementById('number1').value;
    var num2 = document.getElementById('number2').value;
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
        return response.body;

  })
  .then((json) => res.innerHTML = json.result);
    // res.innerHTML = `${num1} + ${num2} = ${num1+num2}\n${where}`;
}

function sendLine(where) {
    var line = document.getElementById('lineNumber');
    var res = document.getElementById('resultLine');
    fetch(where, {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify({
            l: line
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
        return response.body;

  })
  .then((json) => res.innerHTML = json.result);
}

var sendNum2Go = () => sendNum("http://localhost:8089/go/sha256");
var sendNum2Node = () => sendNum("http://localhost:8089/nodejs/sha256");
var sendLine2Go = () => sendLine("http://localhost:8089/go/write");
var sendLine2Node = () => sendLine("http://localhost:8089/nodejs/write");