const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
	if(err) {
		return console.log("Unable to connect to MongoDB server");
	}
	console.log('Connected to MongoDB server');
	const db = client.db("TodoApp");

	//deleteMany
	db.collection("Todos").deleteMany({text: "eat lunch"}).then((result) => {
		console.log(result);
	});


	//deleteOne
	db.collection("Todos").deleteOne({text: "eat lunch"}).then((result) => {
		console.log(result);
	});


	//findOneandDelete returns the deleted entry in the result object
	db.collection("Todos").findOneAndDelete({text: "eat lunch"}).then((result) => {
		console.log(result);
	});

	db.collection("Users").deleteMany({name: "Lei"}).then((result) => {
		console.log(result);
	});

	db.collection("Users").deleteOne({name: "Lei"}).then((result) => {
		console.log(result);
	});

	db.collection("Users").findOneAndDelete({
		_id: new ObjectID("5ab6d0a61eea2d3c927d879f")
	}).then((result) => {
		console.log(result);
	});

});