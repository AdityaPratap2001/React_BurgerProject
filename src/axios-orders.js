import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-da27a.firebaseio.com/'
})

export default instance;