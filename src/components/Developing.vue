<template>
  <div>
 
<div class="text-center my-3">
  <b-button v-b-popover.hover.top="'I am popover directive content!'" title="Popover Title">
    Hover Me
  </b-button>


</div>
  </div>
</template>
<script>
export default {
  setup() {},
};
</script>