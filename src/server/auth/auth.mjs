/*
  LICENSE: MIT
  Created by: Lightnet
*/

//https://expressjs.com/en/guide/routing.html

import crypto from 'crypto';
import express from 'express';
import { API } from '../../lib/API.mjs';
//import session from 'express-session';
import clientDB from "../../lib/database.mjs";
import { isEmpty } from '../../lib/helper.mjs';
import { checkToken, parseJwt } from '../../lib/helperToken.mjs';
import { log } from '../../lib/log.mjs';
import { refreshBaseToken } from '../controllers/RefreshBaseToken.mjs';
import { refreshToken } from '../controllers/RefreshToken.mjs';
import { verifyBaseToken } from '../middleware/VerifyBaseToken.mjs';
import { verifyToken } from '../middleware/VerifyToken.mjs';
const router = express.Router();

var secret = process.env.SECRET;
//var enableSession = process.env.ISSESSION || true;
var enableCookie = process.env.ISCOOKIE || true;

//log("SECRET:", secret)
// https://github.com/expressjs/express/issues/2518
//var isLocal = (req.connection.localAddress === req.connection.remoteAddress);

// https://stackoverflow.com/questions/22285921/how-to-handle-user-agent-in-nodejs-environment
// https://expressjs.com/en/guide/using-middleware.html
// dev need remove?
router.use((req, res, next) => {
  //log('Time:', Date.now())
  //log('Request URL:', req.originalUrl)
  //log('Request Type:', req.method)
  //log("req.session.token: ",req.session.token)
  //log("req.cookies.token: ",req.cookies.token)
  //log(req.originalUrl.match("/src"))
  if(req.originalUrl == "/"){
    log("req.User-Agent: ", req.get('User-Agent'))
    log("req.socket.remoteAddress: ", req.socket.remoteAddress);//this?
    log("req.socket.localAddress: ", req.socket.localAddress);
    //log("req.headers: ",req.headers)

    return next();
  }else if(req.originalUrl?.indexOf("/@vite") == 0){
    //log("FOUND vite!")
    return next();
  }else if(req.originalUrl?.indexOf("/src") == 0 ){
    //log("FOUND src!")
    return next();
  }else if(req.originalUrl?.indexOf("/@react-refresh") == 0 ){
    //log("FOUND /@react-refresh!")
    return next();
  }else if(req.originalUrl?.indexOf("/node_modules") == 0 ){
    //log("FOUND /node_modules!")
    return next();
  }else if(req.originalUrl?.indexOf("/__vite_ping") == 0 ){
    //log("FOUND /__vite_ping!")
    return next();
  }else if(req.originalUrl?.indexOf("/api") == 0 ){
    log("FOUND /api!")
    log('Request URL:', req.originalUrl)
    //if(req.session.token){
      //log("checking...")
      //let sessionToken = checkToken(req.session.token, secret);
      //log("sessionToken: ", sessionToken)
    //}
    return next();
  }else if(req.originalUrl?.indexOf("/session") == 0 ){
    log("FOUND /session!")
    //log('Request URL:', req.originalUrl)
    //if(req.session.token){
      //log("checking...")
      //let sessionToken = checkToken(req.session.token, secret);
      //log("sessionToken: ", sessionToken)
    //}
    return next();
  }else{
    log('Request URL:', req.originalUrl)
  }
  next()
})

router.post('/signin', verifyBaseToken ,async function (req, res) {
  //var contentType = req.headers['content-type'];
  //log(contentType);
  
  let data = req.body;
  //log(req.body); // your JSON
  let db = await clientDB();
  let User = db.model('User');
  let user = await User.findOne({ username: data.alias }).exec();
  //log("users");
  //log(users);
  if(!user){
    return res.send({action:'NONEXIST'});
  }else{
    if(user.validPassword(data.passphrase)){
      //log("[login] password pass!");
      //let datasub = user.toAuthJSON()
      let token = user.generateToken(req)
      //if(enableSession){
        //log(token);
        //req.session.user = user.username;
        //req.session.token = token;
      //}

      if(enableCookie){
        //res.cookie("user", user.name)
        res.cookie("token", token,{
            httpOnly: true
          , maxAge: 24 * 60 * 60 * 1000
        })
      }
      let tokenKey = user.generateTokenKey(req)
      try{
        await user.save()
      }catch(e){
        log("LOGIN FAIL SAVE TOKEN!")
      }
      return res.send({api:API.AUTHS.LOGIN,user:user.username,token:tokenKey});
    }else{
      log("[login] password fail!");
      return res.send({error:"PASSWORDFAIL"});
    }
    //return res.send({action:'EXIST'});
  }

  //return res.send(req.body); // echo the result back
  //res.send(`<html lang="en">page</html>`);
});

