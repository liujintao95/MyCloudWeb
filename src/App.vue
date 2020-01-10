<template>
  <div 
    id="app" 
    v-loading.fullscreen.lock="loading2"
    :element-loading-text="msg"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="header">
      
    </div>
    <Navigation v-if="isRouterAlive"></Navigation>
    <router-view @loadchange="loadchange" v-if="isRouterAlive"/>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      display:"display:none",
      isRouterAlive: true,
      loading2:false,
      msg:""
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    out_block(){
      this.display="display:block"
    },
    out_none(){
      this.display="display:none"
    },
    loadchange(msg){
      if (this.loading2 == false) {
        this.msg = msg
        this.loading2 = true;
      } else {
        this.loading2 = false;
        this.msg = ""
      }
    },
  },
  components:{
    Navigation,
  }
}
</script>

<style>
html, body, #app{
  height: 100%;
}
body,button, input, select, textarea,h1 ,h2, h3, h4, h5, h6 {
  font-family: Microsoft YaHei,'宋体' , Tahoma, Helvetica, Arial, "\5b8b\4f53", sans-serif;
}
.fl,.l{
  float: left;
}
.fr,.r{
  float: right;
}
.hide{
  display: none;
}
a{
  text-decoration: none;
}
li{
list-style-type:none;
}
.shadow{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.6;
  background-color: black;
  z-index: 9;
}
body {
  padding: 0;
  margin: 0;
  background-color: #FFFFFF;
}
.header{
  height: 9.5%;
  background-color: rgb(83, 110, 131)
}

</style>
