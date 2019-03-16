import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '@/../static/config.json'
import AyearStore from './ayear.js'
import TaxationStore from './taxation.js'
import PropertyStore from './property.js'
Vue.use(Vuex);
const apiObject=axios.create({
  baseURL:config.db_configuration.baseURL
})
export default new Vuex.Store({
  state: {

    currentAyear:localStorage.getItem("currentAyear")||'',
    ayearList:[],
    loggedin:localStorage.getItem("loggedin")||false,
    server_credential:localStorage.getItem("server_credential")||null
  },
  getters:{
      loggedin:state=>{ return state.loggedin},
      currentAyear:state=>{
        console.log('----',state.currentAyear);
        return state.currentAyear;
      }
  },
  mutations: {
    LOGIN(state) {
      state.loggedin = true;
      state.server_credential=localStorage.getItem("server_credential");
    },
    FETCH_AYEAR_LIST(state,ayearList){
      console.log(JSON.stringify(ayearList));
      state.ayearList=ayearList
    },
    LOGOUT(state) {
      state.loggedin = false;



      state.currentAyear='';
      state.server_credential=null;
    },
    CHANGE_CURR_AYEAR(state,currentAyear){
      state.currentAyear=currentAyear
    }
  },
  actions: {
    login(context, credential) {

      return new Promise((resolve,reject)=>{
        apiObject.post("/Users/login",credential).then(response=>{
        context.commit("LOGIN");
            resolve(response);
        }).catch(error=>{
            console.log('****',error);
            reject(error);
        });
      });
    },
    logout(context) {
      localStorage.clear();
      context.commit("LOGOUT");
    },
    fetchAyearList (context) {
      const url1='/Akarniyears?filter={"fields":{"akarniyear":1}}'
      apiObject.get(url1).then(response=>{
        context.commit("FETCH_AYEAR_LIST",response.data);
      })
    },
changeCurrentAyear(context,currentAyear){



      context.commit("CHANGE_CURR_AYEAR",currentAyear);
}},


  modules:{
    TaxationStore,
    AyearStore,
    PropertyStore
  }
});
