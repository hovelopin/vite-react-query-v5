import http from './http';

const photo = {
  getAll: () => http.get('https://jsonplaceholder.typicode.com/photos'),
  getCommentList: () => http.get('https://jsonplaceholder.typicode.com/comments'),
};

export default photo;
