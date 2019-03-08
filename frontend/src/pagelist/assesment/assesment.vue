<template>
  <div class="">

    <div class="level is-radiusless box">
      <h1 class="level-item-left subtitle">
        મિલ્કતનુ લિસ્ટ
      </h1>
      <router-link :to="{ name: 'AddAssesment'}" class="button is-success">મિલ્કત ઉમેરો</router-link>
  </div>

    <div class="is-radiusless box">
      <b-table :data="propertyList">
        <template slot-scope="props">
            <b-table-column field="id" label="અનુક્રમ નં." width="40" numeric>
                {{ props.row.id }}
            </b-table-column>
            <b-table-column field="societyname" label="મહોલ્લાનું નામ">
              {{props.row.societyname}}
            </b-table-column>
            <b-table-column field="ownername" label="માલિકનુ નામ">
              {{props.row.ownername}}
            </b-table-column>
            <b-table-column field="lessername" label="કબ્જેદારનુ નામ">
              {{props.row.lessername}}
            </b-table-column>
            <b-table-column field="propertyid" label="મિલકત ક્રમ.">
              {{props.row.propertyid}}
            </b-table-column>
            <b-table-column field="propertydesc" label="મિલકતનું વર્ણન">
              {{props.row.proprtydesc}}
            </b-table-column>
            <b-table-column label="સંચાલન">
              <button class="button is-warning">
                <b-icon
                pack="fas"
                icon="edit"
                size="is-small">
              </b-icon>
            </button>
              <button class="button is-danger">
                <b-icon
                pack="fas"
                icon="trash"
                size="is-small"></b-icon></button>
            </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>


<script>
export default {
       data() {
           const data = [
               { 'id': 1, 'societyname': 'Jesse', 'ownername': 'Simmons', 'lessername': 'test1','propertyid':'1/1','proprtydesc': 'test1' },
               { 'id': 2, 'societyname': 'John', 'ownername': 'Jacobs', 'lessername': 'test1','propertyid':'1/2', 'proprtydesc': 'test1' },
            ];
           return {
             propertyList:data
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
