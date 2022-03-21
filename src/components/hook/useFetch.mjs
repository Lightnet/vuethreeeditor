/*
  LICENSE: MIT
  Created by: Lightnet
*/

export default async function useFetch(url, options){
  try{
    if(!url){
      console.log("url error");
      return {error:'null url ERROR'}
    }
    if(!options){
      options={};
    }
    //console.log(options)
    let response = await fetch(url, options);
    if (!response.ok) {
      //const message = 'Error with Status Code: ' + response.status;
      //throw new Error(message);
      console.log("RESPONSE FETCH ERROR");
      return {error:'SERVER FETCH ERROR'};// check if the server error
    }
    let data = await response.json();
    return data;
  }catch(e){
    console.log("TRY FETCH ERROR: ", e);
    return {error:'TRY FETCH ERROR'}; //check for json format error
  }
}