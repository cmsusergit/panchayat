<template>
  <div id="" style="margin-left:1em;width:100%;">

    <h1 class="title is-size-5">
      આકારણી વર્ષની યાદી
    </h1>
    <b-table :data="ayearList">
      <template slot-scope="props">

        <b-table-column field="akarniyearid" label="આકારણી વર્ષ આઈડી">
          {{props.row.akarniyearid}}
        </b-table-column>

        <b-table-column field="akarniyear" label="આકારણી વર્ષ">
          {{props.row.akarniyear}}
        </b-table-column>
        <b-table-column field="aystartfrom" label="આકારણી વર્ષ શરૂઆત તારીખ">
          {{new Date(props.row.aystartfrom).toLocaleDateString()}}
        </b-table-column>
        <b-table-column field="ayend" label="આકારણી વર્ષ અંતિમ તારીખ">
          {{new Date(props.row.ayend).toLocaleDateString()}}
        </b-table-column>
        <b-table-column label="સંચાલન">
          <button @click="updateAyearDetail(props.row.akarniyearid)" class="button is-radiusless is-small is-warning">
            <b-icon
               pack="fas"
               icon="edit"
               size="is-small">
           </b-icon>
          </button>
          <button @click="removeAyearDetail(props.row)" class="button is-radiusless is-small is-danger">
            <b-icon
               pack="fas"
               icon="trash"
               size="is-small">
           </b-icon>
          </button>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({
  }),

  computed:{
    ayearList(){
      return this.$store.getters['AyearStore/ayearList']
    }
  },
  methods: {
    updateAyearDetail(id) {
      this.$emit('updateAyearDetail',id);
    },

     removeAyearDetail(dt){
  	 this.$dialog.confirm({
         title: 'આકારણી વર્ષ કમી કરો',
         message: 'ખરેખર કમી કરવા માગો છો?',
         confirmText: 'કમી કરો',
         cancelText:"રદ",
         type: 'is-danger',
         hasIcon: true,
         onConfirm: () =>{
           const temp={
             id:dt.akarniyearid,
             fAyear:dt.akarniyear
           }
           console.log('----',temp);
            this.$store.dispatch('AyearStore/removeAyearDetail',temp)
              .then(rr=>{
                this.$toast.open({
                    message: 'Successfully Removed/સફળતા',
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
     })
    }
  },
  mounted() {
    this.$store.dispatch('AyearStore/fetchAyearList')
  }
}
</script>
<style lang="css" scoped>
</style>          
