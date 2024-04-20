const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
//mongoose.connect('mongodb://<username>:<password>@<mongodb-url>/<database-name>', {
mongoose.connect('mongodb+srv://darkKnight:batMan@cluster0.avnpztg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//mongoose.connect('mongodb+srv://darkKnight:batMan@cluster0.avnpztg.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Order schema
const orderSchema = new mongoose.Schema({
  name: String,
  details: String,
  phoneNo: String,
  price: Number,
  expiration: Date,
});
const Order = mongoose.model('Order', orderSchema);

app.use(bodyParser.json());

// POST endpoint to create new orders
app.post('/order', async (req, res) => {
  try {
    const { name, details, phoneNo, price } = req.body;

    // Calculate expiration date as current date + 2 days
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

// CRON job to delete expired orders every hour
cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();
    await Order.deleteMany({ expiration: { $lt: now } });
    console.log('Expired orders deleted successfully.');
  } catch (error) {
    console.error('Error deleting expired orders:', error.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
