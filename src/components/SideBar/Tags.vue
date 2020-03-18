<template>
  <Widget title="Tags" class="widget-tags">
    <Tag v-for="tag in tags" :key="tag" :tag="tag" />
  </Widget>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Widget from './Widget.vue';
import Tag from '../Tag.vue';

@Component({
  components: {Widget, Tag}
})
export default class WidgetTags extends Vue {
  tags=['CTF', 'Misc', 'Web', 'Nodejs', 'Vue', 'Minecraft', 'Markdown']
}
</script>
<style lang="sass">
.widget-tags
  .tag
    display: inline-block
    padding: 0 .5em
    margin: .2em .2em
    border-radius: 4px
    border: 1px solid #bbbbbb
</style>