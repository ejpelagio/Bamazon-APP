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

connection.connect();
		
	showMeProduct();
//------------------------------------------------------------------------------------
		//First function that prints the products. 
	function showMeProduct() {
 	connection.query('SELECT * FROM bamazon_db.products ', function(err, result) {
 			 	if (err) throw err;
 		 	
 			
 				//console_log("result");


 				console.log(colors.red("------Welcome to Bamazon!!------")); 
 				console.log("							");

 			for (var i = 0; i < result.length; i++){
				console.log(result[i].product_id + " " + "'" + 
						result[i].product_name + "'" + " " + 
						//result[i].DepartmentName + colors.green(" $") + 
						result[i].price + " " + 
						result[i].stock_quantity + colors.magenta(" Units"));	
		}
})
 	// prompt.message = colors.green("Your order:");
  	
  		var schema = {
    			properties: {
     	 			product_id: {
        				message: colors.blue('Select your product by Id'),
        				required: true
      },
     				quantity: {
     					message: colors.blue('How many units of the product would you like to buy?'),
        				required: true
      }

    }

  };
 	prompt.get(schema, function (err, result) {
 				if (err) throw err;
 					 console.log('Command-line input received:');

 			var ordering = {
 				product_id: result.product_id,
 				quantity: result.stock_quantity
 			};	

 			var selection = result.product_id;
 			var	amount = result.quantity;

 				 showMeProduct();
 				checkingOut(selection,amount);
 		})

}//end of function showMeProduct
//------------------------------------------------------------------------------------
	//Second function that let the user purchase the products.
	function checkingOut(selection, amount) {
		connection.query('SELECT * FROM bamazon_db.products WHERE product_id = ' + selection, function(err, result) {
		if (err) throw err;

			var productQ = selection -1;

			 if(productQ > 0 ){
			 	console.log("Sorry, Not enough in Stock");
			 	
			 } else {
			 	for(var i = 1; i < result.length; i++){
			 		console.log('The ' + result[i].product_name + 
			 			' cost ' + colors.green(" $") + result[0].price );
			 		console.log('Your Total is ' + colors.green(" $") + amount * result[productQ].Price);
			 	}   											
			 
			 // updateProduct(selection,amount);
		}
		function exit() {
	console.log("Thanks for using Bamazon!!!");
	connection.end();
}
		
	})

}
//------------------------------------------------------------------------------------
	//Third Function that updates the Mysql data.
	function updateProduct(selection, amount){
		connection.query('UPDATE bamazon_db.products SET WHERE ? = product_id = ' + selection, function(err, result) {
			console(selection);
			showMeProduct();
	});

};

 
// connection.end();
