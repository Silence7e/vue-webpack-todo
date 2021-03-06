import axios from 'axios';
import { createError } from './util';

const request = axios.create({
  baseURL: '/',
});

const handleRequest = req => new Promise((resolve, reject) => {
  req.then((resp) => {
    const { data } = resp;
    if (!data) {
      return reject(createError(400, 'no data'));
    }
    if (!data.success) {
      return reject(createError(400, data.message));
    }
    return resolve(data.data);
  }).catch((err) => {
    const resp = err.response;
    console.log('-------------', resp);
    if (resp.status === 401) {
      reject(createError(401, 'need auth'));
    }
    reject(err);
  });
});

export default {
  getAllTodos() {
    return handleRequest(request.get('/api/todos'));
  },
  login(username, password) {
    return handleRequest(request.post('/user/login', {
      username,
      password,
    }));
  },
  updateTodo(id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo));
  },
  createTodo(todo) {
    return handleRequest(request.post('/api/todo/', todo));
  },
  deleteTodo(id) {
    return handleRequest(request.delete(`/api/todo/${id}`));
  },
  deleteAllCompleted(ids) {
    return handleRequest(request.post('/api/delete/completed', { ids }));
  },
};
