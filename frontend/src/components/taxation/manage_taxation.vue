<template>
  <div id=""  style="padding-right:2em;width:100%;">

    <p class="has-text-danger" v-if="error">{{error}}</p>
      <p class="has-text-success" v-if="mesg">{{mesg}}</p>
    <b-field label="વેરા કોડ">
      <b-input v-model="taxOb.taxid" disabled/>
    </b-field>
    <b-field label="વેરાનુ નામ">
      <b-input v-model="taxOb.taxname"/>
    </b-field>
    <b-field label="વેરાની રકમ">
      <b-input v-model="taxOb.taxvalue"/>
    </b-field>

    <div class="block">
    <b-radio @input='changeRadio' v-model="radio" native-value="રક્મમા">રક્મમા</b-radio>
    <b-radio @input='changeRadio' v-model="radio" native-value="ટકાવારી">ટકાવારી (1000%)</b-radio>
  </div>
  <div class="is-pulled-right">
    <button v-if="taxOb.taxid==0" @click="addTaxDetail" class="button is-primary">ઉમેરો</button>
    <button v-else @click="updateTaxDetail" class="button is-primary">સુધારો</button>
    <button @click="newTaxDetail" class="button is-success">નવો વેરો</button>
    <div class="is-clearfix">
    </div>
  </div>
  </div>
</template>
<script>
import TaxDetail from '@/model/taxation.js'
export default {
  name: "ManageTaxation",
  props: ['taxDetail'],
  data: () => ({
    taxOb:new TaxDetail(),
    radio:'રક્મમા'
    }),
  methods: {
    changeRadio() {
        this.taxOb.taxvaluetype=(this.radio=="રક્મમા")?0:1;
    },
    newTaxDetail(){
      this.taxOb=new TaxDetail();
      this.radio= (this.taxOb.taxvaluetype==0)?'રક્મમા':'ટકાવારી'
    },

    addTaxDetail(){

      this.$store.dispatch('TaxationStore/addTaxDetail',this.taxOb)
      this.taxOb=new TaxDetail();
    },
    updateTaxDetail(){
        this.$store.dispatch('TaxationStore/updateTaxDetail',this.taxOb)
        this.taxOb=new TaxDetail();
    }
  },
  computed:{
    mesg(){
      return this.$store.getters['TaxationStore/mesg']
    },
    error(){
      return this.$store.getters['TaxationStore/error']
    }
  },
  watch: {
  taxDetail:function(){this.taxOb=JSON.parse(JSON.stringify(this.taxDetail));
    this.radio=(this.taxOb.taxvaluetype==0)?'રક્મમા':'ટકવારી'}
  },
  created(){
    this.taxOb=JSON.parse(JSON.stringify(this.taxDetail))
    this.radio= (this.taxOb.taxvaluetype==0)?'રક્મમા':'ટકવારી'
  }
}
</script>
<style lang="css" scoped>
</style>
