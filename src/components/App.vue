<template>
  <div>
    <NavBar />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import auth from "../auth";
import NavBar from "./NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {};
  },

  methods: {},
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