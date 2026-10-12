const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerAddress: { type: String, required: true },
  items: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  subtotal: Number,
  deliveryFee: Number,
  total: Number,
  paymentMethod: { type: String, enum: ['cash', 'sham-cash'], default: 'cash' },
  status: { type: String, enum: ['pending', 'accepted', 'preparing', 'ready', 'delivered', 'cancelled'], default: 'pending' },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
