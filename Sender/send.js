const axios = require('axios');

const orderData = {
  name: "Pizza",
  details: "Chicken",
  phoneNo: "1234567890",
  price: 50,
  expiration : 2024-04-30
};

axios.post('http://localhost:3000/order', orderData)
  .then(response => {
    console.log('Order created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating order:', error.response.data);
  });
