import find from 'lodash/find'
import axios from 'axios'
import config from '@/../static/config.json'
const apiObject=axios.create({
  baseURL:config.db_configuration.baseURL
})
const PropertyStore={
  namespaced:true,
  state: {
    error:null,
    mesg:null,
    propertyList:[]
  },
  getters:{
    mesg(state){return state.mesg},
    error(state){return state.error},
    propertyList(state){
      return state.propertyList
    },
    getPropertyDetail(state){
      return id=>{
        return find(state.propertyList,(oo)=>{return oo.propertyCode==id});
      }
    }
  },
  mutations: {
    SET_MESG(state,mesg){state.mesg=mesg},
    SET_ERROR(state,errorMesg){state.error=errorMesg},
    SET_PROPERTYLIST(state,propertyList){
      state.propertyList=propertyList
    },
    ADD_PROPERTY_DETAIL(state,detail){
        state.propertyList.push(detail)
    }
  },
  actions: {
    addPropertyDetail({commit,dispatch,rootState},detail){
      return new Promise((resolve,reject)=>{
        apiObject.post('/properties',detail).then(response=>{
        dispatch('fetchPropertyList');
        commit('SET_MESG',"Successfully Added");
        commit('SET_ERROR',null);
        resolve(response)
      })
      .catch(error=>{
        commit('SET_MESG',null);
        commit('SET_ERROR',error.response.data.error.message)
        console.log('*****',error);
        reject(error.response.data.error.message)
      });
    })
    },
    updatePropertyDetail({commit,dispatch,rootState},detail){
      detail.fAyear=rootState.currentAyear
      apiObject.put('/properties',detail).then(response=>{
        dispatch('fetchPropertyList');
        commit('SET_MESG',"Successfully Updated");
        commit('SET_ERROR',null);
      })
      .catch(error=>{
        commit('SET_MESG',null);
        commit('SET_ERROR',error.response.data.error.message)
        console.log('*****',error);
      })
    },
    fetchPropertyList({commit,rootState}){
      const url1='properties/?filter={"where":{"fAyear":'+rootState.currentAyear+'}}'
      apiObject.get(url1).then(response=>{
        commit('SET_PROPERTYLIST',response.data);
      }).catch(error=>{
        commit('SET_MESG',null);
        commit('SET_ERROR',error.response.data.error.message);
        console.log('****',error);
      })
    },

    fetchPropertyByNumber({commit,rootState},propertyNumber){
      const ob={where:{fAyear:rootState.currentAyear,propertyNumber:propertyNumber},fields:{ownername:1,owneraddr:1}}
      const url1="properties/findOne/?filter="+JSON.stringify(ob);
      console.log(url1);
      return new Promise((resolve,reject)=>{
        apiObject.get(url1)
        .then(response=>{
          resolve(response.data);
        })
        .catch(error=>{
          reject(error);
        })
      });
    },
    removePropertyDetail({commit,dispatch},id){
      apiObject.delete('/properties/'+id).then(response=>{
        dispatch('fetchPropertyList');
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
export default PropertyStore;
