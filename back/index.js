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
  console.log('Received body:', req.body); // Log the entire body to see what's inside
  console.log('Received headers:', req.headers); // Also, log headers to check content-type

  // If there is data, process it, otherwise send an error response
  if (req.body) {
    // Process your data here
    eventEmitter.emit('newData', req.body); // Emit the event with the data
    res.json({ message: 'Order data received!' });
  } else {
    res.status(400).send('No data received');
  }
});


app.get('/get-latest-message', (req, res) => {
  res.json({ message: lastMessage });
});

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = () => {
    res.write(`data: ${JSON.stringify({ message: lastMessage })}\n\n`);
  };

  eventEmitter.on('newData', sendEvent);

  req.on('close', () => {
    eventEmitter.removeListener('newData', sendEvent);
    res.end();
  });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test successful' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
