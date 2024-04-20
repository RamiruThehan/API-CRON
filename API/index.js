const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('Your Connect String', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const orderSchema = new mongoose.Schema({
  name: String,
  details: String,
  phoneNo: String,
  price: Number,
  expiration: Date,
});
const Order = mongoose.model('Order', orderSchema);

app.use(bodyParser.json());

app.post('/order', async (req, res) => {
  try {
    const { name, details, phoneNo, price } = req.body;
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 2);

    const newOrder = new Order({
      name,
      details,
      phoneNo,
      price,
      expiration,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();
    await Order.deleteMany({ expiration: { $lt: now } });
    console.log('Expired orders deleted successfully.');
  } catch (error) {
    console.error('Error deleting expired orders:', error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
