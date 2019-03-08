<template>
  <div class="hello section">
    <button @click="insert" class="button is-primary">Add Student</button>
    <button @click="reportOpen" class="button is-primary">રિપોર્ટ</button>
    <br><br>
    <br><br>
    <b-table :data="studentDt"
          :bordered="true"
          :paginated="true"
            :per-page="10"
    >
         <template slot-scope="props">
                <b-table-column field="id" label="ID" width="40" numeric sortable>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="name" label="Name" sortable>
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="dept" label="Dept">
                    {{ props.row.dept }}
                </b-table-column>
                <b-table-column field="address" label="Address">
                    {{ props.row.address }}
                </b-table-column>
                <b-table-column field="phone" label="Contact">
                    {{ props.row.phone }}
                </b-table-column>
                <b-table-column field="bdate" label="Date" centered >
                    <span class="tag is-success">
                        {{ new Date(props.row.bdate).toLocaleDateString() }}
                    </span>
                </b-table-column>
                <b-table-column  label="Edit" centered>
                    <button @click="edit(props.row.id)" class="button is-link">Edit</button>
                </b-table-column>
                <b-table-column label="Remove" centered>
                    <button @click="remove(props.row.id)" class="button">X</button>
                </b-table-column>
            </template>
    </b-table>
    <b-modal :active.sync='reportPanelOpen'>
      <div class="box-is-radiusless has-background-white" id="dttable">
        <h1 class="box is-radiusless has-background-info has-text-white is-size-2">
            {{reportmesg}}
        </h1>
        <b-table class="box is-radiusless" :data="studentDt"
              :bordered="true">
             <template slot-scope="props">
                    <b-table-column field="id" label="ID" width="40" numeric sortable>
                        {{ props.row.id }}
                    </b-table-column>
                    <b-table-column field="name" label="Name" sortable>
                        {{ props.row.name }}
                    </b-table-column>
                    <b-table-column field="dept" label="Dept">
                        {{ props.row.dept }}
                    </b-table-column>
                    <b-table-column field="address" label="Address">
                        {{ props.row.address }}
                    </b-table-column>
                    <b-table-column field="phone" label="Contact">
                        {{ props.row.phone }}
                    </b-table-column>
                    <b-table-column class="gujfont" field="bdate" label="Date" centered>
                        <span class="tag is-success">
                            {{ new Date(props.row.bdate).toLocaleDateString() }}
                        </span>
                    </b-table-column>
                </template>
        </b-table>
      </div>
      <br>

      <button @click="reportGenerator" class="button is-pulled-right is-primary">જનરેટ રિપોર્ટ</button>
    </b-modal>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js'
import axios from 'axios'
export default {
  name: 'StudentDetail' ,
  data () {
    return {
      reportmesg:'આકારણી પત્રક - રિપોર્ટ',
      reportPanelOpen:false,
      msg: 'પધારો ગ્રામ પંચાયત સોફ્ટવેર',
      studentDt:[],
    }
  },
  mounted(){
        this.fetchDt();
    },
    methods:{
      insert:function(){
        this.$router.push({path:'/addupdatestudent/0'});
      },
      remove:function(id){
        console.log('****'+id);
        axios.delete('http://localhost:4040/dbapi/Students/'+id).then((result)=>{
             if(result){
               this.$router.go({path:'/'});
             }
           })
      },
      edit:function(id){
        this.$router.push({path:'/addupdatestudent/'+id});
      },
      fetchDt:function(){
        axios.get('http://localhost:4040/dbapi/Students').then((result)=>{
             console.log("****"+JSON.stringify(result.data));
             this.studentDt=result.data;
         }).catch((error)=>{console.log(error);});
      },
      reportGenerator:function(){
        console.log('****');
        var element = document.getElementById('dttable');
        html2pdf(element);
        console.log('****');
      },
      reportOpen:function(){

          this.reportPanelOpen=true;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
    color:blue;
  font-weight: bold;
}

.gujfont{
  font-family:'shruti'
}
.completed{
    color:red;
}
</style>
