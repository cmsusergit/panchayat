<template>
  <div class="cardv">
    <div style="text-align:center">
      <h1 class="is-size-2">Login/લૉગ ઇન</h1>
    </div>
    <div class="section" style="margin:0 auto;width:50%;">
      <b-field label="Select Year/આકારણી વર્ષ">
           <b-select v-model="currentAyear" @input="ayearChanged" expanded>

             <option v-for="(ayear,indx) in ayearList" :value="ayear.akarniyear" :key="indx">{{ayear.akarniyear}}</option>
           </b-select>
       </b-field>
      <b-field label="User Name/યુઝરનું નામ">
           <b-input v-model="uname"></b-input>
       </b-field>
       <b-field label="Password/પાસવર્ડ">
          <b-input type="password" v-model='upwd'></b-input>
       </b-field>
       <button @click.prevent="loginUser" class="button is-primary is-fullwidth is-outlined">લૉગ ઇન/Login</button>
     </div>
  </div>
</template>
<script>

import { mapState, mapActions } from "vuex";
export default {
    name: "Login",
    data() {
      return {
        uname: "",
        upwd: "",
        currentAyear:'2017'
      };
    },
    computed:
      mapState(["loggedin","ayearList"]),//....
    mounted() {
      if (this.loggedIn) this.logout();
            this.$store.dispatch('fetchAyearList')
    },
    methods:{
        ...mapActions(['login','logout']),//....
        loginUser(){
          console.log('****'+this.uname)
          this.login(
                {
                  "username":this.uname,
                  "password":this.upwd
              }
            ).then(response=>{
              console.log('****',response.data.id);
              localStorage.setItem("loggedin",true);
              localStorage.setItem("server_credential", response.data.id);
              this.$router.push(this.$route.query.redirect||'/');
              this.$toast.open({
                message: 'Successfully LoggedIn/લૉગ ઇન સફળતા',
                duration:5500,
                type: 'is-success',
                position:'is-top'
              });
            })
            .catch(error=>{
              console.log('****',error);
              this.$toast.open({
                message: 'Invalid UserName or Password/ઈનવેલીદ યુઝર નામ અથવા પાસવર્ડ',
                duration:5500,
                type: 'is-danger',
                position:'is-top'
              });
            });
        },
        ayearChanged(){
          this.$store.dispatch('changeCurrentAyear',this.currentAyear);
        }
    }}
</script>
<style>
  .cardv{
    background-color:#eeeeff;
    color:#224444;
  }
</style>
