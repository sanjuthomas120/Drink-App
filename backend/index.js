const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const MenuRoutes = require('./routes/MenuRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', MenuRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => { 
  console.log('Error connecting to MongoDB:', error.message);
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));