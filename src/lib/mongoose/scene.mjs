/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid16, nanoid32, unixTime } from '../helper.mjs';

const Schema = mongoose.Schema;
var SceneSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  objectid: {
    type:String,
    unique:true,
    default: nanoid32
  },
  userid: String,
  username: String,
  projectid: {
    type:String,
    default: ''
  },
  editorid: {
    type:String,
    default: ''
  },
  name: {
    type:String,
    default: nanoid16
  },
  description: {
    type:String,
    default: nanoid16
  },
  data: Schema.Types.Mixed,
  access: {
    type:String,
    default: ''
  },
  isPublic: {
    type:Boolean,
    default: false
  },
  authors: [String],
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
//mongoose.model('Scene', SceneSchema );
export default SceneSchema;