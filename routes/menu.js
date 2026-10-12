const express = require('express'); const MenuItem = require('../models/Menu'); const router=express.Router();
router.get('/',async(req,res)=>{try{res.json(await MenuItem.find({available:true}).sort({category:1,name:1}));}catch(e){res.status(500).json({error:'تعذر جلب المنيو'});}});
router.get('/category/:category',async(req,res)=>{try{res.json(await MenuItem.find({category:req.params.category,available:true}));}catch(e){res.status(500).json({error:'تعذر جلب الأصناف'});}});module.exports=router;
