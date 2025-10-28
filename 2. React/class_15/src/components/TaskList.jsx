import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = React.memo(({ tasks, onToggleTask, onDeleteTask }) => {
  console.log('TaskList renderizado');

  if (tasks.length === 0) {
    return (
      <div className="task-list empty">
        <p>No hay tareas para mostrar</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Tareas ({tasks.length})</h2>
      <div className="tasks-container">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
});

TaskList.displayName = 'TaskList';

export default TaskList;