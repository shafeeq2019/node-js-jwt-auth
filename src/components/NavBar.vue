<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
      style="padding-left: 10px"
    >
      <b-navbar-brand href="#">Social Network</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item k to="home" v-if="user.authenticated">Home</b-nav-item>
          <b-nav-item v-if="!user.authenticated" to="login">Login </b-nav-item>
          <b-nav-item to="signup" v-if="!user.authenticated"
            >Sing up</b-nav-item
          >
          <b-nav-item to="Developing">Developing</b-nav-item>
          <b-nav-item disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="user.authenticated">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item to="profile">Profile</b-dropdown-item>
            <b-dropdown-item to="myPosts">My posts</b-dropdown-item>
            <b-dropdown-item to="login" @click="logout()"
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
