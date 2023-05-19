<template>
  <div class="home d-flex flex-column align-center">
    <div class="top">
      <v-img
        class="img"
        :src="Src"
        alt=""
      >
        <img
          class="back mt-5 ml-6"
          src="@/assets/return.png"
          @click="backPage"
          alt=""
        />
      </v-img>
    </div>
    <div class="content">
      <div class="name">{{name}}</div>
      <div class="des">
       {{desValue}}
      </div>
    </div>
    <button class="Transfer mt-8" @click="toTransfer"> Transfer</button>
     <button class="CrossChain mt-8" @click="toCross"> Cross-chain transfer 
        <img
          class="icon"
          src="@/assets/uptick network_icon.png"
       
          alt=""
        /> 
     </button>
  </div>
</template>

<script>
import { cardDetail } from "../../api/home";
import { keplrKeystoreChange } from "../../keplr/index";
export default {
  name: "cardDetail",
  components: {},
  data() {
    return {
      desValue:'',
      name:'',
      Src:''
    };
  },
  mounted(){
    console.log("wxl -- 222",this.$route.query.nftAddress,this.$route.query.nftId,this.$route.query.owner);
    this.cardDetail();
      window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
  },
  methods: {
    // 获取卡详情
   
  async  cardDetail(){
      let params = {
        chainType:"uptick_7000-1",
        nftAddress:this.$route.query.nftAddress,
        nftId:this.$route.query.nftId,
        owner:this.$route.query.owner
      }
     let res = await cardDetail(params)
     this.name = res.data.obj.name
     this.desValue = res.data.obj.description
     this.Src = res.data.obj.imgUrl


    },
    backPage() {
      this.$router.go(-1);
    },
    toCross(){
      this.$router.push({name:'crossChain'})
    },
    toTransfer(){
      this.$router.push({name:'transfer'})
    },
    keplrKeystoreChange(){
        keplrKeystoreChange();
    },

  },
};
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 254px;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .back {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
}
.content {
  margin: 24px 25px 0 26px;
  .name {
    font-family: "AmpleSoft-Bold";
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 70px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .des{
      font-family:" AmpleSoft";
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 20px;
	letter-spacing: 0px;
	color: #ffffff;
  }
}
.Transfer{
    width: 326px;
	height: 40px;
	background-color: #611ecd;
    border-radius: 20px;
    font-family: "AmpleSoft-Bold";
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 15px;
	letter-spacing: 0px;
	color: #fb599b;
}
.CrossChain{
    position: relative;
     width: 326px;
	height: 40px;
	background-color: #fb599b;
    border-radius: 20px;
    font-family: "AmpleSoft-Bold";
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 15px;
	letter-spacing: 0px;
    color: #ffffff;
    .icon{
        position: absolute;
        right: 14px;
        top: 7px;
        width: 26px;
        height: 26px;
    }

}
</style>