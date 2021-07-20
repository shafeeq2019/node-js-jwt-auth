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
          <b-nav-item k to="/home" v-if="user.authenticated">Home</b-nav-item>
          <b-nav-item v-if="!user.authenticated" to="/login">Login </b-nav-item>
          <b-nav-item to="/signup" v-if="!user.authenticated"
            >Sing up</b-nav-item
          >
          <b-nav-item to="/Developing">Developing</b-nav-item>
          <b-nav-item disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" right>
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
          </b-nav-form>
          <b-nav-item-dropdown right v-if="user.authenticated">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item
              @click="
                $router.push({ name: 'profile', params: { id: user.userId } })
              "
              >Profile</b-dropdown-item
            >
            <b-dropdown-item
              @click="
                $router.push({ name: 'posts', params: { id: user.userId } })
              "
              >My posts</b-dropdown-item
            >
            <b-dropdown-item to="/login" @click="logout()"
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
  created() {},
};
</script>
<style >
.form-inline {
  display: flex;
  align-items: center;
}
</style>