/*
  LICENSE: MIT
  Created by: Lightnet
*/

import jwt from "jsonwebtoken";
import clientDB from "../../lib/database.mjs";
import crypto from 'crypto';
import { log } from "../../lib/log.mjs";

export const refreshToken = async(req, res) => {

  try {
    const refreshToken = req.cookies.token;
    log("/token")
    //if(!refreshToken) return res.sendStatus(401);
    if(!refreshToken) return res.json({ error:"NOTLOGIN" });;
    const db = await clientDB();
    const Users = db.model('User');
    //const user = await Users.fineOne({refresh_token: refreshToken}).exec()
    const user = await Users.findOne({token:refreshToken})
      .select('id username tokenSalt')
      .exec()
    //log(user);
    if(!user) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if(err) {
        log(err)
        //clear cookies
        res.clearCookie('token')
        return res.sendStatus(403);
      }
      //console.log(decoded)
      let hash= crypto.createHash('md5').update(req.ip + user.tokenSalt).digest('hex');
      if(hash == decoded.hash){//check hash if tmp token expire
        //log("MATCH HASH")
      }else{
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign({id:user.id,user:user.username}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '15s'
      });
      res.json({ accessToken });
    });
  } catch (error) {
    log(error);
    return res.sendStatus(403);
  }
}