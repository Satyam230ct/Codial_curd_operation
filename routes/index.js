// This File is the entry points of all the routes
const express = require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);

router.use('/users',require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comments'));

module.exports=router;