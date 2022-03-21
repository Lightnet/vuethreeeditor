/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper.mjs';

const Schema = mongoose.Schema;
var EntitySchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  objectid: { //object3d id
    type:String,
    unique:true,
    default: nanoid32
  },
  projectid: {
    type:String,
    default: ''
  },
  sceneid: {
    type:String,
    default: ''
  },
  name: {
    type:String,
    default: ''
  },
  data: {
    type:Schema.Types.Mixed,
    default: {}
  },
  authors: [String],
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
//mongoose.model('Entity', EntitySchema );
export default EntitySchema;