/*
the factor I tried to implement in this project are :- 
1. Dependencies
2. Config (.env)
3. Backing service (nodemailer)
4. Port Binding
5. Logs
*/

import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  
  const sendEmail = async () => {
    console.log(email);
    if (!email || !email.includes('@')) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");
    
    try {
      const res = await fetch("https://email-sender-app-6f1h.onrender.com/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setMessage("Email sent successfully!");
        setMessageType("success");
        setEmail("");
      } else {
        setMessage(data.message || "Failed to send email");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Error while sending email:", err);
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendEmail();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <div className="header">
            <h1>Email Sender</h1>
          </div>
          
          <div className="form-group">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter recipient's email address"
              disabled={isLoading}
              className="email-input"
            />
          </div>
          
          <button 
            onClick={sendEmail} 
            disabled={isLoading || !email}
            className="send-button"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              <>
                <span>🚀</span>
                Send Email
              </>
            )}
          </button>
          
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
