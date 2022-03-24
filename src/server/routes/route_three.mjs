/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
const router = express.Router();

import route_project from '../three/route_project.mjs';
import route_scene from '../three/route_scene.mjs';
import route_entity from '../three/route_entity.mjs';
import route_assets from '../three/route_assets.mjs';

//router.get('/', (req, res) => {
  //res.json({ error: 'Not found' });
  //res.json({ message: 'three index' });
//})

router.use(route_project);
router.use(route_scene);
router.use(route_entity);
router.use(route_assets);

export default router;