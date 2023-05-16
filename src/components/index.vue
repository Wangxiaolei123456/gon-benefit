<template>
  <div class="hello">
      <button @click="addnetwork">添加IRIS</button>

  </div>
</template>

<script>
import {initWallet  } from "../keplr/index";
export default {
  name: 'HelloWorld',
  mounted(){

  },
  methods:{
    addnetwork(){
      initWallet();
      this.$router.push({name:'Test'})
    }
}
  
 
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
