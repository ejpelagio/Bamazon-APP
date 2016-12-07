// Install and require this NPM
var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors/safe');
var Table = require('cli-table2');
var inquirer = require("inquirer");
// Path to my local host to connect with MySql
var connection = mysql.createConnection({
	  host     : '127.0.0.1',
	  port	   : 3306, 
	  user     : "root",
	  password : 'root',
	  database : 'Bamazon_db'
});

//Creating initial connection to database using MYSQL NPM packages.
connection.connect(function(err) {
	if (err) throw err;
 	 //console.log("Conection test");
});

function start(){
  inquirer.prompt([{
    type: "list",
    name: "toDoThing",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","End Session"]
  }]).then(function(ans){
     switch(ans.toDoThing){
      case "View Products for Sale": viewProducts();
      break;
      case "View Low Inventory": viewLowInventory();
      break;
      case "Add to Inventory": addToInventory();
      break;
      case "Add New Product": addNewProduct();
      break;
      case "End Session": console.log('Bye!');
    }
  });
}

//views all inventory
function viewProducts(){
  console.log('>>>>>>Viewing Products<<<<<<');

  connection.query('SELECT * FROM products', function(err, res){
  if(err) throw err;
  console.log('----------------------------------------------------------------------------------------------------')

  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].product_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
    console.log('--------------------------------------------------------------------------------------------------')
  }

  start();
  });
}


//views inventory lower than 5
function viewLowInventory(){
  console.log('>>>>>>Viewing Low Inventory<<<<<<');

  connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;
  console.log('----------------------------------------------------------------------------------------------------')

  for(var i = 0; i<res.length;i++){
    if(res[i].stock_quantity <= 5){
    console.log("ID: " + res[i].product_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
    console.log('--------------------------------------------------------------------------------------------------');
    }
  }

  start();
  });
}

//displays prompt to add more of an item to the store and asks how much
function addToInventory(){
  console.log('>>>>>>Adding to Inventory<<<<<<');

  connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;
  var itemArray = [];
  //pushes each item into an itemArray
  for(var i=0; i<res.length; i++){
    itemArray.push(res[i].product_name);
  }

  inquirer.prompt([{
    type: "list",
    name: "product",
    choices: itemArray,
    message: "Which item would you like to add inventory?"
  }, {
    type: "input",
    name: "qty",
    message: "How much would you like to add?",
    validate: function(value){
      if(isNaN(value) === false){return true;}
      else{return false;}
    }
    }]).then(function(ans){
      var currentQty;
      for(var i=0; i<res.length; i++){
        if(res[i].product_name === ans.product){
          currentQty = res[i].stock_quantity;
        }
      }
      connection.query('UPDATE Products SET ? WHERE ?', [
        {stock_quantity: currentQty + parseInt(ans.qty)},
        {product_name: ans.product}
        ], function(err, res){
          if(err) throw err;
          console.log('The quantity was updated.');
          start();
        });
      })
  });
}

//allows manager to add a completely new product to store
function addNewProduct(){
  console.log('>>>>>>Adding New Product<<<<<<');
  var deptNames = [];

  //grab name of departments
  connection.query('SELECT * FROM Departments', function(err, res){
    if(err) throw err;
    for(var i = 0; i<res.length; i++){
      deptNames.push(res[i].department_name);
    }
  })

  inquirer.prompt([{
    type: "input",
    name: "product_name",
    message: "Product: ",
    validate: function(value){
      if(value){return true;}
      else{return false;}
    }
  }, {
    type: "list",
    name: "department_name",
    message: "Department: ",
    choices: deptNames
  }, {
    type: "input",
    name: "price",
    message: "Price: ",
    validate: function(value){
      if(isNaN(value) === false){return true;}
      else{return false;}
    }
  }, {
    type: "input",
    name: "stock_quantity",
    message: "Quantity: ",
    validate: function(value){
      if(isNaN(value) == false){return true;}
      else{return false;}
    }
  }]).then(function(ans){
    connection.query('INSERT INTO Products SET ?',{
      product_name: ans.product_name,
      department_name: ans.department_name,
      price: ans.price,
      stock_quantity: ans.stock_quantity
    }, function(err, res){
      if(err) throw err;
      console.log('Another item was added to the store.');
    })
    start();
  });
}

start();

