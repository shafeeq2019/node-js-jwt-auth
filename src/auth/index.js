import router from '../router'
import axios from 'axios';
const API_URL = 'http://localhost:8081/api/v1/'
const LOGIN_URL = API_URL + 'auth/signin/'
const SIGNUP_URL = API_URL + 'auth/signup/'
import api from '../api.js'
export default {

  user: {
    authenticated: false
  },

  login(context, creds, redirect) {
    api.sendRequest('post',"auth/signin", creds).then((data) => {
      localStorage.setItem('id_token', data.accessToken)
      localStorage.setItem('userID', data.id);
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
        console.log(data);
        this.login(context, creds, redirect);
      }
    }).catch((err) => {
      console.log(err)
      context.error = err.message
    })
  },

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('userID');
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },


  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
