<template>
  <div class="card">

    <button @click="generateReport" class="button is-radiusless is-danger is-fullwidth is-large">ડાઉનલોડ પીડીએફ</button>
    <div class="has-background-white" id="reportDt">

    <div class="is-radiusless box" style="10vh">
      <h1 class="is-size-5 has-text-weight-bold has-text-centered">
					નકલ સને {{ayear}} ના વર્ષ માટે કરને પાત્ર મકાનો અને જમીનનું આકારણી પત્ર
      </h1>



      <h2 class="is-size-5 has-text-centered">
          ગ્રામ-વાસદ / પંચાયત-વાસદ ગ્રામ પંચાયત
      </h2>
    </div>
    <div class="is-size-7 is-radiusless box">

			<table class="table is-bordered is-fullwidth" style="height:70vh">
        <thead>
        <tr>
          <th rowspan="2" width="20">અનુક્રમ નં.</th>
          <th rowspan="2">મહોલ્લાનું નામ</th>
          <th rowspan="2" width="50">મિલકત ક્રમ.</th>
          <th rowspan="2" width="80">મિલકતનું વર્ણન</th>
          <th rowspan="2">માલિકનુ નામ</th>
          <th rowspan="2">કબ્જેદારનુ નામ</th>
          <th rowspan="2" width="50">વાર્ષિક ભાડાની આંકણી અથવા બીજી બાબત</th>
          <th width="50" colspan="4">
            કરની આકારેલી કિંમત
          </th>
          <th rowspan="2" width="50">વાર્ષિક ભાડાની આંકણી અથવા બીજી બાબત</th>
          <th width="50" colspan="4">
            અપીલનું પરિણામ અને
          </th>
					<th class="has-text-centered" rowspan="2" width="140">પાછળના વધારાના અને ઘટાડાની બાબતમાં રકમનો ઉલ્લેખ સહિત રીમાર્ક નોંધ અને સરપંચે સહી કરવી સુધારાઓ ઉપર</th>
        </tr><th>કર</th><th>કર</th><th>કર</th><th>કર</th>
        <th>કર</th><th>કર</th><th>કર</th><th>કર</th>
        </thead>
        <tr v-for="(property,indx) in propertyList" :key="indx">
          <td>{{indx+1}}</td>
          <td>{{property.owneraddr}}</td>
          <td>{{property.propertyNumber}}</td>
          <td>{{property.propertyDesc}}</td>
          <td>{{property.ownername}}</td>
          <td>{{property.lesserName}}</td>
          <td>{{property.annualAssessmentValue}}</td>
          <td>{{property.annualAssessmentValue*0.005}}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
      </table>
    </div>
    <div class="is-size-7 level box has-text-weight-bold is-mobile" style="height:10vh">
      <div class="level-item-left">અસલ ઉપરથી ખરી નકલ કરવામાં આવી છે.</div>
      <div class="level-item">સરપંચ <br/>ગ્રામ પંચાયત</div>
  		<div class="level-item">
        નકલ કરનારની સહી :-<br/>નકલ કર્યાની તારીખ :-<br/>મુકાબલો કરનારની સહી :-
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import html2pdf from 'html2pdf.js'
export default {
  props: ['propertyList'],
       data() {
           return {
             ncolfortax:4
           }
         },
    methods:{
      generateReport(){
        const element=document.getElementById('reportDt')
        var option = {
            margin:0.2,
            filename:     'myfile.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
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
