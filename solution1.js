load("employees.js");
load("suppliers.js");
load("customers.js");
/* (1) Append a new product Changde Noodles that belongs to a category Noodles to a list of products supplies by a supplier located in a city Zaandam. All other information is unknown at the moment. Display the names of products supplied by a supplier located in a city Zaandam. */;

db.orders.update({"SUPPLIER.city":"Zaandam"},{$push:{"SUPPLIER.supplies":{"PRODUCT":{"product name":"Changde Noodles","category name":"Noodles"}}}});

db.orders.find({"SUPPLIER.city":"Zaandam"},{"SUPPLIER.supplies.PRODUCT.product name":1,"_id":0}).pretty();


/* (2)Remove information about a product Longlife Tofu supplied by a supplier Tokyo Traders. Display the names of products supplied by a supplier Tokyo Traders. */;

db.orders.update({$and:[{"SUPPLIER.supplies.PRODUCT.product name":"Longlife Tofu"},{"SUPPLIER.company name":"Tokyo Traders"}]},{$pull:{"SUPPLIER.supplies":{"PRODUCT.product name":"Longlife Tofu"}}});

db.orders.find({"SUPPLIER.company name":"Tokyo Traders"},{"SUPPLIER.supplies.PRODUCT.product name":1}).pretty();


/* (3) Increase a unit price of a product Flotemysost by 100%. Display the product name and the changed unit price in a pretty format. */;

db.orders.update({"SUPPLIER.supplies.PRODUCT.product name":"Flotemysost"},{$mul:{"SUPPLIER.supplies.$.PRODUCT.unit price":NumberDecimal(2)}});


db.orders.find({"SUPPLIER.supplies.PRODUCT.product name":"Flotemysost"},{"SUPPLIER.supplies.PRODUCT.product name":1,"SUPPLIER.supplies.PRODUCT.unit price":1}).pretty();


/* (4) Rename a key submits to a key sends in the orders submitted by a customer FAMIA. Display all information about a customer FAMIA. */; 

db.orders.update({"CUSTOMER.customer code":"FAMIA"},{$rename:{"CUSTOMER.submits":"sends"}});

db.orders.find({"CUSTOMER.customer code":"FAMIA"}).pretty();


/* (5) An order with order_id equal to 310 is now handled by an employee with employee id equal to 7. Update the database. After update display order_id and employee id in a pretty format. */;

db.orders.update({"CUSTOMER.submits.ORDER.order id":310},{$set:{"CUSTOMER.submits.$.ORDER.employee id":7}});

db.orders.find({"CUSTOMER.submits.ORDER.order id":310},{"CUSTOMER.submits.ORDER.order id":1,"CUSTOMER.submits.ORDER.employee id":1}).pretty();
