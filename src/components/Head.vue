<template>
  <CustomHead class="flex flex-center main-head">
    <div class="title">
      <span class="head-text">Yoshino-s 的记录站 专注于摸鱼</span>
      <span class="sub-head-text">有没有一种上世纪QQ空间的感觉</span>
    </div>
  </CustomHead>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CustomHead from './CustomHead.vue';

@Component({
  components: {CustomHead}
})
export default class Head extends Vue {
}
</script>
<style lang="sass" scoped>
.body--dark
  .main-head
    background-image: linear-gradient(to bottom right, desaturate($secondary, 10%), $secondary)
.main-head
  background-image: linear-gradient(to bottom right, $secondary, saturate($secondary, 20%))
  .title
    transform: translateY(-25px)
  .head-text
    display: block
    font-weight: 600
    font-size: 2.5em
    text-align: center
  .sub-head-text
    display: block
    text-align: right
    padding-right: -2em
    font-size: 2em
</style>