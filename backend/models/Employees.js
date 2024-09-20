let mongoose = require("mongoose")
let schema1 = new mongoose.Schema({
    name:String,
    email: String,
    phone : Number,
    designation: String,
    gender: String,
    image: String,
    course : {
        type : Array,
        default : []
    },
})

let Employees = mongoose.model("Employees", schema1)

module.exports = Employees;