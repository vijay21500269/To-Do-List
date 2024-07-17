import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setNewTask(tasks[index].text);
  };

  const updateTask = () => {
    if (currentTaskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex].text = newTask;
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(-1);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list">
        <h2>TO DO LIST</h2>
        <div className="todo-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={isEditing ? updateTask : addTask}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span
                className={task.completed ? 'completed' : ''}
                onClick={() => toggleCompletion(index)}
              >
                {task.text}
              </span>
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => removeTask(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
