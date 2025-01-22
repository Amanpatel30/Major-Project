import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  getItems: () => axios.get(`${API_URL}/items`),
  createItem: (data: any) => axios.post(`${API_URL}/items`, data),
  // Add other API methods as needed
}; 