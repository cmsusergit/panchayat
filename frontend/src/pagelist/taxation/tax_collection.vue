<template>
  <div id="">

    <h1 class="subtitle">વેરાની વસુલાત</h1>
    <div class="columns is-radiusless box">
      <div class="column is-4">
        <p class="content">માલિક્ની વિગતો</p>
        <div>
          <b-field label="મિલકત નમ્બર">
            <b-input required/>
          </b-field>
          <b-field label="માલિકનુ નામ">
            <b-input required/>
          </b-field>
          <b-field label='મિલકતનુ સરનામુ'>
            <b-input/>
          </b-field>
        </div>
      </div>
      <div class="column" style="border-left:1px solid grey">
          <p class="content">વેરાની વિગતો</p>
          <b-table :data='taxList' bordered>
            <template slot-scope="props">
                <b-table-column width='100' field="taxname" label="વેરાનુ નામ">{{props.row.taxname}}</b-table-column>
                <b-table-column label="પાછલા બાકી"><b-input type='number' disabled/></b-table-column>
                <b-table-column label="પાછલા ભર્યા"><b-input min='0'  type='number'/></b-table-column>
                <b-table-column label="ચાલુ બાકી"><b-input disabled/></b-table-column>
                <b-table-column label="ચાલુ ભર્યા"><b-input min='0'  type='number'/></b-table-column>
                <b-table-column label="કુલ ભર્યા"><b-input disabled/></b-table-column>
            </template>
          </b-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TaxCollection",
  data: () => ({
  }),
  computed:{
    taxList(){
      return this.$store.getters['TaxationStore/taxList']
    }
  },
  mounted() {
    this.$store.dispatch('TaxationStore/fetchTaxList')
  }
}
</script>
<style lang="css" scoped>
</style>
