import find from 'lodash/find'
import axios from 'axios'
import config from '@/../static/config.json'
const apiObject=axios.create({
  baseURL:config.db_configuration.baseURL
})
const AyearStore={
  namespaced:true,
  state: {
    ayearList:[]
  },
  getters:{

    ayearList(state){
      return state.ayearList
    },
    getAyearDetail(state){
      return id=>{
        return find(state.ayearList,(oo)=>{return oo.akarniyearid==id});
      }
    }
  },
  mutations: {
    SET_AYEARLIST(state,list){
      state.ayearList=list
    },
    ADD_AYEARDETAIL(state,detail){
        state.ayearList.push(detail)
    }
  },
  actions: {
    addAyearDetail({commit,dispatch,rootState},detail1){
      return new Promise((resolve,reject)=>{
        apiObject.post('/Akarniyears',detail1).then(response=>{
            if(detail1.prevyear=='-'){
              resolve(response)
            }
            else{
              const dt={
                dt:{
                  prevyear:detail1.prevyear,
                  curryear:detail1.akarniyear
                }
              }
              apiObject.post('/properties/copyPropertyToAyear',dt)
                .then(rr=>{
                  apiObject.post('/TaxDetails/copyTaxDetailToAyear',dt )
                    .then(rr=>{
                      dispatch('fetchAyearList');
                      resolve(response)
                    })
                    .catch(error=>{
                      console.log('****');
                        reject(error)
                    })
                })
                .catch(error=>{
                  console.log('****');
                    reject(error)
                })
            }
      })
      .catch(error=>{
        console.log('*****',error);
        reject(error)
      })
      })
    },
    updateAyearDetail({commit,dispatch,rootState},detail){
      return new Promise((resolve,reject)=>{
        apiObject.put('/Akarniyears',detail).then(response=>{
          dispatch('fetchAyearList');
          resolve(response)
        })
        .catch(error=>{
          console.log('*****',error);
          reject(error)
        })
      })

    },
    fetchAyearList({commit,rootState}){
      const url1='/Akarniyears'
      apiObject.get(url1).then(response=>{
        commit('SET_AYEARLIST',response.data);
      }).catch(error=>{
        console.log('****',error);
      })
    },


    removeAyearDetail({commit,dispatch},dt){
      return new Promise((resolve,reject)=>{
        apiObject.delete('/Akarniyears/'+dt.id).then(response=>{
          apiObject.delete('/properties/removePropertyForAyear/'+dt.fAyear)
              .then(rr=>{
                apiObject.delete('/TaxDetails/removeTaxDetailForAyear/'+dt.fAyear)
                  .then(rr=>{
                    dispatch('fetchAyearList');
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log('****');
                      reject(error)
                  })
              })
              .catch(error=>{
                console.log('****');
                  reject(error)
              })
      })
      .catch(error=>{
        console.log('*****',error);
        reject(error)
      })
      })
      // return new Promise((resolve,reject)=>{
      // apiObject.delete('/Akarniyears/'+id).then(response=>{
      //   dispatch('fetchAyearList');
      //   resolve(response)
      // })
      // .catch(error=>{
      //   console.log('*****',error);
      //   reject(error)
      // })
    // });
    }
  }
};
export default AyearStore;
