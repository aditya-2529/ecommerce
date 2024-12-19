const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");


dotenv.config({path:"./config.env"});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  tokens:[
      {
          token:{
              type:String,
              required: true
          }
      }
  ],
  orders:{
    type: Array
  },
  cartId: {
    type: String
  }
});

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function() {
  try {
      let token = jwt.sign({_id:this._id},process.env.SECRETKEY);
      this.tokens = this.tokens.concat({token:token});
      await this.save();
      return token;
  } catch (error) {
      console.log(error);
  }
}

module.exports = mongoose.model('User', userSchema);