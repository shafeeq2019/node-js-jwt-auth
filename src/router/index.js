import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import UserPosts from '../components/UserPosts.vue';
import Developing from '../components/Developing.vue';
import Profile from '../components/Profile.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/myPosts',
      name: 'myPosts',
      component: UserPosts
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path:'/developing',
      name:'developing',
      component: Developing
    },
    {
      path:'/profile',
      name:'profile',
      component: Profile
    }
  ]
})