<template>
  <div class="cus-footer">
    <div>
      Build by Yoshino-s.<br/>
      Powdered By VueJS Quasar NestJS
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
}
</script>
<style lang="sass" scoped>
.cus-footer
  padding: 10px
  text-align: center
  min-height: 60px
  display: flex
  justify-items: center
  align-items: center
  >*
    flex: auto
</style>