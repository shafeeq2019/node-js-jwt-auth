<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item k to="home">Home</b-nav-item>
          <b-nav-item v-if="!user.authenticated" to="login">Login </b-nav-item>
          <b-nav-item to="signup" v-if="!user.authenticated"
            >Sing up</b-nav-item
          >
          <b-nav-item to="myPosts" v-if="user.authenticated"
            >My Posts</b-nav-item
          >
          <b-nav-item to="Developing">Developing</b-nav-item>
          <b-nav-item disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item
              to="login"
              v-if="user.authenticated"
              @click="logout()"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import auth from "../auth";
export default {
  data() {
    return {
      user: auth.user,
    };
  },
  methods: {
    logout() {
      auth.logout();
    },
  },
};
</script>