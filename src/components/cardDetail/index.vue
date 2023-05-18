<template>
  <div class="home d-flex flex-column align-center">
    <div class="top">
      <v-img
        class="img"
        src="https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small"
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
      <div class="name">Macaron membership card｜- Macaronhome</div>
      <div class="des">
        Macaronhome Macaron Dessert House in France Enjoy a 50% discount and
        priority purchase right when holding a membership card at the store
        Address: Beside the escalator at the exit of Baijia TASTE Supermarket,
        B1/F, Zhengjia Square, No. 228 Tianhe Road, Tianhe District Service
        hours: 10:00-22:00 Introduction to Macaron Home France's Macaron Dessert
        Restaurant (Zhengjia Plaza Store): Relax and take a break, you can swipe
        your card, have wireless internet access, have a meal with friends, and
        it's a time-honored brand. Feel free to eat and drink"
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
export default {
  name: "cardDetail",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    backPage() {
      this.$router.go(-1);
    },
    toCross(){
      this.$router.push({name:'crossChain'})
    },
    toTransfer(){
      this.$router.push({name:'transfer'})
    }
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