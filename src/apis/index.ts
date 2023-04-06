import http from './http';

const jsonApi = {
  getAll: () => http.get('https://jsonplaceholder.typicode.com/photos'),
  getCommentList: () => http.get('https://jsonplaceholder.typicode.com/commentss'),
};

export default jsonApi;
