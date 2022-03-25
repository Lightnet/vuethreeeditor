/*
  LICENSE: MIT
  Created by: Lightnet
*/
/*
  //    id        //field name with space between
  find({ id:id }).select('id name date').exec(callback);
 */

// https://expressjs.com/en/guide/routing.html
// https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/
// https://stackoverflow.com/questions/41878838/how-do-i-set-multipart-in-axios-with-react
// https://stackoverflow.com/questions/26691543/return-certain-fields-with-populate-from-mongoose
// https://www.codegrepper.com/code-examples/whatever/mongodb+select+fields+from+array
// https://stackoverflow.com/questions/15229966/in-mongoose-how-to-select-the-fields-in-a-array-property
// 

import express from 'express';
import formidable from "formidable";
import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import clientDB from '../../lib/database.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadFolder = path.join(__dirname, "../../../public", "files");
console.log(uploadFolder)

const router = express.Router();

const isFileValid = (file) => {
  //const type = file.type.split("/").pop();
  //const type = file.mimetype.split("/").pop();
  const type = file.originalFilename.split(".").pop();
  //console.log("type")
  //console.log(type)
  const validTypes = [
    "jpg"
    , "jpeg"
    , "png"
    , "pdf"
    , "txt"
    , "md"
    , "js"
    , "zip"
    , "iso"
  ];
  console.log(validTypes.indexOf(type));
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

router.post('/upload', async function (req, res) {

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

  //console.log(req.body)
  //console.log(req.body.projectid)
  // setup
  const form = formidable({
    multiples: false
    , maxFileSize:50 * 1024 * 1024 // 5MB
    , uploadDir : uploadFolder
  });

  // Parsing
  form.parse(req, async (err, fields, files) => {
    //console.log(fields);
    //console.log(files);
    if (err) {
      console.log("Error parsing the files");
      console.log(err.message);
      return res.status(400).json({
        status: "Fail",
        message: "There was an error parsing the files",
        error: err,
      });
    }
    //console.log(files.myfiles.length)
    //console.log(files.myfiles)
    if(files.myfiles){
      //Single file
      //console.log("Single File")
      console.log(fields);
      //console.log(fields.projectid[0]);
      
      const file = files.myfiles;
      //console.log(file);
      //console.log(file.filepath) // file store temporary and need to delete? permission to save of folder access?
      //console.log(file.originalFilename) 
      //console.log(file.mimetype) 
      const isValid = isFileValid(file)
      //console.log(isValid)
      if (!isValid) {
        // throes error if file isn't valid
        console.log("The file type is not a valid type")
        return res.status(400).json({
          status: "Fail",
          message: "The file type is not a valid type",
        });
      }
      // creates a valid name by removing spaces
      const fileName = encodeURIComponent(file.originalFilename.replace(/\s/g, "-"));

      try {
        const Asset = db.model('Asset');
        //Asset.depopulate('data');
        let bfound=false;
        // check need to override files for re-edit upload model
        //let assets = await Asset.find({filename: fileName})
        let assets = await Asset.find({filename: fileName})
          .select('id projectid filename filetype')
          .exec();
        console.log("assets", assets);
        console.log("FOUND?", assets.length);
        if(assets.length>=1){
          bfound=true;
        }

        // renames the file in the directory
        let newFileName = path.join(uploadFolder, fileName);
        console.log(newFileName)
        fs.renameSync(file.filepath, newFileName);

        console.log(path.extname(fileName))
        if(bfound==false){
          const newAsset = await Asset({
              projectid: fields.projectid
            , filename: fileName
            , filepath : newFileName
            , filetype : path.extname(fileName)
            //, data: data.data
          });
          await newAsset.save();
        }else{
          console.log("same file?");
        }
        //const saveObject = await newAsset.save();
        return res.json({message:'uploaded'})
        //console.log(file.filepath)
        //fs.unlinkSync( file.filepath )
      } catch (error) {
        console.log(error);
        return res.json({error:'try fail upload'})
      }
    }
    return res.json({error:'fail upload'})
  });
  //return res.json({error:'fail upload'})
})

export default router;