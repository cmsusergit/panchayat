<template>
  <div class="">

    <h1 v-if="!propertyId" class="title">
      મિલ્કતની માહિતી ઉમેરો
    </h1>
    <h1 v-else class="title">
      મિલ્ક્તની માહિતી બદલો  (propertyCode:{{propertyId}})
    </h1>
    <div class="tile is-ancestor">
      <div class="is-grouped tile is-parent is-vertical card cardv">
        <div class="card-header has-background-grey">
        <p class="has-text-weight-bold has-text-white card-header-title">
          માલિકની માહિતી
        </p>
        </div>

        <div class="card-content">
          <b-field label="માલિકનું નામ">
            <b-input v-model="property.ownername" required/>
          </b-field>
          <b-field label="માલિકનું સરનામુ">
            <b-input v-model="property.owneraddr" type="textarea"/>
          </b-field>
          <b-field label="મોબાઇલ નમ્બર">
            <b-input v-model="property.ownermobile"/>
          </b-field>
          <b-field label="ફોન નમ્બર">
            <b-input v-model="property.ownerphone"/>
          </b-field>
          <b-field label="ઇ-મેલ">
            <b-input type="email" v-model="property.owneremail"/>
          </b-field>
        </div>
      </div>

      <div class="is-grouped tile is-parent is-vertical card cardv">
        <div class="card-header has-background-grey">
        <p class="has-text-weight-bold has-text-white card-header-title">
          મિલકતનું વર્ણન
        </p>
      	</div>
        <div class="card-content">
          <b-field label="મિલ્કત ન.">
            <b-input v-model="property.propertyNumber"/>
          </b-field>
          <b-field label="સીટી સર્વે નંબર">
            <b-input v-model="property.citySurveyNumber"/>
          </b-field>
          <b-field>
            <b-checkbox @input="nameCopy">
              માલિકના નામ જેવુ
            </b-checkbox>
          </b-field>
          <b-field label="ક્બ્જેદારનુ નામ">
            <b-input v-model="property.lesserName"/>
          </b-field>
          <b-field label="મિલ્ક્તનુ વર્ણન">
            <b-input v-model="property.propertyDesc"/>
          </b-field>
          <b-field>
            <b-checkbox @input="addrCopy">
              માલિકના સરનામા જેવુ
            </b-checkbox>
          </b-field>
          <b-field label="મિલ્ક્તનુ સરનામુ">
            <b-input v-model="property.propertyAddr" type="textarea"/>
          </b-field>
          <b-field label="વા. આકારણીની રક્મ">
            <b-input v-model="property.annualAssessmentValue"/>
          </b-field>
          <b-field label="અન્ય વિગતો">
            <b-input v-model="property.comment"/>
          </b-field>
        </div>
      </div>
    </div>
    <div class="tile is-ancestor box is-radiusless">
        <button v-if="!propertyId" @click="addProperty"  class="button is-primary is-radiusless" style="width:25%" >મિલ્કત ઉમેરો</button>
        <button v-else @click="updateProperty" class="button is-primary is-radiusless" style="width:25%">મિલ્કત બદલો</button>
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import PropertyDetail from '@/model/property.js'
export default {
  name:'AddProperty',
  data(){
    return {
      propertyId:null,
      property:new PropertyDetail()
    }
  },
  computed:mapGetters(['currentAyear']),
  methods:{
		addProperty(){
      this.property.fAyear = this.currentAyear
      this.$store.dispatch('PropertyStore/addPropertyDetail',this.property)
      .then(rr=>{
        this.$toast.open({
          message: 'Successfully Added/સફળતા',
          duration:5500,
          type: 'is-success',
          position:'is-top'
        });
        this.$router.push({name:'Property'})
      })
      .catch(error=>{
        this.$toast.open({
          message: error,
          duration:5500,
          type: 'is-danger',
          position:'is-top'
        });
      })
    },
    updateProperty(){
      this.property.fAyear = this.currentAyear
      this.$store.dispatch('PropertyStore/updatePropertyDetail',this.property)
      .then(rr=>{
        this.$toast.open({
          message: 'Successfully Updated/સફળતા',
          duration:5500,
          type: 'is-success',
          position:'is-top'
        });
        this.$router.push({name:'Property'})
      })
      .catch(error=>{
        this.$toast.open({
          message: error,
          duration:5500,
          type: 'is-danger',
          position:'is-top'
        });
      })
    },
    addrCopy(value){
      if(value){
        this.property.propertyAddr=this.property.owneraddr
      }
      else {
        this.property.propertyAddr=""
      }
    },
    nameCopy(value){
      if(value)
        this.property.lesserName=this.property.ownername
      else
       this.property.lesserName=""
    }
  },
  mounted() {
    this.propertyId=this.$route.params.id
    if(this.propertyId){
      this.property=this.$store.getters['PropertyStore/getPropertyDetail'](this.propertyId)
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
