import { useState, useEffect } from 'react';

export default function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, notes = '') => {
    const newTask = { id: Date.now(), title, notes, completed: false };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
}
