const express = require('express');
const cors = require('cors');
const events = require('events');
const { time } = require('console');
const eventEmitter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/send-data', (req, res) => {
  console.log(`Request received at ${new Date().toLocaleString()}`);
  
  // Emitting a simple message instead of order details
  eventEmitter.emit('newData', { message: 'Order received' });
  res.json({ message: 'Order received notification sent!' });
});

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
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
