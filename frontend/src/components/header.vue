<template>
  <div class="is-radiusless box boxv level" style="text-align:center">

    <figure class="image is-128x128 level-left">
      <img src="../assets/logo.gif" alt="">
    </figure>
    <h1 class="is-size-2 level-item">
      {{title}}
    </h1>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data(){
    return {

      title:"ગ્રામ પંચાયત સોફ્ટવેર"
    }
  }
}
</script>

<style>
.boxv{
  background-color: #f8f8ee;
  color:#424250;
}
</style>
