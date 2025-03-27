const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const MenuRoutes = require('./routes/MenuRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', MenuRoutes);

const frontendPath = path.join(__dirname, '..', 'frontend', 'build');
const imagesPath = path.join(__dirname, '..', 'frontend', 'public', 'images');


if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  console.error('⚠️ Frontend build not found!');
}


app.use('/images', express.static(imagesPath));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Error connecting to MongoDB:', error.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
