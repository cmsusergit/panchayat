<template>
  <div class="">

    <div class="level is-radiusless box">
      <h1 class="level-item-left subtitle">
        મિલ્કતનુ લિસ્ટ
      </h1>
      <div class="level-item-right">
        <router-link :to="{ name: 'AddProperty'}" class="button is-success">મિલ્કત ઉમેરો</router-link>
        <button @click="generateReport" style="margin-left:1em;" class="button is-pulled-right is-primary">રિપોર્ટ/અહેવાલ</button>
      </div>
    </div>

    <div class="is-clearfix">
    </div>
    <SearchBy @searchOptionChanged='searchOptionChanged'  @searchByText='searchByText'/>
    <div class="is-radiusless box">
      <b-table :data="!searching?propertyList:searchedPropertyList">
        <template slot-scope="props">
            <b-table-column label="અનુક્રમ નં." width="40" numeric>
                {{ props.index+1 }}
            </b-table-column>
            <b-table-column field="owneraddr" label="મહોલ્લાનું નામ" sortable>
              {{props.row.owneraddr}}
            </b-table-column>
            <b-table-column field="ownername" label="માલિકનુ નામ" sortable>
              {{props.row.ownername}}
            </b-table-column>
            <b-table-column field="lesserName" label="કબ્જેદારનુ નામ" sortable>
              {{props.row.lesserName}}
            </b-table-column>
            <b-table-column field="propertyNumber" label="મિલકત ક્રમ." sortable>
              {{props.row.propertyNumber}}
            </b-table-column>
            <b-table-column field="citySurveyNumber" label="સીટી સર્વે નંબર" sortable>
              {{props.row.citySurveyNumber}}
            </b-table-column>
            <b-table-column field="propertyDesc" label="મિલકતનું વર્ણન">
              {{props.row.propertyDesc}}
            </b-table-column>
            <b-table-column label="સંચાલન">
              <button @click="generateReportForProperty(props.row)" class="button is-dark is-small">
              <b-icon
                pack="fas"
                icon="file-pdf"
                size="is-small">
              </b-icon>
              </button>

            <button @click="updateProperty(props.row.propertyCode)" class="button is-small is-warning">
                <b-icon
                pack="fas"
                icon="edit"
                size="is-small">
              </b-icon>
            </button>
            <button @click="removeProperty(props.row.propertyCode)" class="button is-small is-danger">
                <b-icon
                pack="fas"
                icon="trash"
                size="is-small"></b-icon></button>
            </b-table-column>
        </template>
      </b-table>
    </div>




    <b-modal :active.sync='reportPanelOpen' :width="1024" :has-modal-card="true" style="overflow:auto;">
      <PropertyReport :propertyList="reportPropertyList"/>
    </b-modal>
  </div>
</template>

<script>
import PropertyReport from '@/components/report/propertyReport'
import SearchBy from '@/components/property/searchby'
import html2pdf from 'html2pdf.js'
import {mapState,mapGetters} from 'vuex'
import {filter} from 'lodash'

export default {
      components: {
        PropertyReport,
        SearchBy
      },
       data() {
           return {
              searchOption:'મિલકત નંબર',
              searching:false,
              searchedPropertyList:[],
              reportPropertyList:null,
              reportPanelOpen:false
           }
         },
    watch:{
      propertyList(){
        this.reportPropertyList=this.propertyList
      }
    },
    computed:{
      propertyList(){
        return this.$store.getters['PropertyStore/propertyList']
      }
    },
  mounted() {
            this.$store.dispatch('PropertyStore/fetchPropertyList')
    },
    methods:{
      generateReportForProperty(property){
        this.reportPropertyList=[];
        this.reportPropertyList.push(property)
        this.reportPanelOpen=true
      },
      generateReport(){
        if(this.searchedPropertyList.length>0)
          this.reportPropertyList=this.searchedPropertyList

        else {
          this.reportPropertyList=this.propertyList
        }
        this.reportPanelOpen=true
      },
      updateProperty(id){
        this.$router.push({name:"AddProperty",params:{id:id}})
      },
      removeProperty(id){
        this.$dialog.confirm({
         title: 'મિલ્કત કમી કરો',
         message: 'ખરેખર કમી કરવા માગો છો?',
         confirmText: 'કમી કરો',
         cancelText:"રદ",
         type: 'is-danger',
         hasIcon: true,
         onConfirm: () => this.$store.dispatch('PropertyStore/removePropertyDetail',id)
     })
   },
   searchByText(text){
     this.searchText=text
     this.searchBy()
   },
     searchBy(){
     if(this.searchText==''){
       this.searching=false
     }
     else {
      	this.searching=true
        this.searchedPropertyList=filter(this.propertyList,(ob)=>{
          let tt='';
          if(this.searchOption=='મિલકત નંબર'){
          	tt=ob.propertyNumber
          }
          else if(this.searchOption=='માલિકનું નામ') {
            tt=ob.ownername
          }
          else if(this.searchOption=='મહોલ્લાનું નામ') {
            tt=ob.owneraddr
          }
          else{
            tt=ob.lesserName
          }
          return tt.includes(this.searchText)
        })
     }
   },
   searchOptionChanged(text){
			this.searchOption=text
      this.searchBy()
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
