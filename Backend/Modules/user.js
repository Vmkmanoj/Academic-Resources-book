const mongoes  = require("mongoose");
const { type } = require("os");



const Users = new mongoes.Schema({

   UserName:{type:"String"},

   name:{type:"String"},
   password:{type:"String"}

})



const User = mongoes.model('User',Users)


module.exports = User;