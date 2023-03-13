const mongoose = require("mongoose");

const withdrawSchema = mongoose.Schema({
    name:{
        default: "",
        type:String,
        trim: true,
    },
    amount: {
        default: 0,
        type: Number,
        trim: true,
    },
    userId: {
        type: String,
        default: "",
        trim: true,
    },
    
  
    account: {
        type: String,
        default: "",
        trim: true,
    },


});

const Withdraw = mongoose.model("Withdraw", withdrawSchema);
module.exports = Withdraw;