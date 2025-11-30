import axios from 'axios';

// Pastikan port-nya 5000 (sesuai backend) dan ada '/api' di belakangnya
const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

export default api;