import { useState, useEffect } from 'react';
import { api } from './services/tasks-api';
import { Dashboard } from './components/Dashboard/Dashboard';


function App() {     
  const [tasks, setTasks] = useState([]); 
  
  const getTasks = async () => {     
    try {
        const data = await api.getAlltasks();  
        setTasks(data); 
    } catch(error) {
        console.error(error.message); 
    }
  };
    
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div> 
      <Dashboard tasks={tasks} />
    </div>
  );
}

export default App;
