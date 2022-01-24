import axios from 'axios';
let token = '';
let expiry = '';

if (localStorage.token) {
  token = JSON.parse(localStorage.token).token;
  expiry = JSON.parse(localStorage.token).expiry

}


export const authaxios = axios.create({
  // baseURL: 'http://localhost:4000/api/v1',
  baseURL: 'https://rocky-eyrie-75260.herokuapp.com/api/v1',

  headers: {
    authorization: `Bearer ${token ? `${token} ${expiry}` : ''} `,
    headers: {
      "Access-Control-Allow-Origin": '*',
    }
  }
});
export const instance = axios.create({
  // baseURL: 'http://localhost:4000/api/v1',
  baseURL: 'https://rocky-eyrie-75260.herokuapp.com/api/v1/',
  headers: {
    "Access-Control-Allow-Origin": '*',
  }

});

