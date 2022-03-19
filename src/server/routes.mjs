/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import auth from './auth/auth.mjs';
import route_api from './routes/route_api.mjs';
import route_test from "./routes/route_test.mjs";
const router = express.Router();
//router.use('/favicon.ico', express.static('images/favicon.ico'));

console.log("init routes...");
router.use(auth);
router.use("/api",route_api);

router.use(route_test)

export default router;