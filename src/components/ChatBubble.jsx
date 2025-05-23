import React from 'react';

export default function ChatBubble({ message, type }) {
  const isUser = type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2 animate-fade-in`}>
      <div className={`px-4 py-2 rounded-lg max-w-xs ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}>
        {message}
      </div>
    </div>
  );
}
