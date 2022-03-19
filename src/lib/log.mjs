/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://gist.github.com/robatron/5681424
// https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
// https://stackoverflow.com/questions/20524700/custom-console-log-function-a-console-log-wrapper
// https://stackoverflow.com/questions/27791703/can-i-find-server-side-hard-drive-letter-using-node-js
// https://blog.jakoblind.no/debug-webpack-app-browser/
// https://developer.mozilla.org/en-US/docs/Web/API/console/trace
// https://stackoverflow.com/questions/69071151/why-is-console-log-showing-react-devtools-backend-js4049-instead-of-the-file

import chalk from "chalk";
import path from "path";

var PROCESSDEBUG;
if(typeof process !== "undefined"){ // check if this is on nodejs.
  PROCESSDEBUG = process.env.ISDEBUG;
}
const ISDEBUG = PROCESSDEBUG || true;

export function log(...args){
  if(ISDEBUG){
    //console.log('[log]',...args);
    //console.log.apply(this, args);
    let e = new Error(args);
    //console.log(e)
    //console.log(e.message)
    //console.log(e.stack)
    let fullTrace = e.stack.split('\n');
    //console.log(chalk.red("Full Trace"));
    //console.log(fullTrace);
    for( var i = 0 ; i < fullTrace.length ; ++i ){
      fullTrace[i] = fullTrace[i].replace(/\s+/g, ' ');
    }
    let caller = fullTrace[2], // file
                 callerParts = caller.split(':');
    //console.log("caller");
    //console.log(caller);
    if( callerParts.length >= 1 ){

      if(typeof process !== "undefined"){// node js
        
        const cwdOSRoot = path.parse(process.cwd()).root;
        //check and remove ")" line if exist
        //console.log(callerParts)
        if(callerParts[4]){
          //let stack = String(e.stack)
          //console.log(stack)
          let space = callerParts[4].replace(")" , " ")
          console.log(chalk.green('Console log:'), path.join(cwdOSRoot,callerParts[2])+":"+ callerParts[3]+":"+space );
        }else{// array object?
          let stack = String(e.stack)
          console.log(chalk.green('Console log:'), stack.slice(stack.indexOf(" file:///"),stack.indexOf("at process")).trim())
        }
        console.log.apply(console, args); // ok
      }else{ //browser
        //console.log(fullTrace);
        //console.log("TRACE:");
        let stack = String(e.stack)
        console.log(chalk.green('Console log:'))

        // fail, go to bundle.js url
        //console.log(chalk.yellow('Console log:')+stack.slice(0,stack.indexOf("at invoke")).trim())
        // fail, go to bundle.js url
        //console.log(stack.slice(10,stack.indexOf("at invoke")).trim())
        
        if(stack.match("at invoke")){
          console.log(stack.slice(0,stack.indexOf("at invoke")).trim())
        }else if(stack.match("at render")){
          console.log(stack.slice(0,stack.indexOf("at render")).trim())
        }else{
          console.log(stack.trim())
          console.log.apply(console, args); // ok
        }
      }
    }
    //console.log(args); //nope, array
    //console.log.apply(this,args); // ok
    //console.log.apply(console, args); // ok
  }
}