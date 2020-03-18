<template>
  <span class="tag">{{tag}}</span>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Tag extends Vue {
  @Prop() tag!: string;
}
</script>
<style lang="sass" scoped>
.tag
  border-radius: 4px
  border: 1px solid #bbbbbb
  margin: 2px 2px
  padding: 0 2px
</style>