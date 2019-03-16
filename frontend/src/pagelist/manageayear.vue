<template>


  <div class="card" style="height:100vh">
    <div class="card-header">

      <p class="card-header-title is-size-4">આકારણી વર્ષની વિગતો</p>
    </div>
    <div class="card-content">
       <div class="content tile is-ancestor">
         <div class="tile">
           <ManageAyear :ayearDetail='ayearOb'/>
         </div>
         <div class="tile">
           <ListAyear @updateAyearDetail='updateAyearDetail'/>
         </div>
       </div>
     </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import  ListAyear from '@/components/ayear/list_ayear'
import  ManageAyear from '@/components/ayear/manage_ayear'
import AyearDetail from '@/model/ayear.js'
export default {
      name:"ManageAyearList",
      components: {
        ListAyear,ManageAyear
      },
       data() {
           return {
              ayearOb:new AyearDetail()
           }
         },
         methods: {
           updateAyearDetail(id) {
             const temp1=this.$store.getters['AyearStore/getAyearDetail'](id);
             this.ayearOb=temp1;
           }
         }
}
</script>
<style>
	.cardv{
  background-color:floralwhite;
  color:#224444;
  }
</style>
