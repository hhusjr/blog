<template>
  <q-card class="sidear">
    <WidgetIntro/>
    <q-separator/>
    <WidgetTags/>
    <q-separator/>
    <Widget title="友情链接" class="friendly">
      <span v-for="(link, name) in links" :key="name"><a :src="link">{{name}}</a></span>
    </Widget>
    <q-separator/>
    <Widget title="AD">
      这里是广告
    </Widget>
    <q-card-section>2333333</q-card-section>
  </q-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import badget from '../../assets/badget.png';
import WidgetIntro from './Intro.vue';
import WidgetTags from './Tags.vue';
import Widget from './Widget.vue';

@Component({
  components: {WidgetIntro, WidgetTags, Widget}
})
export default class SideBar extends Vue {
  badget = badget;
  links = {
    forever404: '',
    烨: ''
  }
}
</script>
<style lang="sass">
.sidear
  font-size: .8rem
  .divider
    height: 1px
    width: 95%
    margin: 0 auto
    background-color: #bbbbbb
  .friendly
    span
      display: inline-block
      margin-left: 10px
      width: 100%
      font-size: 1.05em
</style>