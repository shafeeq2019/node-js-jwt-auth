<template>
  <div>
 
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.html="popoverMethod" title="Popover with HTML" variant="success">
          Method
        </b-button>
              <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.html="popoverMethod" title="Popover with HTML" variant="success">
          Method
        </b-button>


</div>
  </div>
</template>
<script>
export default {
  setup() {},
  methods: {
    popoverMethod() {
      return `<button> test </button>`;
    },
  },
};
</script>