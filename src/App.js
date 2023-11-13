import { useState } from 'react';
import axios from 'axios';

function App() {      
  const [tasks, setTasks] = useState([]);

  const BASE_URL = 'https://todo-backend-iota.vercel.app/api/tasks/';
  
  const getAlltasks = async () => {
    try {
      const { data } = await axios.get(BASE_URL);
      console.log('data:', data);
      setTasks(data);
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="App"> 
      <button onClick={getAlltasks}>get all tasks</button>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tasks.length > 0 &&
        tasks.map(({ title, description, priority, completed, _id }) => (
          <li key={_id}>
            <div style={{ border: '1px dashed blue', padding: '10px', width: '500px', backgroundColor: 'yellowgreen' }}>
              <h4>{title}</h4>
              <p>{description}</p>
              <p>priority: {priority}</p>
              <p>completed: {completed ? 'true' : 'false'}</p>
            </div>
          </li>          
        ))}
      </ul>
    </div>
  );
}

export default App;
