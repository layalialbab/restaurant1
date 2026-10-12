const express=require('express'); const Settings=require('../models/Settings'); const router=express.Router();
router.get('/',async(req,res)=>{try{let s=await Settings.findOne();if(!s)s=await Settings.create({});res.json(s);}catch(e){res.status(500).json({error:'تعذر جلب إعدادات المطعم'});}});module.exports=router;
