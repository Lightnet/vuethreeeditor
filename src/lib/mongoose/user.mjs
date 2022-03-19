/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://thinkster.io/tutorials/node-json-api/creating-the-user-model

//Require Mongoose
import mongoose from 'mongoose';
import crypto from 'crypto';

// crypto 
import jwt from 'jsonwebtoken';
import { nanoid32, unixTime } from "../helper.mjs";
import dotEnv from 'dotenv';

dotEnv.config();
var secret = process.env.SECRET;

//Define a schema
//var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  id: {
    type:String,
    default: nanoid32
  },
  username: String,
  passphrase: String,
  email: {
    type:String,
    default:''
  },
  token:  {
    type:String,
    default:''
  },
  tokenSalt:  {
    type:String,
    default:''
  },
  tokenKey:  {
    type:String,
    default:''
  },
  bio: {
    type:String,
    default:''
  },
  image: {
    type:String,
    default:''
  },
  hash: {
    type:String,
    default:''
  }, //password
  salt: {
    type:String,
    default:''
  }, //auto gen password key
  groups: {
    type:String,
    default:''
  },
  access: {
    type:String,
    default:'USER'
  },
  role: {
    type:String,
    default:'USER'
  },
  isBan: {
    type:String,
    default:''
  },
  date: {
    type:Number,
    default:unixTime
  }
}, {timestamps: true});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.methods.changePassword = function(password, newpassword) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  if(this.hash === hash){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(newpassword, this.salt, 10000, 512, 'sha512').toString('hex');
    return true;
  }else{
    return false;
  }
}

UserSchema.methods.generateToken = function(req) {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + (60*60));
  this.tokenSalt = nanoid32();
  //need express trust true to work for ip?
  //console.log(req.ip)
  this.token = jwt.sign({
      id: this.id
    , hash: crypto.createHash('md5').update(req.ip + this.tokenSalt).digest('hex')
    , name: this.username
    //, exp: parseInt(exp.getTime() / 1000)
    //, exp: Math.floor(Date.now() / 1000) + ( 60) // 60 sec
    //, exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
    }, process.env.REFRESH_TOKEN_SECRET,{
      //expiresIn:'1h'
      expiresIn:60*60
    });
  return this.token;
}

UserSchema.methods.generateTokenKey = function(req) {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  this.tokenKey = nanoid32();
  //need express trust true to work for ip?
  //console.log(req.ip)
  //this.token = jwt.sign({
  return jwt.sign({
      id: this.id
    , hash: crypto.createHash('md5').update(req.ip + this.tokenKey).digest('hex')
    , name: this.username
    }, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn: '15s'
    });
  //return this.token;
}

//not used?
UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    id: this.id,
    name: this.username,
    exp: parseInt(exp.getTime() / 1000),
    }, secret);
}

//not used?
UserSchema.methods.toAuthJSON = function(){
  return {
    name: this.username
    //, email: this.email
    , token: this.generateJWT()
    //, bio: this.bio
    //, image: this.image
  };
}

//not used?
UserSchema.methods.checkToken = function(token){
  // invalid token - synchronous
  try {
    //var decoded = jwt.verify(token, 'wrong-secret');//check fail
    var decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if(decoded){
      return true;
    }else{
      return false;
    }

  } catch(err) {
    // err
    return false;
  }
}

//not used?
UserSchema.methods.checkTokenLogout = function(token){
  // invalid token - synchronous
  try {
    //var decoded = jwt.verify(token, 'wrong-secret');//check fail
    var decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if(decoded){
      return true;
    }else{
      return false;
    }

  } catch(err) {
    // err
    return false;
  }
}

export default UserSchema;
// Compile model from schema
//mongoose.model('User', UserSchema );

//var User = mongoose.model('User', UserSchema );
//export default User;

// user.validPassword(password)