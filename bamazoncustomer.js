// Install and require this NPM
var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors/safe');
var Table = require('cli-table');
var inquirer = require("inquirer");
// Path to my local host to connect with MySql
var connection = mysql.createConnection({
	  host     : '127.0.0.1',
	  port	   : 3306, 
	  user     : "root",
	  password : 'root',
	  database : 'Bamazon_db'
});

var productPurchased = [];

connection.connect();

//connect to the mysql database and pull the information from the Products database to display to the user
connection.query('SELECT product_id, product_name, department_name, price, stock_quantity', function(err, result){
	if(err) console.log(err);