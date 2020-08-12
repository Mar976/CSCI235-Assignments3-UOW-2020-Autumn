load("employees.js");
load("suppliers.js");
load("customers.js");

/* (1) Save all information about the names of products suplied by a supplier Gai paturage into a collection products1. Display in a pretty format without document identifiers all documents in a collection products1. */;

db.orders.aggregate([{$match:{"SUPPLIER.company name":"Gai paturage"}},{$project:{"SUPPLIER.supplies.PRODUCT.product name":1,"_id":0}},{$out:"products1"}]);
db.products1.aggregate({$project:{"_id":0}}).pretty();

/* (2) Save all information about the names of products supplied by a supplier Gai paturage into a collection products2 that consists of the documents like {"product name": a-name-of-product}. Display in a pretty format without document identifiers all documents in a collection products2. */;


db.orders.aggregate([{$match:{"SUPPLIER.company name":"Gai paturage"}},{$unwind:"$SUPPLIER.supplies"},{$project:{"product name":"$SUPPLIER.supplies.PRODUCT.product name","_id":0}},{$out:"products2"}]);

db.products2.aggregate({$project:{"_id":0}}).pretty();

/* (3) Find the total number of products in a collection orders. Display a result in a format {"total number of products":integer-value}. */;

db.orders.aggregate([{$match:{"SUPPLIER.supplies.PRODUCT":{$exists:true}}},{$count:"Total number of products"}]);

/* (4) List in the ascending order the ids of the first 3 employees who handled at least one order. Display the results in a format {"employee id":a-value-of employee-id}. List only distinct values. */;

db.orders.aggregate([{$match:{"CUSTOMER.submits.ORDER.employee id":{"$exists":true}}},{$project:{"employee id":"$CUSTOMER.submits.ORDER.employee id", "_id":0}},{$out:"listEmployees"}]);

db.listEmployees.aggregate([{$unwind:"$employee id"},{$project:{"_id":0}},{$limit:3},{$sort:{"employee id":1}}]).pretty();


/* (5) Find the company names of suppliers together with the total number of supplied products by each company. Display the results in a format {"total products":integer-value,"company name":a-company-name}. */

db.orders.aggregate([{$unwind:"$SUPPLIER.supplies"},{$group:{"_id":"$SUPPLIER.company name","total products":{$sum:1}}},{$out:"totalProduct"}]);

db.totalProduct.aggregate([{$project:{"total products":"$total products","company name":"$_id","_id":0}}]);



