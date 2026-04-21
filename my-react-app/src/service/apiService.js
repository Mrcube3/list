import axios from 'axios';

const API_URL = 'http://localhost:8080';
const auth = {
  username: 'user',
  password: 'password'
};

export const getMessages = async () => {
  const response = await axios.get(`${API_URL}/hello`, { auth });
  return response.data;
};

export const saveMessage = async (content) => {
  const response = await axios.post(`${API_URL}/hello`, { content }, { auth });
  return response.data;
};

export const deleteMessage = async (id) => {
  await axios.delete(`${API_URL}/hello/${id}`, { auth });
};