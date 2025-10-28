import React, { useMemo } from 'react';
import './TaskStats.css';

const TaskStats = React.memo(({ stats }) => {
  console.log('TaskStats renderizado');

  // useMemo para cálculos derivados de las estadísticas
  const progressColor = useMemo(() => {
    if (stats.completionRate >= 75) return '#28a745';
    if (stats.completionRate >= 50) return '#ffc107';
    return '#dc3545';
  }, [stats.completionRate]);

  const motivationMessage = useMemo(() => {
    if (stats.total === 0) return '¡Comienza agregando tu primera tarea!';
    if (stats.completionRate === 100) return '¡Excelente! Has completado todas las tareas 🎉';
    if (stats.completionRate >= 75) return '¡Vas muy bien! Sigue así 💪';
    if (stats.completionRate >= 50) return '¡Buen progreso! Continúa avanzando ✨';
    return '¡Tú puedes! Cada paso cuenta 🚀';
  }, [stats.completionRate, stats.total]);

  return (
    <div className="task-stats">
      <h2>📊 Estadísticas</h2>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total</h3>
          <div className="stat-value">{stats.total}</div>
        </div>
        
        <div className="stat-card active">
          <h3>Activas</h3>
          <div className="stat-value">{stats.active}</div>
        </div>
        
        <div className="stat-card completed">
          <h3>Completadas</h3>
          <div className="stat-value">{stats.completed}</div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span>Progreso General</span>
          <span>{stats.completionRate}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{
              width: `${stats.completionRate}%`,
              backgroundColor: progressColor
            }}
          ></div>
        </div>
      </div>

      <div className="motivation-message">
        {motivationMessage}
      </div>
    </div>
  );
});

TaskStats.displayName = 'TaskStats';

export default TaskStats;