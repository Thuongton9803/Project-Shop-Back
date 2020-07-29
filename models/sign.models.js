const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const signSchema = new Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:true,
    },
    quen:{
        type:String,
        required:true,
    },
   email:{
       type:String,
       required:true,
   },
   phone:{
    type:Number,
    required:true,
},
birth:{
    type:String,
    required:true,
},
   pass:{
       type:String,
       requeired:true,
   },
   type:{
    type:String,
    required:true,
},
check:{
    type:String,
    required:true,
},

},{
    timestamps: true,
});

const Sign = mongoose.model('Sign', signSchema);

module.exports = Sign;