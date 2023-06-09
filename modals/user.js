const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const UserSchema = new Schema({
   name:{
      type:String,
      required:[true,'Please provide a name'],
      trim:true
   },
   email:{
      type:String,
      required:[true, 'Please provide a email'],
      unique:true,
      match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g]
   },
 
   
   role:{
      type:String,
      default:'user',
      emum:['user', 'admin']
   },
   password:{
      type:String,
      minlength:[6, 'Please provide a password with min length 6'],
      required:[true, 'Please provide a password'],
      select:false
   },
   createAt:{
      type:Date,
      default: Date.now
   },
   title:{
      type:String
   },
   about:{
      type:String,
      trim:true
   },
 
   place:{
      type:String
   },
   website:{
      type:String
   },
   profile_image:{
      type:String,
      default:'default.png'
   },
   blocked:{
      type:Boolean,
      default:false
   }
});

UserSchema.methods.generateJwtFromUser = function(){
   const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;
   const payload = {
      id:this._id,
      name:this.name
   };
   const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn:JWT_EXPIRE
   }) 
   return token
}

UserSchema.pre("save", function(next){
   if(!this.isModified("password")){
      next()
   }
   bcrypt.genSalt(10,(err, salt)=>{
      if(err) next(err);
      bcrypt.hash(this.password, salt, (err, hash)=>{
         if(err) next(err);
         this.password = hash; 
         next();
      })
   })
})
module.exports=mongoose.model('User', UserSchema)