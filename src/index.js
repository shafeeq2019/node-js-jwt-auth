import Vue from 'vue'
import App from './components/App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import auth from './auth'
import router from './router'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

// Check the user's auth status when the app starts
auth.checkAuth()


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});

