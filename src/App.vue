<template>
  <div id="app">
    <TopMenu class="tMenu"></TopMenu>
    <LeftMenu class="lMenu"></LeftMenu>
  </div>
</template>

<script>
import TopMenu from './components/TopMenu.vue'
import LeftMenu from './components/LeftMenu.vue'

export default {
  name: 'app',
  components: {
    TopMenu,
    LeftMenu
  }
}
</script>

<style>
html,body,#app{
  height: 100%;
  width: 100%;
}
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,dt,form,fieldset,legend,input,textarea,select{margin:0;padding:0}
a{text-decoration:none}
em{font-style:normal}
li{list-style:none}
img{border:0;vertical-align:middle}
table{border-collapse:collapse;border-spacing:0}
p{word-wrap:break-word}
.ind{text-indent:2em}
.ind10{text-indent:10px;}
.noborder{border:0;}
.left{float:left;}
.right{float:right;}
.clearBoth{clear:both;}
.font12{font-size:12px;}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding:0px;
}
.lMenu {
  display: inline-block;
  height: calc(100% - 42px);
  width: 15%;
}
.tMenu {
  height: 38px;
  width: 100%;
}
</style>
