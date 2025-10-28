import React, { useState, useCallback } from 'react';
import './TaskForm.css';

const TaskForm = React.memo(({ onAddTask }) => {
  console.log('TaskForm renderizado');
  
  const [taskText, setTaskText] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  }, [taskText, onAddTask]);

  const handleInputChange = useCallback((e) => {
    setTaskText(e.target.value);
  }, []);

  return (
    <div className="task-form">
      <h2>Agregar Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={taskText}
            onChange={handleInputChange}
            placeholder="Escribe una nueva tarea..."
            className="task-input"
            maxLength={100}
          />
          <button 
            type="submit" 
            className="add-btn"
            disabled={!taskText.trim()}
          >
            ➕ Agregar
          </button>
        </div>
        <div className="char-count">
          {taskText.length}/100 caracteres
        </div>
      </form>
    </div>
  );
});

TaskForm.displayName = 'TaskForm';

export default TaskForm;