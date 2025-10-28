import React from 'react';
import './TaskItem.css';

const TaskItem = React.memo(({ task, onToggle, onDelete }) => {
  console.log(`TaskItem renderizado: ${task.text}`);

  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="task-checkbox"
        />
        <div className="task-details">
          <span className="task-text">{task.text}</span>
          <span className="task-date">
            Creada: {formatDate(task.createdAt)}
          </span>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="delete-btn"
        title="Eliminar tarea"
      >
        🗑️
      </button>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;