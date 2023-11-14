import { useState } from 'react';
import axios from 'axios';

function App() {      
  const [tasks, setTasks] = useState([]);

  const instance = axios.create({
    baseURL: 'https://todo-backend-iota.vercel.app/api/',
  });
  
  const getAlltasks = async () => {
    try {
      const { data } = await instance.get('/tasks');
      console.log('data:', data);
      setTasks(data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getTaskByID = async (id) => {
    try {
      const { data } = await instance.get(`/tasks/${id}`); 
      console.log('data:', data);
      setTasks([data]);
      return data;
    } catch(error) {
        throw new Error(error.message);
    }
  };

  const addTask = async (body) => {
    try {
      const { data } = await instance.post('/tasks/', body);
      console.log('data:', data);
      setTasks([data]);
      return data;
    } catch(error) {
        console.error('error.message:', error.message);
    }
  };

  const editTask = async (id, body) => {
    try {
      const { data } = await instance.put(`/tasks/${id}`, body);
      console.log('data:', data);
      setTasks([data]);
      return data;
    } catch(error) {
        console.error('error.message:', error.message);
    }
  };

  const editTaskStatus = async (id, body) => {
    try {
      const { data } = await instance.put(`/tasks/${id}`, body);
      console.log('data:', data);
      setTasks([data]);
      return data;
    } catch(error) {
        console.error('error.message:', error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await instance.delete(`/tasks/${id}`);
      console.log('data:', data);
      return data;
    } catch(error) {
        console.error('error.message:', error.message);
    }
  };

  const api = {
    getAlltasks,
    getTaskByID,
    addTask,
    editTask,
    editTaskStatus,
    deleteTask
  };

  return (
    <div className="App"> 
      <button onClick={getAlltasks}>get all tasks</button>
      <button onClick={() => getTaskByID('65521e16f3f3ab96a18b3397')}>get task by id</button>
      <button onClick={() => addTask({ title: 'Plant onions', description: 'red one', priority: 4, completed: false})}>add task</button>
      <button onClick={() => deleteTask('6553688cdf48824382162a62')}>delete task by id</button>
      <button onClick={() => editTask('65521e16f3f3ab96a18b3397', { priority: 2 })}>edit task by id</button>
      <button onClick={() => editTaskStatus('65521e16f3f3ab96a18b3397', { completed: true })}>edit task status by id</button>
      
      
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
