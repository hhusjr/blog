<template>
  <q-page>
    <CustomHead
      class="paragraph-head flex flex-center"
      :style="`background-image: url(${img}); color: ${theme.color}`"
    >
      <div class="title">
        <span class="head-text">{{title}}</span>
        <span class="author">{{author}}</span>
        <span class="date">{{d}}</span>
      </div>
    </CustomHead>
    <div class="row content">
      <q-card class="card">
        <q-card-section>
          <q-markdown ref="markdown" :src="md" toc @data="onToc" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SideBar from '../components/SideBar/SideBar.vue';
import CustomHead from '../components/CustomHead.vue';
import img from '../assets/1.jpg';
import { getTheme } from '../utils/rgbaster';
import dayjs from 'dayjs';
import md from '../assets/about.md';

import relativeTime from 'dayjs/plugin/relativeTime';
import Widget from '../components/SideBar/Widget.vue';

dayjs.extend(relativeTime);

type Node = {
  id: string;
  label: string;
  level: number;
  children: Node[];
}

@Component({
  components: {SideBar, CustomHead, Widget}
})
export default class About extends Vue {
  title = '关于从0开始自己亲手用Nodejs全栈搭建博客，前端用Vue，后端用Nest，语言用TypeScript这件事';
  author = 'Yoshino-s';
  date = 1584520368038;
  img = img;

  md = md;

  tree: Node[] = [];

  get d(): string {
    return dayjs(this.date).fromNow();
  }

  theme = {color: 'white'}
  mounted() {
    getTheme(this.img, 0.2).then(r => {
      this.theme.color = r.isDark?'white':'#444444';
    });
  }
}
</script>
<style lang="sass" scoped>
.content
  width: 95%
  max-width: 1000px
  margin: 10px auto
  z-index: 10
  .card
    width: 100%
.paragraph-head
  background-size: cover
  background-position: center
  .title
    transform: translateY(-25px)
    text-align: center
  .head-text
    display: block
    font-weight: 600
    font-size: 2.5em
  .author, .date
    padding-right: 2em
    display: block
    text-align: right
    font-size: 1.4em
</style>