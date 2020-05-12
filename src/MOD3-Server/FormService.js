import axios from 'axios';

const mod3Server = axios.create({
  baseURL: 'https://mod3-server.herokuapp.com',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  //Book: POST & GET
  getBooks: () => mod3Server.get('/books/'),
  postBook: (book) => mod3Server.post('/books/add', book),

  //Contact: POST & GET
  getContacts: () => mod3Server.get('/contacts/'),
  postContact: (contact) => mod3Server.post('/contact/add', contact)
};
