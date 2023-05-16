<template>
    <v-app>
        <div class="header d-flex flex-rw">
            <img  class="logo" src="@/assets/logo.png" alt="">
             <div class="title ml-4">Equity Nft</div>
        </div>
       
        <v-main class="main">
            <v-container :id="containerId" class="content" >
                <router-view :key="key"></router-view>
            </v-container>
        </v-main>
     
    </v-app>
</template>

<script>
    export default {
        name: 'MyLayout',
        components: {
         
        },
        data: function() {
            return {
                drawerOpened: false,
                containerId: 'container'
            };
        },
        
        computed: {
            key() {
                return this.$route.name !== undefined ?
                    this.$route.name + new Date() :
                    this.$route + new Date();
            },
            
        },
       
    };
</script>

<style lang="scss" scoped>
// .main{
//     background-image: url('../assets/image_bg.jpg');
// }
.header{
    margin: auto;
      margin-top: 100px;
      margin-bottom: 30px;
      align-items: center;
      .title{
          font-family: "AmpleSoft-Bold" !important;
      }
      .logo{
          width: 20px;
          height: 20px;
      }
}
   
.content{
    width: 380px;
    height: 820px;
    border: 1px solid red;
    padding: 0px !important;
    position: relative;

}

   
</style>


