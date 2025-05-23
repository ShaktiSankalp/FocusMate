import React from 'react';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between p-2 bg-white rounded shadow mb-2 animate-fade-in">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </span>
      </div>
      <button
        className="text-red-500 text-sm"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
}
