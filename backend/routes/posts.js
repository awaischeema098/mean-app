const express = require('express');
const token = require('../middleware/check-token');

const PostController = require('../controllers/posts');
const extractFile = require('../middleware/file');
const router = express.Router();
 
  
  router.post("",token, extractFile, PostController.createPost);
  
  router.put("/:id" ,token, extractFile, PostController.updatePost);
  
  router.get("", PostController.getAllPosts);

  router.get('/:id', PostController.getOnePost);
 
  router.delete('/:id', token, PostController.deletePost);

module.exports  = router;