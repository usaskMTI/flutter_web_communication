// React Frontend (App.js)
import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const sendData = async () => {
    try {
      const response = await fetch('http://localhost:5001/send-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("Data sent!");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>React App to Communicate with Flutter</p>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button onClick={sendData}>Send Text to Flutter</button>
      </header>
    </div>
  );
}

export default App;
