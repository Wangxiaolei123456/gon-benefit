<template>
    <div class="work d-flex flex-column  align-center">
        <div class="top">
              <div class="title pt-7">Equity NFT</div>
        </div>
        <div class="icon">
            <img src="@/assets/icon_wallet.png" alt="icon">
        </div>
        <button class="btn" @click="connectWallet">Connect Wallet </button>
     
        </div>
    
</template>
<script>

import { getkeplrIrisAddress,getkeplrUptickAddress,initWallet } from "../../keplr/index";


export default {
  name: "Work",
  inheritAttrs: false,
  props: {
      src:String
   
  },
  data: () => ({
   
   
    
  }),
  watch: {
   
  },
 async mounted(){
   await  initWallet();
    console.log("ssssss",this.$store.state.UptickAddress,this.$store.state.IrisAddress);
    let info = localStorage.getItem('userInfo')
    if(info){
        this.$router.push({name:'Home'})
    }
    
  },
  methods: {
     async connectWallet(){
         // Iris Address
         let account = await getkeplrIrisAddress();
        this.$store.commit("SET_DID", account.toLowerCase());
          
         // uptick Address
         let uptickAccount = await getkeplrUptickAddress();
         this.$store.commit("SET_UPTICK_DID", uptickAccount.toLowerCase());
         if(account && uptickAccount){
             
             this.$router.push({name:'Home'})
         }

      }
    
  },
};
</script>
<style lang="scss" scoped>
.work{
    .top{
            width: 100%;
            height: 200px;
            background-color: #fb599b;
            border-radius: 0px 0px 0px 45px;
        .title{
            text-align: center;
            font-family: "AmpleSoft-Bold" !important;
            font-size: 31px !important;
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #ffffff;
        }
       

    }
    .icon{
        margin-top: 50px;
        img{
            width: 135px;
            height: 135px;
        }
    }
    .btn{
        margin-top: 40px;
        width: 325px;
        height: 41px;
        background-color: #fb599b;
        border-radius: 20px;
        font-family: "AmpleSoft-Bold";
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
    }
}
</style>