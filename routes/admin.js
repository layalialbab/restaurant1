const express = require('express');
const jwt = require('jsonwebtoken');
const MenuItem = require('../models/Menu');
const Settings = require('../models/Settings');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

function requireSecurityConfig(res) {
  if (!process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET || !process.env.ADMIN_USERNAME) {
    res.status(503).json({ error: 'Admin credentials are not configured on the server.' });
    return false;
  }
  return true;
}

router.post('/login', (req, res) => {
  if (!requireSecurityConfig(res)) return;
  const { username, password } = req.body || {};
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
    return res.json({ success: true, token, username });
  }
  return res.status(401).json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
});

router.get('/menu', authMiddleware, async (req, res) => {
  try { res.json(await MenuItem.find().sort({ category: 1, name: 1 })); }
  catch (e) { res.status(500).json({ error: 'تعذر جلب المنيو' }); }
});
router.post('/menu/add', authMiddleware, async (req, res) => {
  try {
    const { category, name, price, description, image } = req.body || {};
    if (!String(name || '').trim() || !Number.isFinite(Number(price)) || Number(price) < 0) return res.status(400).json({ error: 'الاسم والسعر الصحيح مطلوبان' });
    const item = await MenuItem.create({ id: `item-${Date.now()}-${Math.random().toString(36).slice(2,8)}`, category: String(category || 'أخرى').trim(), name: String(name).trim(), price: Number(price), description: String(description || ''), image: String(image || ''), updatedAt: new Date() });
    res.status(201).json({ success: true, item });
  } catch (e) { res.status(500).json({ error: 'تعذر إضافة المنتج' }); }
});
router.put('/menu/:id', authMiddleware, async (req, res) => {
  try {
    const allowed = {};
    for (const k of ['category','name','description','image']) if (req.body[k] !== undefined) allowed[k] = String(req.body[k]).trim();
    if (req.body.price !== undefined) {
      if (!Number.isFinite(Number(req.body.price)) || Number(req.body.price) < 0) return res.status(400).json({ error: 'السعر غير صحيح' });
      allowed.price = Number(req.body.price);
    }
    allowed.updatedAt = new Date();
    const item = await MenuItem.findOneAndUpdate({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] }, { $set: allowed }, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ error: 'المنتج غير موجود' });
    res.json({ success: true, item });
  } catch (e) { res.status(500).json({ error: 'تعذر تعديل المنتج' }); }
});
router.delete('/menu/:id', authMiddleware, async (req, res) => {
  try {
    const filter = req.params.id.match(/^[0-9a-fA-F]{24}$/) ? { _id: req.params.id } : { id: req.params.id };
    const item = await MenuItem.findOneAndDelete(filter);
    if (!item) return res.status(404).json({ error: 'المنتج غير موجود' });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'تعذر حذف المنتج' }); }
});
router.put('/settings', authMiddleware, async (req, res) => {
  try {
    const allowedKeys = ['restaurantName','restaurantPhone','restaurantAddress','restaurantCity','deliveryFee','currency','mapQuery','logoUrl','whatsappMessage'];
    const update = {};
    for (const k of allowedKeys) if (req.body[k] !== undefined) update[k] = req.body[k];
    if (update.currency !== undefined && !['TRY','SYP','₺','ل.س'].includes(update.currency)) return res.status(400).json({ error: 'العملة غير مدعومة' });
    if (update.deliveryFee !== undefined && (!Number.isFinite(Number(update.deliveryFee)) || Number(update.deliveryFee) < 0)) return res.status(400).json({ error: 'رسوم التوصيل غير صحيحة' });
    update.updatedAt = new Date();
    const settings = await Settings.findOneAndUpdate({}, { $set: update }, { new: true, upsert: true, setDefaultsOnInsert: true });
    res.json({ success: true, settings });
  } catch (e) { res.status(500).json({ error: 'تعذر حفظ الإعدادات' }); }
});
router.get('/settings', authMiddleware, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (e) { res.status(500).json({ error: 'تعذر جلب الإعدادات' }); }
});
router.get('/orders', authMiddleware, async (req, res) => {
  try { res.json(await Order.find().sort({ createdAt: -1 }).limit(300)); }
  catch (e) { res.status(500).json({ error: 'تعذر جلب الطلبات' }); }
});
router.put('/order/:id/status', authMiddleware, async (req, res) => {
  try {
    const statuses = ['pending','accepted','preparing','ready','delivered','cancelled'];
    if (!statuses.includes(req.body.status)) return res.status(400).json({ error: 'حالة الطلب غير صحيحة' });
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status, updatedAt: new Date() }, { new: true });
    if (!order) return res.status(404).json({ error: 'الطلب غير موجود' });
    res.json({ success: true, order });
  } catch (e) { res.status(500).json({ error: 'تعذر تحديث الطلب' }); }
});
module.exports = router;
