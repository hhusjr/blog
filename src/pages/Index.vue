<template>
  <q-page>
    <Head/>
    <div class="row content">
      <main class="col-8">
        <ShowCardHalf id='1' :img="imgs[0]" :tags="['CTF', 'Misc', 'Writeup']" date="1999999" title="XCTF2020 Writeup Misc"/>
        <ShowCardHalf id='1' :left="true" :img="imgs[1]" :tags="['CTF', 'Misc', 'Writeup']" date="1999999" title="XCTF2020 Writeup Misc"/>
        <ShowCard id='1' :img="imgs[2]" :tags="['CTF', 'Misc', 'Writeup']" date="1999999" title="XCTF2020 Writeup Misc"/>
        <ShowCard id='1' :img="imgs[3]" :tags="['CTF', 'Misc', 'Writeup']" date="1999999" title="XCTF2020 Writeup Misc"/>
      </main>
      <div class="col-4" style="padding-left: 30px">
        <SideBar/>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import img0 from '../assets/1.jpg';
import img1 from '../assets/logo.jpg';
import img2 from '../assets/3.png';
import img3 from '../assets/4.png';
import ShowCard from '../components/ShowCard/ShowCard.vue';
import SideBar from '../components/SideBar/SideBar.vue';
import ShowCardHalf from '../components/ShowCard/ShowCardHalf.vue';
import Head from '../components/Head.vue';

@Component({
  components: {ShowCard, SideBar, ShowCardHalf, Head}
})
export default class Index extends Vue {
  imgs = [img0, img1, img2, img3];
}
</script>
<style lang="sass">
.content
  width: 95%
  max-width: 900px
  margin: 10px auto
</style>