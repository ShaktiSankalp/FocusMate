import React from 'react';

export default function Tabs({ selected, onChange }) {
  return (
    <div className="flex border-b border-gray-300">
      <button
        className={`flex-1 py-2 text-center font-medium ${
          selected === 'chat' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
        }`}
        onClick={() => onChange('chat')}
        aria-selected={selected === 'chat'}
        role="tab"
        type="button"
      >
        Chat
      </button>
      <button
        className={`flex-1 py-2 text-center font-medium ${
          selected === 'tasks' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
        }`}
        onClick={() => onChange('tasks')}
        aria-selected={selected === 'tasks'}
        role="tab"
        type="button"
      >
        Tasks
      </button>
    </div>
  );
}
