<template>
  <div class="card" id="reportDt">

    <div v-for="indx in indxList" :key="indx" class="has-background-white" style="border-bottom:1px dashed grey">
    <div style="margin-bottom:0.5em;">
      <div class="content is-size-7 has-text-centered">પંચાયત હિસાબનો ક્રમાંક ૪ (જુઓ નિયમ ૫) તબદીલ ન કરી શકાય તેવી અસલ પાવતી</div>
      <h1 class="is-size-5 has-text-weight-bold has-text-centered">
        ગ્રામ પંચાયતને કર/ બીજી રકમની <br>
        ચુકવણી કર્યાની પહોંચ <span class="is-size-7">ઓરીજીનલ</span>
      </h1>

      <p class="is-size-7 has-text-left">
        ઘર નં. {{propertyNumber}} <br>
      </p>
      <p class="is-size-7 has-text-right">
        પાવતી નં. ____________ <br>
      </p>
      <p class="is-size-7 has-text-left">
        સને {{ayear}} ના વર્ષનો હિસાબ<br>
      </p>
      <p class="is-size-7 has-text-left">
        શ્રી {{ownerName}} પાસેથી નીચે જણાવેલ કરની રકમ મળી<br>
      </p><br>
    </div>
    <div style="margin-bottom:0.5em;border:1px solid grey" class="is-size-7">
      <table class="table is-fullwidth">
        <thead>
          <th width="140">કર તથા અન્ય વેરા</th>
          <th width="80">પાછલા બાકી</th>
          <th width="80">પાછલા ભર્યા</th>
          <th width="80">ચાલુ બાકી</th>
          <th width="80">ચાલુ ભર્યા</th>
          <th width="80">કુલ ભર્યા</th>
        </thead>
        <tr v-for="(ob,indx) in taxCollectionList" :key="indx">
          <td>{{getTaxNameById(ob.f_taxid)}}</td>
          <td>{{ob.pendingtax}}</td>
          <td>{{ob.pendingtaxpaid}}</td>
          <td>{{ob.currenttax}}</td>
          <td>{{ob.currenttaxpaid}}</td>
          <td>{{calculateTotal(ob.pendingtaxpaid,ob.currenttaxpaid)}}</td>
        </tr>
      </table>
    </div>
    <div style="margin-bottom:5em;" class="is-size-7 is-mobile">
      <p class="has-text-left">અંકે રૂપિયા: ______________________________________પુરા વસુલાત પેટે મળેલ છે.</p>

      <div>
      <p class="has-text-left">તા. {{new Date().toLocaleDateString()}}</p>
      <p class="has-text-right">તલાટી કમ મંત્રી</p><br>
      <p class="has-text-right">____________________(ગ્રા.પં.)</p>
    </div>
    </div>
  </div>
  </div>
</template>
<script>
import {find} from 'lodash'
import html2pdf from 'html2pdf.js'
export default {
  props: ['propertyNumber','ownerName','taxCollectionList',"taxList"],
       data() {
           return {
             indxList:[1,2]
           }
         },
    methods:{
      calculateTotal(v1,v2){
        if(v1 && v2)
          return parseInt(v1)+parseInt(v2)
        else
        return 0
      },
      getTaxNameById(id){
        return find(this.taxList,{taxid:id}).taxname
      },
      generateReport(){
        const element=document.getElementById('reportDt')
        var option = {
            margin:0.2,
            filename:     'myfile.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
          };
          html2pdf().from(element).set(option).save();
      },
    },
    mounted() {
      this.generateReport()
    },
    computed:{
      ayear(){
        return this.$store.state.currentAyear
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
