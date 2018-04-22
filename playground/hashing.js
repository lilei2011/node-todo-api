const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(password, salt, (err, hash) => {
      console.log(hash);
   })
});

let hashedPassword = '$2a$10$DvZHYxcoIOaAMxZ1g65uqOxID2Az7z9xjRTMf4CVyBJ6YsVGB2U5y';

bcrypt.compare(password, hashedPassword, (err,res) => {
   console.log(res);
})
// let message = 'I am user number 3';
// let hash = SHA256(message);

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//    id: 10
// };

// let token = jwt.sign(data,'123abc');

// console.log(token);

// let decoded = jwt.verify(token, '123abc');
// console.log(decoded);
