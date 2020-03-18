<template>
  <div class="row head shadow-3">
    <div class="container">
      <slot>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class CustomHead extends Vue {
}
</script>
<style lang="sass" scoped>
.head
  position: relative
  width: 100%
  min-height: 260px
  margin-bottom: -50px
  .container
    max-width: 80%
    margin-top: 60px
    margin-bottom: 30px
</style>