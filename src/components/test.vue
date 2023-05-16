<template>
  <div class="test">
    <div class="text">text </div>

  </div>
</template>

<script>
import {initWallet  } from "../keplr/index";
export default {
  name: 'MyTest',
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='scss' scoped>
    .test{
       height: 600px;
       border: 1px solid greenyellow;

       .text{
           width: 100%;
           height: 100px;
           background: hotpink;
           color:blue;
           position: absolute;
           bottom: 0px;
       }
    }
</style>
