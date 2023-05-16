<template>
    <v-app>
      
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
.main{
    background-image: url('../assets/image_bg.jpg');
}
   
.content{
    width: 500px;
    height: 600px;
    border: 1px solid red;
    margin-top: 50px;
    padding: 0px !important;
    position: relative;

}

   
</style>


