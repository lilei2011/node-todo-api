const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

let id = '5ab70b26b3774746328b7ffb';

let user_id = '5ab711e9a4bcf8471f451ddc';

// if(!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

// Todo.find({ // find all matches by any property
// 	_id: id
// }).then((todos) => {
// 	console.log("Todos", todos);
// });

// Todo.findOne({ // find the first match by any property
// 		_id: id
// }).then((todo) => {
// 	console.log("Todo", todo);
// });

// Todo.findById(id).then((todo) => { // find by ID
// 	if(!todo) {
// 		return console.log("Id not found");
// 	}
// 	console.log("Todo", todo);
// }).catch((e) => console.log(e));

// User.find({
// 	_id: user_id
// }).then((users) => {
// 	if(users.length===0) {
// 		console.log("User not found");
// 	}
// 	console.log("users", users);
// }).catch((e) => {
// 	console.log(e);
// });

User.findOne({
	_id: user_id
}).then((user) => {
	if(!user) {
		console.log("User not found");
	}
	console.log("user", user);
}).catch((e) => {
	console.log(e);
});


User.findById(user_id).then((user) => {
	if(!user) {
		console.log("User not found");
	}
	console.log("user", user);
}).catch((e) => {
	console.log(e);
});

