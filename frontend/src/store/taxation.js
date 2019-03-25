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


    taxList:[],
    taxCollectionList:[]
  },
  getters:{
    mesg(state){return state.mesg},
    error(state){return state.error},
    taxList(state){
      return state.taxList
    },
    taxCollectionList(state){
      return state.taxCollectionList
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
    },
    SET_TAXCOLLECTIONLIST(state,taxList){
      state.taxCollectionList=taxList
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
      const url1='TaxDetails/'
      apiObject.get(url1).then(response=>{
        commit('SET_TAXLIST',response.data);
      }).catch(error=>{
        commit('SET_MESG',null);
        commit('SET_ERROR',error.response.data.error.message);
        console.log('****',error);
      })
    },
    fetchTaxCollectionList({commit,rootState},propertyNumber){
      const temp={
        where:{
          f_propnumber:propertyNumber,
          fAyear:rootState.currentAyear
        }
      }
      const url1='TaxCollections?filter='+JSON.stringify(temp)
      console.log(url1);
      apiObject.get(url1).then(response=>{
        commit('SET_TAXCOLLECTIONLIST',response.data);
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
    },
    payTax({commit,rootState,dispatch},dt){
      return new Promise((resolve,reject)=>{

        dt.map(taxOb=>{
          const url1='/TaxCollections/'+taxOb.tcid
          console.log('****',url1);
          let temp={
            currenttax:taxOb.currenttax-taxOb.currenttaxpaid,
            pendingtax:taxOb.pendingtax-taxOb.pendingtaxpaid
          }
          apiObject.patch(url1,temp).then(rr=>{
            const urlchallan='Taxchallans/'
            const challanOb={
              tchallanid:0,
              f_tcid:taxOb.tcid,
              f_ayear:rootState.currentAyear,
              paymentDate:new Date(),
              currentpaid:taxOb.currenttaxpaid,
              pendingpaid:taxOb.pendingtaxpaid
            }
            apiObject.post(urlchallan,challanOb)
            .then(rr=>{
              dispatch('fetchTaxCollectionList',taxOb.f_propnumber)
              resolve(rr)
            })
            .catch(error=>{
              reject(error)
              console.log('****',error);
            })
          })
          .catch(error=>{
            reject(error)
            console.log('****',error);
          })
        })
      });
    }
  }
};
export default TaxationStore;
