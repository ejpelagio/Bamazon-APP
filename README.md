# Bamazon-APP
UT Coding Bootcamp. The goal was to create an Amazon-like store front using Node.js and MySQL.

Getting Started

What Each JavaScript Does

bamazonustomer.js

Prints the products in the store.

Prompts customer which product they would like to purchase by ID number.

Asks the customer for the quantity wanted to purchase.

If there is a sufficient amount of the product in stock, it will return the total for that purchase.
There for, if there is not enough of the product in store quantity stock, it will tell the user that there isn't enough of the product they have selected to purchase.
If the purchase goes through as we instructed Bamazon-APP, it updates the stock quantity to reflect the purchase.
It will also update the product sales in the department table.


bamazonmanager.js

Starts with a user friendly menu:

View Products for Sale
View Low Inventory
Add to Inventory
Add New Product
End Session
If the manager editing selects View Products for Sale, it lists all of the products in the store including all of their details.

If the manager selects to View Low Inventory, it'll list all the products with less than five items in its stock_quantity column.

If the manager selects Add to Inventory List, it allows the manager to select a product and add inventory to list and department.

If the manager selects Add New Product, it allows the manager to add a new product to the store Inventory.

If the manager selects End Session, it ends the session.

bamazonexecutive.js

Starts with a menu:

View Product Sales by Department
Create New Department
End Session
If the manager selects View Product Sales by Department, it lists the Department Sales and calculates the total sales from the overhead cost and product sales.

If the manager selects Create New Department, it allows the manager to create a new department and input current overhead costs and product sales. If there are none, by default it will set at 0, untill .

If the manager selects End Session, it ends the session and send a positive message.


Technologies and NPM used for my Bamazon-APP

Node.js
npm inquirer
npm mysql 
var prompt 
npm colors/safe 
npm cli-table2
npm inquirer
Sublime Text - Text Editor
MySQLWorkbench
Terminal
Github
