import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import SecretQuote from '../components/SecretQuote.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/secretquote',
      name: 'secretquote',
      component: SecretQuote
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})