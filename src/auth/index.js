import router from '../router'
import axios from 'axios';
const API_URL = 'http://localhost:8081/api/v1/'
const LOGIN_URL = API_URL + 'auth/signin/'
const SIGNUP_URL = API_URL + 'auth/signup/'
import api from '../api.js'
export default {

  user: {
    authenticated: false,
    userId: null
  },

  login(context, creds, redirect) {
    api.sendRequest('post',"auth/signin", creds).then((data) => {
      localStorage.setItem('id_token', data.accessToken)
      localStorage.setItem('userId', data.id);
      this.user.userId = data.id;
      this.user.authenticated = true
      if(redirect) {
        router.push(redirect)        
      }
    }).catch((err) => {
      console.log(err);
      context.error = err.message
    })
  },

  signup(context, creds, redirect) {
    api.sendRequest('post',"auth/signup", creds).then(data => {
      if (data) {
        this.login(context, creds, redirect);
      }
    }).catch((err) => {
      console.log(err)
      context.error = err.message
    })
  },

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('userId');
    this.user.authenticated = false
    this.user.userId = null; 
  },

  checkAuth() {
    let jwt = localStorage.getItem('id_token');
    let userId = localStorage.getItem('userId'); 
    if(jwt && userId) {
      this.user.authenticated = true;
      this.user.userId = userId; 
    }
    else {
      this.logout();
      this.user.authenticated = false ;
      this.user.userId = null; 
    }
  },


  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
