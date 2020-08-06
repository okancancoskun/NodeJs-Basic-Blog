const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:String,
    imageUrl:String,
    linkUrl:String,
    date:{
        type:Date,
        default:Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})
module.exports = mongoose.model("Products",productSchema);