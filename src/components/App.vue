<template>
  <div>
    <NavBar />
    <router-view></router-view>
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
