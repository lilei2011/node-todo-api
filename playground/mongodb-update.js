//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');//es6 object destructuring, identical to above code


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
	if(err) {
		return console.log("Unable to connect to MongoDB server");
	}
	console.log('Connected to MongoDB server');
	const db = client.db("TodoApp");

	db.collection("Users").findOneAndUpdate({
		name: "Lei"
	},{
		$inc: {
			age: 5
		}
	},{
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	//client.close();
});

