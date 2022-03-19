/*
  LICENSE: MIT
  Created by: Lightnet
*/

import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { log } from "../../lib/log.mjs";

const BASE_TOKEN_SECRET = process.env.BASE_TOKEN_SECRET || "BASE_TOKEN_SECRET";

//base or basic access for checks
// for login, sign up
export const refreshBaseToken = async(req, res) => {
  //without user access but guest token
  try {
    log("/refreshbasetoken")
    let hash= crypto.createHash('md5').update(req.ip+BASE_TOKEN_SECRET+req.socket.remoteAddress).digest('hex');
    const accessToken = jwt.sign({
      hash:hash
    }, hash,{
      expiresIn: '15s'
    });
    res.json({ accessToken });
  } catch (error) {
    log(error);
    res.json({ error:'base token error!' });
  }
}