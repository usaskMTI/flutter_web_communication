const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(express.json());
var lastMsg = 'No message yet';
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());
const date = new Date();

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  // You can also send messages to the client from here
  // ws.send('something from the server');
});

app.post('/send-data', (req, res) => {
  // Assuming you receive order data from WooCommerce webhook here
  const orderData = req.body;
  console.log(orderData);
  //console data and time stamp
  
  console.log(date);
  
  lastMsg = orderData;
  // Broadcast to all connected WebSocket clients
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(orderData));
    }
  });

  res.status(200).send('Data received');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/last-msg', (req, res) => {
  res.send(lastMsg);
});


const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
