<template>
  <b-container>
    <b-row class="mt-3">
      <b-col cols="12">
        <h2>Sign Up</h2>
        <p>Sign up for a free account to get using of this website.</p>
        <div class="alert alert-danger" v-if="error" style="padding: 10px">
          <span>{{ error }}</span>
        </div>
        <b-row>
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
        <b-row >
          <b-col cols="12">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Enter your email"
                v-model="credentials.email"
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
        email: "",
        password: "",
      },
      error: "",
    };
  },

  methods: {
    submit() {
      var credentials = {
        username: this.credentials.username,
        email: this.credentials.email,
        password: this.credentials.password,
      };

      auth.signup(this, credentials, "secretquote");
    },
  },
};
</script>
