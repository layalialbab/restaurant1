const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const ROOT = __dirname;

app.disable('x-powered-by');
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

// The project is a static site: index.html/admin.html live in the project root.
app.use(express.static(ROOT, { index: 'index.html' }));

// API routes are available when MongoDB is configured; the static site itself
// remains usable without a database because its menu/settings are browser-local.
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/settings', require('./routes/settings'));

app.get('/health', (req, res) => res.json({ ok: true, service: 'layali-albab-restaurant' }));
app.get('/admin', (req, res) => res.sendFile(path.join(ROOT, 'admin.html')));
app.get('/', (req, res) => res.sendFile(path.join(ROOT, 'index.html')));

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = Number(process.env.PORT) || 5000;
const server = app.listen(PORT, () => {
  console.log(`Restaurant website running at http://localhost:${PORT}`);
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not configured. Static site works; database-backed API may not.');
    return;
  }
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed:', err.message));
});

process.on('SIGINT', async () => {
  await mongoose.disconnect().catch(() => {});
  server.close(() => process.exit(0));
});
