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
      <div class="title">Transfer</div>

     
        <div class="receive mt-5" style="text-align: left;">Receive</div>
        <input class="textInput mt-2" type="text" v-model="inputNameText" @input="checkInput">
        </div>
   
    <button class="Submit mt-8" @click="submitButton"> Submit</button>
    <uComponents  ref="ucom"></uComponents>

  </div>
</template>

<script>
import { keplrKeystoreChange } from "../../keplr/index";
import { uptickTransfer } from "/src/keplr/uptick/wallet"

export default {
  name: "cardDetail",
  components: {},
  data() {
    return {
        inputNameText:'uptick1p0rjmkfefpsn0skrjas2zr2p6uzvkr68dh0v7y'

    };
  },
  watch: {
    inputNameText() {
      this.checkInput();
    },
  },
  mounted() {

      window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
      console.log('33333',this.$store.state.IrisAddress,this.$store.state.UptickAddress);
      console.log(this.$route.params)

  },
  methods: {
    keplrKeystoreChange() {
      keplrKeystoreChange();
    },
    backPage() {
      this.$router.go(-1);
    },
    checkInput() {
      this.isInputEmpty = this.inputNameText.trim() === "";
    },
    toCross() {
      this.$router.push({ name: "crossChain" });
    },

    toCross(){
      this.$router.push({name:'crossChain'})
    },
    submitButton() {
      this.requestUptickTransfer()
    },
    async requestUptickTransfer() {
      let nftId = this.$route.params.nftId
      let tokenId = this.$route.params.nftAddress
      let name = this.$route.params.name
      let recipient = this.inputNameText
      console.log(this.$route.params)
      debugger
      try {
        await uptickTransfer(nftId,tokenId,name,recipient)
        //链上转送完成，调用接口


      } catch (error) {
        console.log(error)
        this.$toast("error", error.message)
      }
    },
    irisTransfer() {

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
  .title {
    font-family: " AmpleSoft-Bold" !important;
    font-size: 25px !important;
    font-weight: normal;
    font-stretch: normal;
    line-height: 25px;
    letter-spacing: 0px;
    color: #fb599b;
  }
  .receive {
    text-align: center;
    width: 100%;
    font-family: "AmpleSoft-Bold" !important;
    font-size: 15px !important;
    font-weight: normal;
    font-stretch: normal;
    color: #ffffff;
  }
  .textInput {
    width: 100%;
    padding-left: 10px;
    height: 44px;
    background-image: linear-gradient(#e8daff, #e8daff),
      linear-gradient(#a17ae0, #a17ae0);
    background-blend-mode: normal, normal;
    border-radius: 5px;
  }
}
.Submit {
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
  color: #ffffff;
}
</style>