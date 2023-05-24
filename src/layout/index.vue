<template>
    <v-app class="top">
        <div class="header d-flex flex-rw">
            <img class="logo" src="@/assets/logo.png" alt="">
            <div class="title ml-4">UniCard</div>
        </div>

        <v-main class="main">
            <v-container :id="containerId" class="content">
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
    data: function () {
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
.top {
    background-image: url('../assets/image_bg.jpg');
    background-repeat: no-repeat;
    background-size: 150px 80px;
    background-size: 100% 100%;
    background-attachment: fixed;
}

.header {
    margin: auto;
    margin-top: 50px;
    margin-bottom: 30px;
    align-items: center;

    .title {
        font-family: "AmpleSoft-Bold" !important;
        color: #ffffff;
        font-size: 47px !important;
    }

    .logo {
        width: 59px;
        height: 59px;
    }
}

.content {
    width: 380px;
    // height: 90%;
    height: 820px;
    box-shadow: 0px 7px 35px 6px rgba(25, 0, 133, 0.72);
    border-radius: 10px;
    padding: 0px !important;
    position: relative;
    background: #00043a;
    margin-bottom: 50px;


}
</style>


