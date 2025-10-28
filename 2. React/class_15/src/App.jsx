import React, { useState, useCallback, useMemo } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import withLoadingSpinner from './hoc/WithLoadingSpinner';

const TaskStatsWithLoading = withLoadingSpinner(TaskStats);

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // useCallback para memoizar la función de agregar tarea
  const addTask = useCallback((taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  // useCallback para memoizar la función de toggle de tarea
  const toggleTask = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // useCallback para memoizar la función de eliminar tarea
  const deleteTask = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  // useMemo para memoizar las tareas filtradas
  const filteredTasks = useMemo(() => {
    console.log('Filtrando tareas...');
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'active':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // useMemo para memoizar estadísticas costosas
  const taskStats = useMemo(() => {
    console.log('Calculando estadísticas...');
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    
    return {
      total,
      completed,
      active,
      completionRate: Math.round(completionRate)
    };
  }, [tasks]);

  // Simular carga pesada
  const simulateHeavyOperation = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1>📝 Lista de Tareas Avanzada</h1>
          <p>Demostrando React.memo, useMemo, useCallback y HOC</p>
        </header>

        <div className="app-content">
          <div className="left-panel">
            <TaskForm onAddTask={addTask} />
            
            <div className="filter-section">
              <h3>Filtrar tareas:</h3>
              <div className="filter-buttons">
                <button 
                  className={filter === 'all' ? 'active' : ''}
                  onClick={() => setFilter('all')}
                >
                  Todas ({tasks.length})
                </button>
                <button 
                  className={filter === 'active' ? 'active' : ''}
                  onClick={() => setFilter('active')}
                >
                  Activas ({taskStats.active})
                </button>
                <button 
                  className={filter === 'completed' ? 'active' : ''}
                  onClick={() => setFilter('completed')}
                >
                  Completadas ({taskStats.completed})
                </button>
              </div>
            </div>

            <button 
              className="heavy-operation-btn"
              onClick={simulateHeavyOperation}
            >
              Simular Operación Pesada
            </button>
          </div>

          <div className="right-panel">
            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
            
            <TaskStatsWithLoading
              stats={taskStats}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="concept-explanation">
          <h3>⚡ Conceptos Implementados:</h3>
          <div className="concepts-grid">
            <div className="concept-card">
              <h4>React.memo</h4>
              <p>TaskItem se memoiza para evitar re-renders innecesarios</p>
            </div>
            <div className="concept-card">
              <h4>useMemo</h4>
              <p>Estadísticas y tareas filtradas se memoizan</p>
            </div>
            <div className="concept-card">
              <h4>useCallback</h4>
              <p>Funciones de callback se memoizan</p>
            </div>
            <div className="concept-card">
              <h4>HOC</h4>
              <p>withLoadingSpinner agrega funcionalidad de loading</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;