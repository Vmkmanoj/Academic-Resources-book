const mongoes  = require("mongoose");



const Users = new mongoes.Schema({

   name:{type:"String"},
   password:{type:"String"}

})



const User = mongoes.model('User',Users)


module.exports = User;