const express = require('express');
const Order = require('../models/Order');
const MenuItem = require('../models/Menu');
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');
const router = express.Router();
router.post('/create', async (req,res)=>{
 try {
  const {customerName,customerPhone,customerAddress,items,paymentMethod,notes}=req.body||{};
  if(!customerName?.trim()||!customerPhone?.trim()||!customerAddress?.trim()||!Array.isArray(items)||!items.length||items.length>50) return res.status(400).json({error:'يرجى إدخال بيانات الطلب كاملة'});
  const ids=items.map(i=>String(i.id||''));
  const dbItems=await MenuItem.find({id:{$in:ids},available:true});
  const byId=new Map(dbItems.map(i=>[i.id,i]));
  const normalized=[];
  for(const item of items){const found=byId.get(String(item.id||''));const qty=Number(item.quantity);if(!found||!Number.isInteger(qty)||qty<1||qty>99)return res.status(400).json({error:'أحد المنتجات غير متوفر أو الكمية غير صحيحة'});normalized.push({id:found.id,name:found.name,price:found.price,quantity:qty});}
  const settings=await Settings.findOne(); const deliveryFee=Number(settings?.deliveryFee||0); const subtotal=normalized.reduce((s,i)=>s+i.price*i.quantity,0);
  const order=await Order.create({orderNumber:`ORD-${Date.now()}`,customerName:String(customerName).trim(),customerPhone:String(customerPhone).trim(),customerAddress:String(customerAddress).trim(),items:normalized,subtotal,deliveryFee,total:subtotal+deliveryFee,paymentMethod:['cash','sham-cash'].includes(paymentMethod)?paymentMethod:'cash',notes:String(notes||'').slice(0,1000)});
  res.status(201).json({success:true,order:{_id:order._id,orderNumber:order.orderNumber,total:order.total,status:order.status}});
 } catch(e){res.status(500).json({error:'تعذر إنشاء الطلب'});}
});
router.get('/all',auth,async(req,res)=>{try{res.json(await Order.find().sort({createdAt:-1}).limit(300));}catch(e){res.status(500).json({error:'تعذر جلب الطلبات'});}});
router.get('/:id',auth,async(req,res)=>{try{const order=await Order.findById(req.params.id);if(!order)return res.status(404).json({error:'الطلب غير موجود'});res.json(order);}catch(e){res.status(400).json({error:'رقم الطلب غير صحيح'});}});
module.exports=router;
