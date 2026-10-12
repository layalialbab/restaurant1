const express = require('express');
const Order = require('../models/Order');
const Settings = require('../models/Settings');
const router = express.Router();

// Create new order
router.post('/create', async (req, res) => {
  try {
    const { customerName, customerPhone, customerAddress, items, paymentMethod, notes } = req.body;

    const settings = await Settings.findOne();
    const deliveryFee = settings?.deliveryFee || 30;

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryFee;

    const orderNumber = `ORD-${Date.now()}`;

    const order = new Order({
      orderNumber,
      customerName,
      customerPhone,
      customerAddress,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      notes
    });

    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders (admin)
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
