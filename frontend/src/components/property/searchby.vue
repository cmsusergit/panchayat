<template>
  <div class="is-radiusless box">

    <b-field label="શોધો દ્વારા: ">
        <b-field>
        <b-select @input="$emit('searchOptionChanged',searchByOption)" v-model="searchByOption">
          <option  v-for="(temp,indx) in searchByList" :key="indx">
            {{temp}}
          </option>
        </b-select>
        <b-input v-model="searchByText" @input="$emit('searchByText',searchByText)" expanded/>
      </b-field>
      </b-field>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name:"search",
  data(){
    return {
      searchByList:['મિલકત નંબર','કબ્જેેદારનું નામ','માલિકનું નામ','મહોલ્લાનું નામ'],
      searchByText:'',
      searchByOption:'મિલકત નંબર'
    }
  },
  computed:{
  },
  created(){
  },
  methods:{
  }
}
</script>
<style>
</style>
