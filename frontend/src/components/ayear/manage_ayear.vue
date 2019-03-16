<template>
  <div id=""  style="padding-right:2em;width:100%;">

    <b-field label="આકારણી વર્ષ આઈડી">
      <b-input v-model="ayearOb.akarniyearid" disabled/>
    </b-field>
    <b-field label="આકારણી વર્ષ">
      <b-input v-model="ayearOb.akarniyear"/>
    </b-field>

    <b-field label="આકારણી વર્ષ શરૂઆત તારીખ">
      <b-datepicker v-model="ayearOb.aystartfrom" :date-formatter="formatDt"/>
    </b-field>
    <b-field label="આકારણી વર્ષ અંતિમ તારીખ">
      <b-datepicker v-model="ayearOb.ayend"/>
    </b-field>
    <b-field label="વીતેલા વર્ષના ડેટા કોપી કરવા, સિલેક્ટ વર્ષ(કોપી ના કરવા સિલેક્ટ -)">
       <b-select v-model="prevyear" expanded>
         <option value="-">-</option>
         <option v-for="(ayear,indx) in ayearList" :value="ayear.akarniyear" :key="indx">{{ayear.akarniyear}}</option>
       </b-select>
    </b-field>
    <div class="is-clearfix">
      <div class="is-pulled-right">
      <button v-if="ayearOb.akarniyearid==0" @click="addAyearDetail" class="button is-primary">ઉમેરો</button>
      <button v-else @click="updateAyearDetail" class="button is-primary">સુધારો</button>
      <button @click="newAyearDetail" class="button is-success">નવો વેરો</button>
      </div>
    </div>
  </div>
</template>
<script>
import{mapState} from 'vuex'
import AyearDetail from '@/model/ayear.js'
export default {
  name: "ManageAyear",
  props: ['ayearDetail'],
  data: () => ({
    ayearOb:new AyearDetail(),
    prevyear:'-'
    }),
  methods: {
    newAyearDetail(){
      this.ayearOb=new AyearDetail();
    },
    formatDt(dd){ return dd.toLocaleDateString()},
    addAyearDetail(){
      const t1=new Date(this.ayearOb.aystartfrom.getTime()+Math.abs(this.ayearOb.aystartfrom.getTimezoneOffset()*60000))
      this.ayearOb.aystartfrom=t1
      const tt=new Date(this.ayearOb.ayend.getTime()+Math.abs(this.ayearOb.ayend.getTimezoneOffset()*60000))
      this.ayearOb.ayend=tt
      this.ayearOb.prevyear=this.prevyear
      this.$store.dispatch('AyearStore/addAyearDetail',this.ayearOb)
        .then(rr=>{
          this.$toast.open({
            message: 'Successfully Added/સફળતા',
            duration:5500,
            type: 'is-success',
            position:'is-top'
          });
          this.ayearOb=new AyearDetail();
        })
        .catch(error=>{
          console.log('****',error);
          this.$toast.open({
            message: error.response.data.error.message,
            duration:5500,
            type: 'is-danger',
            position:'is-top'
          });
        })
    },
    updateAyearDetail(){
        this.$store.dispatch('AyearStore/updateAyearDetail',this.ayearOb)
        .then(rr=>{
          this.$toast.open({
            message: 'Successfully Updated/સફળતા',
            duration:5500,
            type: 'is-success',
            position:'is-top'
          });
          this.ayearOb=new AyearDetail();
        })
        .catch(error=>{
          this.$toast.open({
            message:error.response.data.error.message,
            duration:5500,
            type: 'is-danger',
            position:'is-top'
          });
        })
    }
  },
  computed:mapState(["ayearList"]),
  watch: {
      ayearDetail:function(){
        this.ayearOb=JSON.parse(JSON.stringify(this.ayearDetail));
        this.ayearOb.aystartfrom=new Date(this.ayearOb.aystartfrom)
        this.ayearOb.ayend=new Date(this.ayearOb.ayend)
      }
  },
  created(){
    this.$store.dispatch('fetchAyearList')
  }
}
</script>
<style lang="css" scoped>
</style>
