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
      <main class="col-8">
        <q-card class="card">
          <q-card-section>
            <q-markdown ref="markdown" :src="md" toc @data="onToc" />
          </q-card-section>
        </q-card>
      </main>
      <div class="col-4" style="padding-left: 30px">
        <SideBar />
        <q-card class="toc">
          <Widget title="TOC">
            <q-tree :nodes="tree" node-key="label" default-expand-all>
              <template v-slot:default-header="prop">
                <a class="row items-center no-color" :href="'#'+prop.node.id">
                  <div class="text-weight-bold">{{ prop.node.label }}</div>
                </a>
              </template>
            </q-tree>
          </Widget>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SideBar from '../../components/SideBar/SideBar.vue';
import CustomHead from '../../components/CustomHead.vue';
import img from '../../assets/1.jpg';
import { getTheme } from '../../utils/rgbaster';
import dayjs from 'dayjs';
import md from '../../assets/example.md';

import relativeTime from 'dayjs/plugin/relativeTime';
import Widget from '../../components/SideBar/Widget.vue';

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
export default class Show extends Vue {
  title = '关于从0开始自己亲手用Nodejs全栈搭建博客，前端用Vue，后端用Nest，语言用TypeScript这件事';
  author = 'Yoshino-s';
  date = 1999999999;
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

  getWeight(level: number) {
    if(level)
      if(level<=2)
        return 600;
    return 200;
  }

  onToc(toc: Node[]) {
    console.log(toc);
    if(toc.length===0) {
      return;
    }
    const tree: Node[] = [];
    const currentPath: Node[] = [];
    toc.forEach(node => {
      if(currentPath.length===0) {
        console.log('push to root');
        tree.push(node);
        currentPath.push(node);
      } else {
        if(node.level<currentPath[currentPath.length-1].level) {
          console.log('nested');
          currentPath[currentPath.length-1].children.push(node);
          currentPath.push(node);
        } else {
          console.log('pop');
          currentPath.pop();
          if(currentPath.length===0) {
            console.log('push to root');
            tree.push(node);
            currentPath.push(node);
          } else {
            currentPath[currentPath.length-1].children.push(node);
            currentPath.push(node);
          } 
        }
      }
    });
    this.tree = tree;
    console.log(tree);
  }
}
</script>
<style lang="sass" scoped>
.content
  width: 95%
  max-width: 1000px
  margin: 10px auto
  z-index: 10
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
.toc
  margin-top: 30px
  position: -webkit-sticky
  position: sticky
  top: 70px
</style>