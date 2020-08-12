load("employees.js");
load("suppliers.js");
load("customers.js");

/* (1) Find the company name, contact name, and contact title of the customers with a given company name. */;

db.orders.createIndex({"CUSTOMER.company name":1},{"unique":false});
db.orders.getIndexes();
db.orders.find({"CUSTOMER.company name":"Alfreds Futterkiste"},{"CUSTOMER.company name":1,"CUSTOMER.contact name":1,"CUSTOMER.contact title":1}).explain();
db.orders.dropIndex("CUSTOMER.company name_1");

/* (2) Find the company name of the customers who submitted an order with a give date. */;

db.orders.createIndex({"CUSTOMER.submits.ORDER.order date":1},{"unique":false});
db.orders.getIndexes();
db.orders.find({"CUSTOMER.submits.ORDER.order date":ISODate("1996-12-16T00:00:00Z")},{"CUSTOMER.company name":1}).explain();
db.orders.dropIndex("CUSTOMER.submits.ORDER.order date_1");


/* (3) Find the names of products ordered by the customers living in a given city. */;

db.orders.createIndex({"CUSTOMER.city":1},{"unique":false});
db.orders.getIndexes();
db.orders.find({"CUSTOMER.city":"México D.F."},{"CUSTOMER.submits.ORDER.product name":1}).explain();
db.orders.dropIndex("CUSTOMER.city_1");

/* (4) Find the names of countries the customers live in. */;

db.orders.createIndex({"CUSTOMER.country":1},{"unique":false});
db.orders.getIndexes();
db.orders.find({"CUSTOMER":{"$exists":true}},{"CUSTOMER.country":1}).explain();
db.orders.dropIndex("CUSTOMER.country_1");
