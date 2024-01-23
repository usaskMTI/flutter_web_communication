// Express Backend (index.js)
const express = require('express');
const cors = require('cors');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

let lastMessage = "No message received yet";

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});
app.post('/send-data', (req, res) => {
  const { text } = req.body;
  console.log('Received text:', text);
  lastMessage = text;
  eventEmitter.emit('newData'); // Emit an event for new data
  res.json({ message: 'Received the text!' });
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
  res.write(`data: ${JSON.stringify({ message: lastMessage })}\n\n`);
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test successful' });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
