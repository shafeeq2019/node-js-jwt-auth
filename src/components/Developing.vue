<template>
  <div>
    <b-container>
      <b-row class="mt-3">
        <b-col cols="12">
          <div>
            <b-card header="Success">
              <b-card-text>
                Some quick example text to build on the <em>card title</em> and
                make up the bulk of the card's content.
              </b-card-text>

              <b-card-text>A second paragraph of text in the card.</b-card-text>
              <template #footer>
                <small class="text-muted">Last updated 3 mins ago</small>
              </template>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  setup() {},
};
</script>