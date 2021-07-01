<template>
  <b-container>
    <b-row class="mt-3 mb-3" align-h="between">
      <b-col cols="4">
        <p><b>Followers:</b></p>
        <b-list-group>
          <b-list-group-item v-for="follower in followers" button>{{
            follower.follower.username
          }}</b-list-group-item>
        </b-list-group>
      </b-col>

      <b-col cols="6">
        <!-- <p><b>User Infos:</b></p> -->
        <div>
          <b-form>
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Your Name:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.name"
                placeholder="Enter name"
                required
              ></b-form-input>
            </b-form-group>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import auth from "../../auth";
import api from "../../api.js";
export default {
  props: {
    id: "",
  },
  data() {
    return {
      followers: "",
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn",
      ],
      show: true,
    };
  },
  methods: {
    async getFollowers() {
      let data = await api.sendRequest("get", "follower/getUserFollowers");
      this.followers = data;
    },
  },
  mounted() {
    this.getFollowers();
  },
};
</script>
<style >
label {
  margin-bottom: 0.5rem;
}
.form-group {
    margin-bottom: 1rem;
}
</style>