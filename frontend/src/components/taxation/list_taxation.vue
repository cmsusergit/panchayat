<template>
  <div id="" style="margin-left:1em;width:100%;">

    <h1 class="title is-size-5">
      વેરાની યાદી
    </h1>
    <b-table :data="taxList">
      <template slot-scope="props">

        <b-table-column field="taxid" label="વેરા કોડ">
          {{props.row.taxid}}
        </b-table-column>

        <b-table-column field="taxname" label="વેરાનુ નામ">
          {{props.row.taxname}}
        </b-table-column>
        <b-table-column field="taxvalue" label="વેરાની રકમ">
          {{props.row.taxvalue}}
          <template v-if="props.row.taxvaluetype==1">%</template>
        </b-table-column>
        <b-table-column label="સંચાલન">
          <button @click="updateTaxDetail(props.row.taxid)" class="button is-radiusless is-small is-warning">
            <b-icon
               pack="fas"
               icon="edit"
               size="is-small">
           </b-icon>
          </button>
          <button @click="removeTaxDetail(props.row.taxid)" class="button is-radiusless is-small is-danger">
            <b-icon
               pack="fas"
               icon="trash"
               size="is-small">
           </b-icon>
          </button>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({
  }),

  computed:{
    taxList(){
      console.log('****',this.$store.state.TaxationStore.taxList);
      return this.$store.getters['TaxationStore/taxList']
    }
  },
  methods: {
    updateTaxDetail(id) {
      this.$emit('updateTaxDetail',id);
    },
    removeTaxDetail(id){
          this.$dialog.confirm({
         title: 'વેરો કમી કરો',
         message: 'ખરેખર કમી કરવા માગો છો?',
         confirmText: 'કમી કરો',
         cancelText:"રદ",
         type: 'is-danger',
         hasIcon: true,
         onConfirm: () => this.$store.dispatch('TaxationStore/removeTaxDetail',id)
     })
    }
  },
  mounted() {
    this.$store.dispatch('TaxationStore/fetchTaxList')
  }
}
</script>
<style lang="css" scoped>
</style>          
