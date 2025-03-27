const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const MenuRoutes = require('./routes/MenuRoutes');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.use('/api', MenuRoutes);

const imagesPath = path.join(__dirname, '..', 'frontend', 'public', 'images');
app.use('/images', express.static(imagesPath));

const frontendPath = path.join(__dirname, '..', 'frontend', 'build');
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) { 
      res.sendFile(path.join(frontendPath, 'index.html'));
    }
  });
} else {
  console.error('Frontend build not found!');
}


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Error connecting to MongoDB:', error.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
