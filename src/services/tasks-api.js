import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

  const instance = axios.create({
    baseURL: 'https://todo-backend-iota.vercel.app/api/',
  });
  
  const getAlltasks = async () => {
    try {
      const { data } = await instance.get('/tasks');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getTaskByID = async (id) => {
    try {
      const { data } = await instance.get(`/tasks/${id}`); 
      return data;
    } catch(error) {
        throw new Error(error.message);
    }
  };

  const addTask = async (body) => {
    try {
      const { data } = await instance.post('/tasks/', body);
      Notify.success('Your task was created.'); 
      return data;
    } catch(error) {
        console.error('error.message:', error.message);
    }
  };

  const editTask = async (id, body) => {
    try {
      const { data } = await instance.put(`/tasks/${id}`, body);
      Notify.success('The task was edited.'); 
      return data;
    } catch(error) {
        console.error('error.message:', error.message);
    }
  };

  const editTaskStatus = async (id, completed) => {
    try {
      const { data } = await instance.put(`/tasks/${id}`, completed);
      return data;
    } catch(error) {
        console.error('error.message:', error.message);
    }
  };

  const deleteTask = async (id, title) => {
    try {
      const { data } = await instance.delete(`/tasks/${id}`);
      Notify.success(`Your task "${title}" was deleted.`); 
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