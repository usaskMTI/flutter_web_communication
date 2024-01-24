// Express Backend (index.js)
const express = require('express');
const cors = require('cors');
const events = require('events');
const { get } = require('http');
const eventEmitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

let lastMessage = "No message received yet";

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/send-data', (req, res) => {
  // Assuming the entire order data is sent in the request body
  const orderData = req.body;

  // Processing and storing only the necessary parts of the order
  const processedData = {
    id: orderData.id,
    status: orderData.status,
    date_created: orderData.date_created,
    total: orderData.total,
    customer_details: {
      email: orderData.billing.email,
      phone: orderData.billing.phone
    },
    items: orderData.line_items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }))
  };

  lastMessage = JSON.stringify(processedData); // Store the processed order data
  eventEmitter.emit('newData'); // Emit an event for new data

  res.json({ message: 'Order data received!' });
});


app.get('/test', (req, res) => {
  res.json({ message: 'Test successful' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
