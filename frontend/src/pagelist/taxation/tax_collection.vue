<template>
  <div id="">

    <h1 class="subtitle">વેરાની વસુલાત</h1>
    <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="true"></b-loading>

    <div class="columns is-radiusless box">
      <div class="column is-4">
        <p class="content">માલિક્ની વિગતો</p>
        <div>
          <b-field label="મિલકત નમ્બર">
            <b-input v-model="ownerNumber" @input="ownerNumberChange" required/>
          </b-field>
          <b-field label="માલિકનુ નામ">
            <b-input v-model="owner.ownername" disabled/>
          </b-field>
          <b-field label='મિલકતનુ સરનામુ'>
            <b-input type="textarea" v-model="owner.owneraddr" disabled/>
          </b-field>
        </div>
      </div>
      <div v-if="owner.ownername" class="column" style="border-left:1px solid grey">
          <p class="content">વેરાની વિગતો</p>
          <b-table :data='taxCollectionList' bordered>
            <template slot-scope="props">
                <b-table-column width='100' field="taxname" label="વેરાનુ નામ">
                  {{getTaxNameById(props.row.f_taxid)}}
                </b-table-column>
                <b-table-column label="પાછલા બાકી" width=110>
                  <b-input v-model="props.row.pendingtax" type='number' disabled/>
                </b-table-column>
                <b-table-column label="પાછલા ભર્યા" width=110>
                  <b-input v-model="props.row.pendingtaxpaid" min='0' :max='props.row.pendingtax'  type='number'/>
                </b-table-column>
                <b-table-column label="ચાલુ બાકી" width=110>
                  <b-input v-model="props.row.currenttax" disabled/>
                </b-table-column>

                <b-table-column label="ચાલુ ભર્યા" width=110>
                  <b-input v-model="props.row.currenttaxpaid" min='0' :max='props.row.currenttax' type='number'/>
                </b-table-column>
                <b-table-column label="કુલ ભર્યા" width=110>
                  <b-input :value="calculateTotal(props.row.pendingtaxpaid,props.row.currenttaxpaid)" disabled/>
                </b-table-column>
            </template>
          </b-table>
          <div style="margin-top:1em;" class="box is-radiusless is-clearfix">
            <button @click="payTax" class="button is-primary is-pulled-right">વેરા ભરો</button>
          </div>
      </div>
      <div v-else class="column is-size-4" style="border-left:1px solid grey">
        <p v-if="!ownerNumber">
          મિલકત નંબર નાખવો જરૂરી
        </p>
        <p v-else>મિલકત નંબર {{ownerNumber}} વાળો રેકોર્ડ ઉપલબ્ધ નથી</p>
      </div>
    </div>
  </div>
</template>
<script>
import {find} from 'lodash'
export default {
  name: "TaxCollection",
  data(){
    return{
      ownerNumber:'',
      owner:{},
      loading:false
    }
  },
  computed:{
    taxList(){
      return this.$store.getters['TaxationStore/taxList']
    },
    taxCollectionList(){
      return this.$store.getters['TaxationStore/taxCollectionList']
    }
  },
  methods: {

    calculateTotal(v1,v2){
      if(v1 && v2)
        return parseInt(v1)+parseInt(v2)
      else
      return 0
    },
    payTax(){
        this.$store.dispatch('TaxationStore/payTax',this.taxCollectionList)
        .then(rr=>{
            this.$toast.open({
              message: 'Successfully Paid/સફળતા',
              duration:5500,
              type:'is-success',
              position:'is-top'
            });
        })
        .catch(error=>{
          this.$toast.open({
            message:error.response.data.error.message,
            duration:5500,
            type:'is-danger',
            position:'is-top'
          });
        })
    },
    getTaxNameById(id){
      return find(this.taxList,{taxid:id}).taxname
    },
    ownerNumberChange(value) {
        this.loading=true;
        this.$store.dispatch('PropertyStore/fetchPropertyByNumber',value)
          .then(rr=>{
            this.owner=rr
            this.$store.dispatch('TaxationStore/fetchTaxCollectionList',value)
            this.loading=false
          })
          .catch(error=>{
              this.owner={}
              console.log('****',error);
              this.loading=false
          })
    }
  },
  mounted() {
    this.$store.dispatch('TaxationStore/fetchTaxList')
  }
}
</script>
<style lang="css" scoped>
</style>
