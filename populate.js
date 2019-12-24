var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
xhr = new XMLHttpRequest();
var url = "http://192.168.99.100:8080/register";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json");

var user1 = {
    username : "Ramzi",
    email : "ramzi.agougile@edu.ece.fr",
    password : "123456",
    password2: "123456"
}

var user2 = {
    username : "Baba",
    email : "baba@edu.ece.fr",
    password : "123456789",
    password2: "123456789"
}

var data = JSON.stringify(user1);
console.log(data)
var data2 = JSON.stringify(user2);
xhr.send(data);
//xhr.send(data2)