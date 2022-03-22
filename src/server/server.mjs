/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.npmjs.com/package/connect-mongo
// https://expressjs.com/en/resources/middleware/session.html
// 
import chalk from 'chalk';
import http from 'http';
import express from "express";
import dotEnv from 'dotenv';
import routes from './routes.mjs';
import cors from "cors";
import { networkInterfaces } from 'os';
import path from 'path'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const log = console.log;

// load .env var
dotEnv.config();

const SECRET = process.env.SECRET;
//console.log(SECRET)
const DATABASE_URL = process.env.DATABASE_URL;
//console.log(DATABASE_URL)

//var DATABASE_URL = process.env.DATABASE_URL;
//console.log("DATABASE_URL: ",DATABASE_URL)

const app = express();
//const PORT =  process.env.PORT || 3003;
const PORT =  process.env.PORT || 3000;
const HOST = process.env.HOST ||"0.0.0.0";

function getIPAddress() {
  // import { networkInterfaces } from 'os';
  var interfaces = networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}
// https://www.npmjs.com/package/cors
var whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

async function main(){
  //let db = await clientDB();

  //app.use(cors(corsOptions))
  app.use(cors())
  app.use(cookieParser())
  //public | dist > folder
  app.use(express.static('assets'));
  app.use(express.static('public'));
  app.use(express.static('dist'));
  //app.use(express.static('.'));

  //app.set('trust proxy', 1) // trust first proxy
  app.set('PORT', PORT)
  app.set('HOST', HOST)

  app.use(express.json())

  //app.use('/favicon.ico', express.static('/favicon.ico'));

  // Access the session as req.session
  //app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../client/index.html'));
  //})

  let pages=[
      '/account'
    , '/message'
    , '/signin'
    , '/signout'
    , '/testlab'
    //, '/texteditor'
  ]
  //  https://www.w3schools.com/jsref/jsref_indexof_array.asp
  // load page index
  app.use((req, res, next) => {
    //console.log(pages.indexOf(req.originalUrl))
    if((pages.indexOf(req.originalUrl) != -1)&&(req.method=="GET")){
      console.log("load html???")
      return res.sendFile(path.join(__dirname, '../client/index.html'));
    }
    next()
  })
  
  //Routes
  app.use(routes); 
  //const server = app.listen(app.get('PORT'), () => {
    //console.log(`Server app listening at http://localhost:${PORT}`)
  //})
  const server = http.createServer(app);

  //server.listen(app.get('PORT'),()=>{
  server.listen(app.get('PORT'),app.get('HOST'),()=>{
    console.log('Init Server listen...')
    //console.log("SERVER:: ",server.address())
  });

  server.on('listening', function() {
    let localhost = getIPAddress();
    console.log(`Local host IP Address on `,chalk.green(`http://${localhost}:${PORT}`));
    //console.log(`IP address 1 on http://localhost:${PORT} <- Default for dev testing...`);
    //log("");
    log("[API] Server on "+chalk.green(`http://localhost:${PORT} `) + chalk.red('Dev API Url.'));
    log("Web Server on "+chalk.green(`http://localhost:3000 `) + chalk.red('Dev API web.'));
    //log("");
    //console.log(`IP address 2 on http://${HOST}:${PORT}`)// does not work but if "0.0.0.0" this will aollow outside access
    //console.log(`IP address 3 on http://127.0.0.1:${PORT}`);//does not work script // Content Security Policy 
    //console.log(`IP address 4 on http://localhost:${PORT}/ip <- IP Test`);
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
    //console.log("SERVER:: ",server.address())
  });

  // https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits

  /*
  process.on('exit',()=>{
    server.close();
  })

  //catches ctrl+c event
  process.on('SIGINT',()=>{
    server.close();
  })

  process.on('SIGTERM',()=>{
    server.close();
  })

  //catches uncaught exceptions
  process.on('uncaughtException',()=>{
    server.close();
  })
  */
}

main();

export default app;