const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');


//remove all records in todos
// Todo.remove({}).then((result) => {
// 	console.log(result);
// });


let id = '5abda07ec67c2282e09ac6ff';


// remove by matching the property
Todo.findOneAndRemove({_id: id}).then((todo) => {
	console.log(todo);
});

// remove by matching the id
Todo.findByIdAndRemove(id).then((todo) => {
	console.log(todo);
});