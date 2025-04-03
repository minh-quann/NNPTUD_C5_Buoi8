let mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required:true
    },description:{
        type:String,
        default:""
    },slug: {
         type: String, 
         unique: true, 
         required: true 
        }
},{
    timestamps:true
})
module.exports = mongoose.model('category',categorySchema);