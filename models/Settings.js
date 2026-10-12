const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  restaurantName: { type: String, default: 'ليالي الباب' },
  restaurantPhone: { type: String, default: '963991094644' },
  restaurantAddress: { type: String, default: 'مقابل الجامع الكبير عند تقاطع شارع عصفور' },
  restaurantCity: { type: String, default: 'مدينة الباب' },
  workingHoursStart: { type: String, default: '10:00' },
  workingHoursEnd: { type: String, default: '00:00' },
  deliveryFee: { type: Number, default: 30 },
  currency: { type: String, default: 'ر.س' },
  mapQuery: String,
  logoUrl: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settings', settingsSchema);
