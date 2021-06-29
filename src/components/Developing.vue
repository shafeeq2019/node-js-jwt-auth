<template>
  <div>
 
   <b-modal
      id="modal-sm"
      size="sm"
      scrollable
      title="Post liked by"
      :hide-footer="true"
      :hide-header-close="true"
    >
      <b-list-group flush>
        <b-list-group-item href="#" v-for="like in postLikes">{{
          like.user.username
        }}</b-list-group-item>
      </b-list-group>
    </b-modal>


</div>
  </div>
</template>
<script>
export default {
  setup() {},
};
</script>