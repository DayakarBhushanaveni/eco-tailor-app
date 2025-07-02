const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/user');
const materialRoutes = require('./routes/material');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/ecotailor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/materials', materialRoutes);

app.get('/', (req, res) => res.send('EcoTailor API running!'));

module.exports = app;