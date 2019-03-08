<template>
  <div id="app" class="section">
        <Header></Header>
        <div v-if="ayear" class="tile level is-parent is-radiusless box">
          <div class="level-item level-right">

              <span class="subtitle"><strong>આકારણી વર્ષ :</strong> {{ayear}}</span>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
        <div class="tile is-child is-radiusless is-2 box boxv">
            <Sidebar></Sidebar>
        </div>
        <div class="tile is-child is-radiusless box">
            <router-view/>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
export default {
  name: 'App',
  components:{
    Header,
    Sidebar
  },



data(){
  return {}
},
computed:{


  ayear(){
    return this.$store.state.currentAyear
  }
},
methods: {
}
}
</script><style>
a{
  border-left:2px solid #f8f8ee;
  font-weight:bold;
}
a:hover{
  border-left:2px solid blue;
  font-weight:bold;
}
</style>
