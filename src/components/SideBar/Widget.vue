<template>
  <q-card-section>
    <div class="widget-title">{{title}}</div>
    <slot>
    </slot>
  </q-card-section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Widget extends Vue {
  @Prop() title!: string;
}
</script>
<style lang="sass">
.widget-title
  font-size: 1.2rem
  font-weight: 600
  margin-bottom: 5px
</style>