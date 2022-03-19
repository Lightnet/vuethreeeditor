/*
  LICENSE: MIT
  Created by: Lightnet
*/

import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { log } from "../../lib/log.mjs";

const BASE_TOKEN_SECRET = process.env.BASE_TOKEN_SECRET || "BASE_TOKEN_SECRET";

//check token access that is 15 sec recheck
export const verifyBaseToken = async (req, res, next) => {
  //log("/verifyBaseToken")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  //log("middleware token:",token)
  if(token == null) return res.sendStatus(401);
  let hash= crypto.createHash('md5').update(req.ip+BASE_TOKEN_SECRET+req.socket.remoteAddress).digest('hex');
  jwt.verify(token, hash, (err, decoded) => {
    if(err) return res.sendStatus(403);
    log("PASS verifyBaseToken")
    //pass a variable to next request
    //req.email = decoded.email;
    next();
  })
}