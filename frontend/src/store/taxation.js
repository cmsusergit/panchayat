import find from 'lodash/find'
import axios from 'axios'
import config from '@/../static/config.json'
const apiObject=axios.create({
  baseURL:config.db_configuration.baseURL
})
const TaxationStore={
  namespaced:true,
  state: {
    error:null,
    mesg:null,
    taxList:[
        {taxid:1,taxname:'પાણી વેરો',taxvalue:100.0,taxvaluetype:0},
        {taxid:2,taxname:'ઘર વેરો',taxvalue:50.50,taxvaluetype:0}
      ]
  },
  getters:{
    mesg(state){return state.mesg},
    error(state){return state.error},
    taxList(state){
      return state.taxList
    },
    getTaxDetail(state){
      return id=>{
        return find(state.taxList,(oo)=>{return oo.taxid==id});
      }
    }
  },
  mutations: {
    SET_MESG(state,mesg){state.mesg=mesg},
    SET_ERROR(state,errorMesg){state.error=errorMesg},
    SET_TAXLIST(state,taxList){
      state.taxList=taxList
    },
    ADD_TAXDETAIL(state,taxDetail){
        state.taxList.push(taxDetail)
    }
  },
  actions: {
    addTaxDetail({commit,dispatch,rootState},taxDetail){
      taxDetail.fAyear=rootState.currentAyear
      apiObject.post('/TaxDetails',taxDetail).then(response=>{
        dispatch('fetchTaxList');
        commit('SET_MESG',"Successfully Added");
        commit('SET_ERROR',null);
      })
      .catch(error=>{
        commit('SET_MESG',null);
        commit('SET_ERROR',error.response.data.error.message)
        console.log('*****',error);
      })
    },
    updateTaxDetail({commit,dispatch,rootState},taxDetail){
      taxDetail.fAyear=rootState.currentAyear
      apiObject.put('/TaxDetails',taxDetail).then(response=>{
        dispatch('fetchTaxList');
        commit('SET_MESG',"Successfully Updated");
        commit('SET_ERROR',null);
      })
      .catch(error=>{
        commit('SET_MESG',null);
        commit('SET_ERROR',error.response.data.error.message)
        console.log('*****',error);
      })
    },
    fetchTaxList({commit,rootState}){



      const url1='TaxDetails/?filter={"where":{"fAyear":'+rootState.currentAyear+'}}'
      apiObject.get(url1).then(response=>{
        commit('SET_TAXLIST',response.data);
      }).catch(error=>{
        commit('SET_MESG',null);
        commit('SET_ERROR',error.response.data.error.message);
        console.log('****',error);
      })
    },
    removeTaxDetail({commit,dispatch},id){
      apiObject.delete('/TaxDetails/'+id).then(response=>{
        dispatch('fetchTaxList');
        commit('SET_MESG',"Successfully Removed");
        commit('SET_ERROR',null);
      })
      .catch(error=>{
        commit('SET_MESG',null);
        commit('SET_ERROR',error.response.data.error.message)
        console.log('*****',error);
      })
    }
  }
};
export default TaxationStore;
