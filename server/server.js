const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');
const {authenticate} = require('./middleware/authenticate');

let app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
 });

app.post('/todos', (req, res) => {
	//console.log(req.body);
	let todo = new Todo({
		text: req.body.text
	});

	//this sends the response for the post request
	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) =>{
		res.send({todos});//send response as an object with es6 syntax
	},
		(e) => {
			res.status(400).send(e);
		})
});

app.get('/todos/:id', (req, res) => {

	let id = req.params.id;//get the id from the request url

	//check if the id is a valid one
	if(!ObjectID.isValid(id)){
		console.log("not valid id");
		return res.status(404).send("not valid id");
	}

	Todo.findById(id).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}
		res.status(200).send({todo});
	}, (e) => {
		res.status(400).send();
	});

});

app.delete('/todos/:id', (req, res) => {

	let id = req.params.id;

	//check if the id is a valid one
	if(!ObjectID.isValid(id)){
		console.log("not valid id");
		return res.status(404).send("not valid id");
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo){
			return res.status(404).send("record doesn't exist");
		}
		res.status(200).send({todo});
		}, (e) => {
			res.status(400).send("bad request");
		});
});

app.patch('/todos/:id', (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['text', 'completed']);

	//console.log(body);
	if(!ObjectID.isValid(id)){
		console.log("not valid id");
		return res.status(404).send("not valid id");
	}

	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(!todo){
			return res.status(404).send("record doesn't exist");
		}
		res.status(200).send({todo});
		}, (e) => {
			res.status(400).send("bad request");
		});	

});

app.get('/users/me', authenticate,  (req, res) => {
	res.send(req.user);
});

app.post('/users', (req, res) => {

	const body = _.pick(req.body, ['email', 'password']);
	console.log(body);
	const user = new User(body);

	//this sends the response for the post request
	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.listen(3001, () => {
	console.log('Started on port 3001');
});


// let newTodo = new Todo({
// 	text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
// 	console.log('Saved todo', doc);
// }, (e) => {
// 	console.log('Unable to save todo')
// })

// let newTodo1 = new Todo({
// 	text: 'cook bfreakfast',
// 	// completed: true,
// 	// complatedAt: 10
// });

// newTodo1.save().then((doc) => {
// 	console.log(JSON.stringify(doc, undefined, 3));
// }, (e) => {
// 	console.log('Unable to save todo')
// });



// let newUser = new User({
// 	name: "L",
// 	email: "lei@gmail.com"
// });

// newUser.save().then((doc) => {
// 	console.log(JSON.stringify(doc, undefined, 3));
// }, (e) => {
// 	console.log('Unable to save user');
// });

