/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
const router = express.Router();
import { isEmpty, nanoid32 } from "../../lib/helper.mjs"
import clientDB from "../../lib/database.mjs"

router.get('/entity', (req, res) => {
  //res.json({ error: 'Not found' });
  res.json({ error: 'not found entity' });
})

router.post('/entity', async (req, res) => {
  //res.json({ error: 'Not found' });
  const {api} = req.body;
  if(isEmpty(api)){
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  let userid =null;
  let username =null;
  if(req.cookies.token){
    const User = db.model('User');
    let user = await User.findOne({token:req.cookies.token})
      .exec();
    //log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }

  if(api=="ENTITIES"){
    try{
      let data = req.body;
      const Entity = db.model('Entity');
      let entities = await Entity.find({sceneid: data.sceneid}).exec();
      //console.log("entities///////////////");
      //console.log(entities);
      let _entities = [];
      for(let idx in entities){
        //console.log(entities[idx]);
        _entities.push(entities[idx].data)
      }
      return res.json({
        api:'ENTITIES'
        , entities:_entities
      });
    }catch(e){
      //console.log(e);
      return res.json({error:"GET PROJECT FAIL"});
    }
  }
  if(api=="CREATE"){
    try{
      let data = req.body;
      const Entity = db.model('Entity');
      const newEntity = await Entity({
          projectid: data.projectid
        , sceneid: data.sceneid
        , objectid : data.data.objectid
        , data: data.data
      });

      const saveObject = await newEntity.save();
      return res.json({api:"CREATE",Entity:saveObject});
    }catch(e){
      return res.json({error:"Fail Create Entity!"});
    }
  }
  res.json({ error: 'not found entity' });
})

router.put('/entity', async (req, res) => {
  //res.json({ error: 'Not found' });
  const {api} = req.body;
  if(isEmpty(api)){
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  let userid =null;
  let username =null;
  if(req.cookies.token){
    const User = db.model('User');
    let user = await User.findOne({token:req.cookies.token})
      .exec();
    //log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }

  if(api=="UPDATE"){
    try{
      let data = req.body;
      const Entity = db.model('Entity');
      let query={
        objectid:data.data.objectid
      }
      //console.log(query)
      let update={
        data:data.data
      }
      //console.log(update)
      try{
        let doc = await Entity.findOneAndUpdate(query,update,{new:true});
        return res.json({api:"UPDATE",entity:doc});
      }catch(e){
        return res.json({error:"FAILUPDATE"});
      }
    }catch(e){
      //console.log(e);
      return res.json({error:"Delete Entity Fail!"});
    }
  }
  res.json({ error: 'not found entity' });
})

router.delete('/entity', async (req, res) => {
  //res.json({ error: 'Not found' });
  const {api} = req.body;
  if(isEmpty(api)){
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  let userid =null;
  let username =null;
  if(req.cookies.token){
    const User = db.model('User');
    let user = await User.findOne({token:req.cookies.token})
      .exec();
    //log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }
  
  if(api=="DELETE"){
    try{
      let data = req.body;
      const Entity = db.model('Entity');
      await Entity.findOneAndDelete({objectid:data.objectid});
      //let doc = await Entity.findOneAndDelete({id:data.id});
      //console.log("DOC//////////////////////");
      //console.log(doc);
      return res.json({
        api:'DELETE'
        , id:data.id
      });
    }catch(e){
      //console.log(e);
      return res.json({error:"Delete Entity Fail!"});
    }
  }
  res.json({ error: 'not found entity' });
})
export default router;