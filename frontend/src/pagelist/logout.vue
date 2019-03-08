<script>
  import { mapState, mapActions } from "vuex";

  export default {
      name: "Login",
      computed: mapState(["loggedin"]),
      created(){
        if(this.loggedin){
          this.logout();
          this.$router.push('/');
        }
      },
      methods:{
        ...mapActions(['logout'])//....
      }
  }
</script>
