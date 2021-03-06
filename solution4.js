/* Start a command line interface mongo to MongoDB database server and process the following statements. */;
/* db.adminCommand( {setFeatureCompatibilityVersion:"4.2"} ); */;
/* use test; */;

/* Use a method createCollection() to create a collection of documents task4 and use JSON schema validator to enforce the following constraints on the collection. */;
/* (1) Information about products must be nested within information about suppliers. */;
/* (2) Information about keywords describing products must be nested within information about products. */;
/* (3) The values associated with the key names company name, city, (within SUPPLIER class), product name, keywords */;
/*     (within PRODUCT class) must be of type string. */;
/* (4)	The values associated with a key postal code (within SUPPLIER class) must be of type integer in a range 0..9999. */;
/* (5)	The values associated with a key units in stock (within PRODUCT class) must be of type integer and must positive. */;
/* (6) 	The values associated with a key unit price must be of type double and must be positive and less than 100.0. */;
/* (7)	A key company name is mandatory. */;


db.createCollection("task4",{"validator":{"$jsonSchema":{
"bsonType":"object",
"properties":{"SUPPLIER":{"bsonType":"object","required":["company_name","city"],
			   "properties":{"company_name":{"bsonType":"string","description":"company name"},
					 "city":{"bsonType":"string","description":"City Name"},
					 "postal_code":{"bsonType":"int","description":"Postal Code","minimum":0,"maximum":9999},
					 "supplies":{"bsonType":"array","description":"Supplies product List",
						     "items":{"bsonType":"object","properties":{"PRODUCT":{"bsonType":"object","required":["product_name","keywords"],
									      "properties":{"product_name":{"bsonType":"string","description":"Product name"},
											    "unit_price":{"bsonType":["double"],"description":"Units Price","minimum":0.0,"maximum":100.00},
											    "units_in_stock":{"bsonType":"int","description":"Units in Stock","minimum":0},
											    "keywords":{"bsonType":"array","description":"Keywords for each product","items":{"bsonType":"string"} }} }}} }}}} }}});

/* Next, insert into a collection task4 two sample documents. The first document must pass all validations of the constraints listed above. */
db.task4.insert({"_id":"Warm Winter","SUPPLIER":{"company_name":"Warm Winter","city":"Sydney","postal_code":NumberInt(2519),"supplies":[{"PRODUCT":{"product_name":"Ice","unit_price":59.00,"units_in_stock":NumberInt(5),"keywords":["Cloths"]}}]}});

/* The second document must fail validation of one of the constraints listed above. Provide information why a document fails a validation */;
/* Reason: ??? */

db.task4.insert({"_id":"Shy Camel","SUPPLIER":{"company_name":"Shy Camel","city":"Sydney","postal_code":NumberInt(2519),"supplies":[{"PRODUCT":{"product_name":"Ice","unit_price":101.00,"units_in_stock":NumberInt(5),"keywords":["Camel"]}}]}});
