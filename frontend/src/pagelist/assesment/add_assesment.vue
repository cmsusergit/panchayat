<template>
  <div class="">
    <h1 class="title">
      મિલ્કતની માહિતી
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
            <b-input v-model="property.mobile"/>
          </b-field>
          <b-field label="ફોન નમ્બર">
            <b-input v-model="property.phone"/>
          </b-field>
          <b-field label="ઇ-મેલ">
            <b-input type="email" v-model="property.email"/>
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
          <b-field label="મિલ્ક્ત કોડ">
            <b-input v-model="property.propertyCode"/>
          </b-field>
          <b-field label="ક્બ્જેદારનુ નામ">
            <b-input v-model="property.lesserName"/>
          </b-field>
          <b-field label="મિલ્ક્તનુ વર્ણન">
            <b-input v-model="property.propertyDesc"/>
          </b-field>
          <b-field label="મિલ્ક્તનુ સરનામુ">
            <b-input v-model="property.propertyAddr"/>
          </b-field>
          <b-field label="વા. આકારણીની રક્મ">
            <b-input v-model="property.annualAssesmentValue"/>
          </b-field>
          <b-field label="અન્ય વિગતો">
            <b-input v-model="property.comment"/>
          </b-field>
        </div>
      </div>
    </div>
    <div class="tile is-ancestor box is-radiusless">
        <button @click="addProperty"  class="button is-primary is-radiusless" style="width:25%" >મિલ્કત ઉમેરો</button>
    </div>
  </div>
</template>
<script>

import PropertyDetail from '@/model/property.js'
export default {
  name:'AddAssesment',
  data(){return {
    property:new PropertyDetail()
  }},
  methods:{
    addProperty(){
      console.log('****'+JSON.stringify(this.property));
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
