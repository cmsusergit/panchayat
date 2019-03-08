<template>
  <div class="card" style="height:100vh">

    <div class="card-header">
      <p class="card-header-title is-size-4">વેરાની વિગતો</p>
    </div>
    <div class="card-content">
       <div class="content tile is-ancestor">

         <div class="tile">
           <ManageTaxation :taxDetail='taxOb'/>
         </div>

         <div class="tile">
           <ListTaxation @updateTaxDetail='updateTaxDetail'/>
         </div>
       </div>
     </div>
  </div>
</template>
<script>
import TaxDetail from '@/model/taxation.js'
import  ListTaxation from '@/components/taxation/list_taxation'
import  ManageTaxation from '@/components/taxation/manage_taxation'
export default {
  name: "Taxation",
  components: {
    ListTaxation,
    ManageTaxation
  },
  data() {
      return {








        taxOb:new TaxDetail()
      }
  },
methods: {
  updateTaxDetail(id) {
    const temp1=this.$store.getters['TaxationStore/getTaxDetail'](id);
    this.taxOb=temp1;
  }
}
}
</script>
<style lang="css" scoped>
</style>
