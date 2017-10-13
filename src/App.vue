<template>
  <div id="app">
    <md-toolbar>
      <h1 class="md-title">VueMaterial - </h1>
    </md-toolbar>
    <div class="main-content">
<md-layout md-gutter>
  <transition-group name="fade" class="md-layout">
  <md-layout md-flex-xsmall="100" md-flex-small="33" md-flex-large="25" md-flex-xlarge="20" md-align="center" :key="index"  v-for="(li,index) in imageNum">

    <md-card class="cards">
        <md-card-media>
          <img :src="`https://picsum.photos/400/300?image=${li.id}`" alt="People">
        </md-card-media>

        <md-card-header>
          <div class="md-subhead">{{li.author}}</div>
          <div class="md-subhead"><a :href="li.post_url">grab this on unsplash</a></div>
        </md-card-header>

        <md-card-actions>
          <md-button @click="delCard(index)">REMOVE</md-button>
        </md-card-actions>
      </md-card>

  </md-layout>
</transition-group>

      </md-layout>
    </div>
    <md-button class="md-icon-button md-raised md-primary btn__fixed" @click="getImage()">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      unsplashData: [],
      imageIndex: 0,
      loadinging: true
    }
  },
  methods:{
      getImage(){
        var self = this
        fetch('https://picsum.photos/list',{
        })
        .then(function(res){
          if(res.status >=200 && res.status <300){
          return res.json();
          }else{
            var error = new Error(res.statusText)
            error.res = res
            throw error
          }})
        .then(function(data){
          console.log('...Success:')
          self.imageIndex++
          self.unsplashData.push(data[self.imageIndex])
          window.scrollTo(0, document.body.scrollHeight)

        })
        .catch(function(error){
          console.log('...Rejected:')
          console.log(error)
        });
    },
      delCard(index){
        this.unsplashData.splice(index,1)
      },
  },
  computed:{
    imageNum(){
      return this.unsplashData
    },
  },
  created(){
  }
}
</script>

<style lang="sass">
body
  scroll-behavior: smooth  //just on FF >"<

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  scroll-behavior: smooth
  text-align: center
  color: #2c3e50
.cards
  margin: 10px

.btn__fixed
  position: fixed
  bottom: 10px
  right: 10px
  z-index: 3

//animation
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
