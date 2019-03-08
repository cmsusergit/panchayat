<template>
  <aside class="menu">

    <ul class="menu-list">
      <li><router-link to='/'>હોમ</router-link></li>

      <li><router-link :to="{ name: 'Taxation'}">વેરા નાખો</router-link></li>
      <li><router-link :to="{ name: 'TaxCollection'}">વેરાની વસુલાત</router-link></li>
      <li><router-link to='/assesment'>મિલ્કતની વિગત</router-link></li>
      <li><a>આકારણી રજીસ્ટર</a></li>
      <li><a>રિપોર્ટ્સ/અહેવાલ</a></li>
      <li>
        <router-link to="/login" v-if="!loggedin">પ્રવેશ/લૉગ ઇન</router-link>
        <router-link to="/logout" v-else>બહાર/લૉગઆઉટ</router-link>
      </li>
  </ul>

        <!--
      <ul>
      </li>
      <li>
        <a>બી.પી.એલ.</a>
      </li>
      <li>
        <a>અન્ય ઉપયોગી</a>
      </li>
      <li>
        <a>મદદ</a>
      </li>
    </ul> -->
  </aside>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'Sidebar',
  data(){
    return {
      title:"ગ્રામ પંચાયત સોફ્ટવેર"
    }
  },
  computed:
    mapState(['loggedin'])
}
</script>

<style>
.boxv{
  background-color: #f8f8ee;
  color:#424250;
}
</style>
