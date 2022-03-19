/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';

const router = express.Router();
//router.use('/favicon.ico', express.static('images/favicon.ico'));

router.get("/test",(req, res)=>{

  return res.json({text:"test"})
})


export default router;