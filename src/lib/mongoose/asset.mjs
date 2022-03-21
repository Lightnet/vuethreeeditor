/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper.mjs';

const Schema = mongoose.Schema;
var AssetSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  userid: String,
  projectid: {
    type:String,
    default: ''
  },
  filepath:{
    type: String,
    default: ''
  },
  filename:{
    type: String,
    default: ''
  },
  filetype:{
    type: String,
    default: ''
  },
  data:{
    type: String,
    default: ''
  },
  datatype:{//binary or hex or text?
    type: String,
    default: ''
  },
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
//mongoose.model('Asset', AssetSchema );
export default AssetSchema;