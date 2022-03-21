/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper.mjs';

var Schema = mongoose.Schema;
var ProjectSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  userid: String,
  username: String,
  defaultsceneid: {
    type:String,
    default: ''
  },
  name: {
    type:String,
    default: ''
  },
  description: {
    type:String,
    default: ''
  },
  data: Schema.Types.Mixed,
  gamemodes: {
    type:String,
    default: ''
  },
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
//mongoose.model('Project', ProjectSchema );
export default ProjectSchema;