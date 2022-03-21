/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// https://stackoverflow.com/questions/24100119/mongoose-connection-events-with-createconnection
// https://stackoverflow.com/questions/44191196/mongoose-create-a-user-schema-and-todo-schema
// https://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module
//
// https://stackoverflow.com/questions/10987444/how-to-use-global-variable-in-node-js
//
// NEXT API DATABASE
// https://next-auth.js.org/adapters/mongodb

//Import the mongoose module
import mongoose from 'mongoose';
import ProjectSchema from './mongoose/project.mjs';
import SceneSchema from './mongoose/scene.mjs';
import EntitySchema from './mongoose/entity.mjs';
import AssetSchema from './mongoose/asset.mjs';
import UserSchema from "./mongoose/user.mjs";

import { log } from './log.mjs';

//import dotEnv from 'dotenv';

//Set up default mongoose connection
//var mongoDB = 'mongodb://127.0.0.1/my_database';
//console.log(process.env.DATABASE_URL)
var mongoDB = process.env.DATABASE_URL || 'mongodb://127.0.0.1/my_database';

var db;

export default async function clientDB(){
  if(db){
    //console.log("LOCAL REUSED")
    return db;
  }

  if(global.db){
    //console.log("GLOBAL REUSED")
    return global.db;
  }

  //console.log("init DB")
  mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.model('Project', ProjectSchema)
  mongoose.model('Scene', SceneSchema)
  mongoose.model('Entity', EntitySchema)
  mongoose.model('Asset', AssetSchema)
  mongoose.model('User', UserSchema)

  //import('./mongoose/character.mjs');
  //Get the default connection
  db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', err => {
    log(`open DB`);
  })
  db.on('connected', () => {
    log('connected to mongodb');
  });
  db.on('disconnected', () => {
    log('connection disconnected');
  });
  
  global.db = db;
  return db;
}

export async function sessionTokenCheck(session){
  return new Promise( async (resolve, reject) => {
    if(session){
      if(!session.user.name){
        resolve({error:"FAIL",userid:null,username:null});
      }
      if(!session.token){
        resolve({error:"FAIL",userid:null,username:null});
      }

      if(session.token){
        const cdb = await clientDB();
        const User = cdb.model('User');
        const user = await User.findOne({username: session.user.name}).exec();
        if(typeof session.user.token == "string"){
          //console.log("STRING DATA...");
          if(user){
            //console.log("FOUND???");
            let bcheck = user.checkToken(session.user.token);
            //console.log("TOKEN: ", bcheck);
            //console.log(user);
            if(bcheck){
              // pass
              resolve({error:null,userid:user.id,username:user.username});
            }else{
              resolve({error:"FAIL",userid:null,username:null});
            }
          }else{
            resolve({error:"FAIL",userid:null,username:null});
          }
        }
      }
    }else{
      resolve({error:"FAIL",userid:null,username:null});
    }
  });
}

//check for session or cookies that is set for the token
export async function checkTokenUser(req){
  return new Promise( async (resolve, reject) => {
    //let isSession = false;
    let isCookie = false;
    let isToken = false;
    let token = null;
    //if(req.session){
      //isSession=true;
      //if(!req.session.user.name){
        //resolve({error:"FAIL",userid:null,username:null});
      //}
      //if(!req.session.token){
        //resolve({error:"FAIL",userid:null,username:null});
      //}else{
        //isToken=true;
        //token=req.session.token;
      //}
    //}else{
      //resolve({error:"FAIL SESSION",userid:null,username:null});
    //}

    if(req.cookies){
      isCookie=true;
      if(req.cookies.token){
        isToken=true;
        token=req.cookies.token;
      }else{
        //resolve({error:"FAIL COOKIE",userid:null,username:null});
      }
    }else{
      //resolve({error:"FAIL COOKIE",userid:null,username:null});
    }

    if((isSession == false) || (isCookie == false)){
      resolve({error:"FAIL NOT SETUP Session || Cookie",userid:null,username:null});
    }

    if(token){
      log(token)
      const cdb = await clientDB();
    }else{
      resolve({error:"FAIL ACCESS",userid:null,username:null});
    }
  });
}