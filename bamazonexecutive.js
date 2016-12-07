// Install and require this NPM
var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors/safe');
var Table = require('cli-table2');
var inquirer = require("inquirer");
// Path to my local host to connect with MySql
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    port     : 3306, 
    user     : "root",
    password : 'root',
    database : 'Bamazon_db'
});

