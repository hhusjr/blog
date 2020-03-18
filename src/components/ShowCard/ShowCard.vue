<template>
  <router-link class="no-color" :to="`/paragraph/${id}`">
    <q-card class="card">
      <q-img :src="img" basic class="img"></q-img>
      <div class="title" :style="theme">
        {{title}}
        <br />
        <Tag v-for="tag in tags" :key="tag" :tag="tag" />
        <br />
        <span class="author" v-if="author">{{author}}</span>
        <span class="date">{{d}}</span>
      </div>
    </q-card>
  </router-link>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {getTheme} from '../../utils/rgbaster';
import Tag from '../Tag.vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

@Component({
  components: {Tag}
})
export default class ShowCard extends Vue {
  @Prop() img!: string;
  @Prop() tags!: string[];
  @Prop() title!: string;
  @Prop() author!: string;
  @Prop() date!: number;
  @Prop() id!: string;

  get d(): string {
    return dayjs(this.date).fromNow();
  }

  theme = {'background-color': 'rgba(0,0,0,.4)', color: 'white'}
  mounted() {
    getTheme(this.img, 0.2).then(r => {
      this.theme['background-color'] = `rgba(${r.r}, ${r.g}, ${r.b}, .4)`;
      this.theme.color = r.isDark?'white':'#444444';
    });
  }
}
</script>
<style lang="sass" scoped>
.card
  position: relative
  height: 240px
  margin-bottom: 60px
  overflow: hidden
  &:hover .img
    transform: scale(1.2, 1.2)
    transition: transform ease-out 2s
  .img
    width: 100%
    height: 100%
    background-size: cover
    background-position: center
    transition: transform ease-out .5s
  .title
    padding-top: 8px
    position: absolute
    bottom: 0
    width: 100%
    height: 30%
    text-align: right
    padding-right: .5em
    font-size: 1.6em
    line-height: 20px
    border-top-left-radius: 0 !important
    border-top-right-radius: 0 !important
    color: #fff
    span
      font-size: .6em
      line-height: .3em
    .date
      margin-left: 10px
</style>