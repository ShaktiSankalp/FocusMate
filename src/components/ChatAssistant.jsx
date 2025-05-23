import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';

// Sample assistant replies (can replace with API later)
const assistantReplies = [
  "That's interesting! Tell me more.",
  "Got it! How can I assist further?",
  "Okay, let's do this!",
  "I'm here to help whenever you need.",
  "Can you please elaborate?",
];

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I assist you today?", type: 'assistant' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle user submitting message
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input.trim(), type: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

//     // Mock assistant reply with delay
//     // setTimeout(() => {
//     //   const randomReply = assistantReplies[Math.floor(Math.random() * assistantReplies.length)];
//     //   const assistantMessage = {
//     //     id: Date.now() + 1,
//     //     text: randomReply,
//     //     type: 'assistant',
//     //   };
//     //   setMessages(prev => [...prev, assistantMessage]);
//     // }, 1000);


    // Mock assistant reply from free API
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
    .then(data => {
      // Pick a random comment's body as reply
      const randomReply = data[Math.floor(Math.random() * data.length)].body;

      const truncatedReply = randomReply.length > 50
        ? randomReply.slice(0, 50) + "..."
        : randomReply;

      const assistantMessage = {
        id: Date.now() + 1,
        text: truncatedReply,
        type: 'assistant',
      };
      setMessages(prev => [...prev, assistantMessage]);
    })
    .catch(() => {
      // fallback reply on error
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Sorry, I couldn't fetch a reply right now.",
          type: 'assistant',
        },
      ]);
    });


  };




  // Send message on Enter key
  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
  <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-md max-w-xl mx-auto">
    {/* Chat messages */}
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {messages.map(msg => (
        <ChatBubble key={msg.id} message={msg.text} type={msg.type} />
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* Input box + send button */}
    <div className="p-4 border-t border-gray-200 flex items-center gap-3 bg-white rounded-b-lg">
      <textarea
        rows={1}
        className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Type a message..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg
                   transition"
        disabled={!input.trim()}
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  </div>
);

}
