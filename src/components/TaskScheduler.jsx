import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import TaskItem from './TaskItem';

export default function TaskScheduler() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title.trim());
    setTitle('');
  };

  return (
    <div
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
      style={{
        minHeight: '300px',      // minimum height
        maxHeight: '700px',      // max height
        height: '100%',          // fill parent container height
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Form at top, fixed height */}
      <form
        onSubmit={handleSubmit}
        className="mb-4 flex space-x-2"
        style={{ flexShrink: 0 }}
      >
        <input
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New task..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
        >
          Add
        </button>
      </form>

      {/* Scrollable task list */}
      <div
        className="overflow-y-auto pr-2 space-y-2"
        style={{ flexGrow: 1, overflowY: 'auto' }}
      >
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
