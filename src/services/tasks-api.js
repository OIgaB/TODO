import axios from 'axios';

  const instance = axios.create({
    baseURL: 'https://todo-backend-iota.vercel.app/api/',
  });
  
  const getAlltasks = async () => {
    try {
      const { data } = await instance.get('/tasks');
    //   console.log('data:', data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getTaskByID = async (id) => {
    try {
      const { data } = await instance.get(`/tasks/${id}`); 
      console.log('data:', data);
      return data;
    } catch(error) {
        throw new Error(error.message);
    }
  };

  const addTask = async (body) => {
    try {
      const { data } = await instance.post('/tasks/', body);
      console.log('data:', data);
      return data;
    } catch(error) {
        console.error('error.message:', error.message);
    }
  };

  const editTask = async (id, body) => {
    try {
      const { data } = await instance.put(`/tasks/${id}`, body);
      console.log('data:', data);
      return data;
    } catch(error) {
        console.error('error.message:', error.message);
    }
  };

  const editTaskStatus = async (id, body) => {
    try {
      const { data } = await instance.put(`/tasks/${id}`, body);
      console.log('data:', data);
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

  export const api = {
    getAlltasks,
    getTaskByID,
    addTask,
    editTask,
    editTaskStatus,
    deleteTask
  };