const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    company_name:String,
    product_name:String,
    contact_number:Number,
    email:String
})

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel