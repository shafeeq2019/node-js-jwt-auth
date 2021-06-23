import Vue from 'vue'
import App from './components/App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import auth from './auth'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// // Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// // Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

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