router.post('/signup', verifyBaseToken, async function (req, res) {
  let data = req.body;
  //log("BODY: ",data)
  if((isEmpty(data.alias)==true)||(isEmpty(data.passphrase)==true)){
    return res.send({api:'EMPTY'});
  }

  let db = await clientDB();
  let User = db.model('User');
  let users = await User.findOne({ username: data.alias }).exec();
  //log("users");
  //log(users);
  if(!users){
    let newUser = new User({
      username: data.alias
    });
    newUser.setPassword(data.passphrase);
    try{
      await newUser.save();
      //let saveUser = await newUser.save();
      //return res.send(saveUser);
      return res.send({api:'CREATE'});
    }catch(e){
      return res.send({error:'Fail create user'});
    }
  }else{
    return res.send({api:'EXIST'});
  }
});

router.post('/signout', verifyToken,async function (req, res) {
  //log(req.session)
  let token =null;
  //if(req.session?.token){
    //token=req.session.token;
  //}
  if(req.cookies?.token){
    token=req.cookies.token;
  }

  let db = await clientDB();
  let User = db.model('User');
  // neeed token
  // 
  let user = await User.findOne({ token: token }).exec();
  if(user){
    //log(user);
    if(user.token == token){
      //log("FOUND");
      let datatoken = checkToken(token, process.env.REFRESH_TOKEN_SECRET); //check token
      if(datatoken){//passed
        let hash = crypto.createHash('md5').update(req.ip + user.tokenSalt).digest('hex');
        if(hash == datatoken.hash){
          //log("FOUND HASH!")
          try{  
            user.tokenSalt="";
            user.token="";
            await user.save()
          }catch(e){
            //log(e);
          }
          if(req.cookies?.token){
            res.clearCookie('token')
          }
          //if(req.session){//delete session
            //req.session.destroy(function(err) {
              //log(err);
              //log(req.session);
            //})
          //}
        }
      }else{
        //check for fake or outdate token
        datatoken = parseJwt(token);
        //log(datatoken);
        let hash = crypto.createHash('md5').update(req.ip + user.tokenSalt).digest('hex');
        // if expire but match the hash update token to none.
        if(hash == datatoken.hash){
          console.log("OUTDATE FOUND HASH!")
          try{  
            user.tokenSalt="";
            user.token="";
            await user.save()
          }catch(e){
            //console.log(e);
          }
        }
        if(req.cookies?.token){
          res.clearCookie('token')
        }
        // clear out session
        //if(req.session){//delete session
          //req.session.destroy(function(err) {
            //log(err);
            //log(req.session);
          //})
        //}
      }
    }
    return res.send({api:'LOGOUT'});
  }else{
    return res.send({api:'NOTOKEN!'});
  }
  //return res.send({error:'ERROR'}); // echo the result back
});

//not secure?
router.put('/passphrase',async function (req, res) {
  //log(req.session)
  let token =null;
  if(req.cookies.token){
    token=req.cookies.token;
  }
  if(!token){
    log("Token null")
    return res.sendStatus(403);
  }

  let db = await clientDB();
  let User = db.model('User');

  let user = await User.findOne({ token: token }).exec();
  if(user){
    //log(user);
    //log("FOUND");
    let datatoken = checkToken(token, process.env.REFRESH_TOKEN_SECRET); //check token
    if(datatoken){//passed
      let hash = crypto.createHash('md5').update(req.ip + user.tokenSalt).digest('hex');
      if(hash == datatoken.hash){
        log("FOUND HASH!")
        let data = req.body;
        log(data)
        if(user.changePassword(data.currentPassphrase,data.newPassphrase)){
          log("pass change passphrase")
          try{
            await user.save()
            return res.send({api:API.TYPES.UPDATE});
          }catch(e){
            return res.send({error:"Fail change passphrase DB"});
          }
        }else{
          log("fail change passphrase")
          return res.send({error:'passphrase fail'});
        }
      }
    }
    return res.send({error:'passphrase invalid'});
  }else{
    return res.send({api:'NOTOKEN!'});
  }
  //return res.send({error:'ERROR'}); // echo the result back
});

// https://mfikri.com/en/blog/react-express-mysql-authentication
router.get('/token', refreshToken); // get token last 15s
router.get('/basetoken', refreshBaseToken); // get token last 15s

//router.get('/session',async function (req, res) {
  //log(req.session);
  //return res.json(req.session);
//})

//router.get('/cookie', function (req, res) {
  //log(req.cookies)
  //res.json(req.cookies)
//})

export default router;