//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');//es6 object destructuring, identical to above code


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
	if(err) {
		return console.log("Unable to connect to MongoDB server");
	}
	console.log('Connected to MongoDB server');
	const db = client.db("TodoApp");

	// db.collection('Todos').find({
	// 	_id: new ObjectID('5ab6cd09d978a53c19bc3381')
	// }).toArray().then((docs) => {

	// 	console.log("Todos");
	// 	console.log(JSON.stringify(docs, undefined, 3));
	// }, (err) => {
	// 	console.log("Unable to fetch todos", err);
	// });

	//count() return the number of all entries
	// db.collection('Todos').find().count().then((count) => {

	// 	console.log(`Todos count: ${count}`);
		
	// }, (err) => {
	// 	console.log("Unable to fetch todos", err);
	// });

	db.collection('Users').find({
		name: "Lei" // it's casesensitive when query string
	}).toArray().then((docs) => {

		console.log("Users");
		console.log(JSON.stringify(docs, undefined, 3));
	}, (err) => {
		console.log("Unable to fetch todos", err);
	});


	//client.close();
});

