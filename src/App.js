import logo from './logo.svg';
import './normal.css'
import './App.css';
import { sendMessagetoGPT } from './openai';
import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents the default behavior of the Enter key (e.g., adding a newline)
      
      if (input.trim() === "") return; // Prevents sending empty messages

      console.log("Input:", input); // Debugging: Check the current input

      try {
        const res = await sendMessagetoGPT(input); // Assuming this is an async function
        console.log("AI Response:", res); // Debugging: Check the AI response

        setMessages([...messages, { user: input, ai: res }]);
      } catch (error) {
        console.error("Error sending message to GPT:", error); // Debugging: Catch and log any errors
      }
      
      setInput(""); // Clears the input field after sending the message
    }
  }
  return (
    <div className="App">
      <section className="chatbox">        
        {messages.map((msg, index) => (
          <div key={index}>
            <div className="chat-message">
              {msg.user}
            </div>
            <div className="ai-message" align="left">
              {msg.ai}
            </div>
          </div>
        ))}
      <div className='chat-input-holder'>
      <img src={logo} width={250} height={250} alt="Logo"></img>
        <textarea 
        className='chat-input-class-area'
        placeholder="cercalo! - look it up!"
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyDown={handleKeyDown} >
        </textarea>

      </div>
      

      </section>
    
    </div>
  );
}

export default App;
