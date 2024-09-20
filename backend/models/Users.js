let mongoose = require("mongoose")
let schema1 = new mongoose.Schema({
    name:String,
    email: String,
    cnfPassword: String,
   
})

let Users = mongoose.model("Users", schema1)

module.exports = Users;