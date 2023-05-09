const express=require('express');
const router=express.Router();
const listController=require('../controllers/list');
router.get('/:name',listController.getList);
router.post('/addTask',listController.addTask);
router.post('/delete',listController.deleteTask);


module.exports =router;