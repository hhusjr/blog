<template>
  <router-link class="no-color" :to="`/paragraph/${id}`">
    <q-card class="horizon-card" :style="theme">
      <div class="img">
        <img :src="img" />
      </div>
      <q-card-section class="title">
        {{title}}
        <br />
        <Tag v-for="tag in tags" :key="tag" :tag="tag" />
        <br />
        <span class="author" v-if="author">{{author}}</span>
        <span class="date">{{d}}</span>
      </q-card-section>
    </q-card>
  </router-link>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {getTheme} from '../../utils/rgbaster';
import Tag from '../Tag.vue';
import dayjs from 'dayjs';

@Component({
  components: {Tag}
})
export default class ShowCardHalf extends Vue {
  @Prop() img!: string;
  @Prop() tags!: string[];
  @Prop() title!: string;
  @Prop() author!: string;
  @Prop() date!: number;
  @Prop() left!: boolean;
  @Prop() id!: string;

  get d(): string {
    return dayjs(this.date).fromNow();
  }

  theme = {
    'background-color': 'rgb(0,0,0)',
    color: 'white',
    'flex-direction': this.left ? 'row-reverse' : 'row',
    'text-align': this.left ? 'left' : 'right',
  }
  mounted() {
    getTheme(this.img, 0.2).then(r => {
      this.theme['background-color'] = `rgba(${r.r}, ${r.g}, ${r.b}, .8)`;
      this.theme.color = r.isDark?'white':'#444444';
    });
  }
}
</script>
<style lang="sass" scoped>
.horizon-card
  position: relative
  height: 240px
  margin-bottom: 60px
  overflow: hidden
  display: flex
  &:hover .img
    transform: scale(1.2, 1.2)
    transition: transform ease-out 2s
  .img
    transition: transform ease-out .5s
    flex: initial
    flex-shrink: 0
    max-width: 60%
    border-radius: 0 !important
    overflow: hidden
    img
      height: 100%
  .title
    flex: auto
    padding-top: 8px
    padding: .5em
    font-size: 1.6em
    line-height: 20px
    border-radius: 0 !important
    span
      font-size: .6em
      line-height: .3em

    .date
      margin-left: 10px
</style>