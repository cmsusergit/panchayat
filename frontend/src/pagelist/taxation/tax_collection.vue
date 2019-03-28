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
          <table class="table is-fullwidth">
            <thead>
              <th width="100">વેરાનુ નામ</th>
              <th width="80">પાછલા બાકી</th>
              <th width="80">પાછલા ભર્યા</th>
              <th width="80">ચાલુ બાકી</th>
              <th width="80">ચાલુ ભર્યા</th>
              <th width="80">કુલ ભર્યા</th>
            </thead>
            <tr v-for="(ob,indx) in taxCollectionList" :key="indx">
              <td>{{getTaxNameById(ob.f_taxid)}}</td>
              <td>{{ob.pendingtax}}</td>
              <td>



                <b-input v-model="ob.pendingtaxpaid" type="number" min='0' :max='ob.pendingtax'/>
              </td>
              <td>{{ob.currenttax}}</td>
              <td>
                <b-input v-model="ob.currenttaxpaid" type="number" min='0' :max='ob.currenttax'/>
              </td>
              <td>{{calculateTotal(ob.pendingtaxpaid,ob.currenttaxpaid)}}</td>
            </tr>
          </table>

        <div style="margin-top:1em;" class="box is-radiusless">
            <b-field label="કુલ વેરા ભરવાની રકમ">
              <b-input @input="totalTaxtoPay" style="margin-left:1em;" type="number" expanded/>
              <button @click="payTax" style="margin-left:1em;" class="button is-primary level-right">વેરા ભરો</button>

              <button @click="generateReport" style="margin-left:1em;" class="button is-primary level-right">રિપોર્ટ</button>
            </b-field>
          </div>
      </div>
      <div v-else class="column is-size-4" style="border-left:1px solid grey">
        <p v-if="!ownerNumber">
          મિલકત નંબર નાખવો જરૂરી
        </p>
        <p v-else>મિલકત નંબર {{ownerNumber}} વાળો રેકોર્ડ ઉપલબ્ધ નથી</p>
      </div>
    </div>




    <b-modal :active.sync='reportPanelOpen' :width="1024" :has-modal-card="true" style="overflow:auto;">
      <TaxPaidReport :propertyNumber="ownerNumber" :ownerName="owner.ownername" :taxCollectionList="taxCollectionList" :taxList="taxList"/>
    </b-modal>
  </div>
</template>
<script>
import {find} from 'lodash'
import TaxPaidReport from '@/components/report/taxpaidReport'
export default {
  name: "TaxCollection",
  components: {
    TaxPaidReport
  },
  data(){
    return{
      reportPanelOpen:false,
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
    totalTaxtoPay(value){
    },
    generateReport(){this.reportPanelOpen=true;},
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
