<template>
  <b-container>
    <b-row class="mt-3">
      <b-col cols="12">
        <h2>Log In</h2>
        <p>Log in to your account to use this website</p>
        <div class="alert alert-danger" v-if="error" style="padding: 10px">
          <span>{{ error }}</span>
        </div>
        <b-row >
          <b-col cols="12">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Enter your username"
                v-model="credentials.username"
              />
            </div>
          </b-col>
        </b-row>
        <b-row >
          <b-col cols="12">
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Enter your password"
                v-model="credentials.password"
              />
            </div>
          </b-col>
        </b-row>

        <button class="btn btn-primary" @click="submit()">Access</button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import auth from "../auth";

export default {
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      error: "",
    };
  },

  methods: {
    submit() {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password,
      };

      auth.login(this, credentials, "home");
    },
  },
};
</script>
