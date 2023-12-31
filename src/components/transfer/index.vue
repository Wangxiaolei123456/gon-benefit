<template>
  <div class="home d-flex flex-column align-center">
    <div class="top">
      <v-img class="img" :src="imgUrl" alt="">
        <img class="back mt-5 ml-6" src="@/assets/return.png" @click="backPage" alt="" />
      </v-img>
    </div>
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="title">Transfer</div>


      <div class="receive mt-5" style="text-align: left;">Receive</div>
      <input class="textInput mt-2" type="text" v-model="inputNameText" @input="checkInput">
    </div>

    <button class="Submit mt-8" @click="submitButton"> Submit</button>
    <uComponents ref="ucom"></uComponents>
    <loading :isShowLoading="isShowLoading"></loading>

  </div>
</template>

<script>
import { keplrKeystoreChange } from "../../keplr/index";
import { uptickTransfer } from "/src/keplr/uptick/wallet"
import { transferNft } from "/src/keplr/iris/wallet"
import { requestTranserNFT } from "/src/api/home"
import Loading from "@/components/loading.vue";

export default {
  name: "cardDetail",
  components: { Loading },
  data() {
    return {
      inputNameText: '',
      imgUrl: "",
      name: "",
      isShowLoading: false,

    };
  },
  watch: {
    inputNameText() {
      this.checkInput();
    },
  },
  mounted() {

    window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
    console.log('33333', this.$store.state.IrisAddress, this.$store.state.UptickAddress);
    console.log(this.$route.params)
    this.imgUrl = this.$route.params.imgUrl
    this.name = this.$route.params.name
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


    submitButton() {


      let nftId = this.$route.params.nftId
      let denomId = this.$route.params.nftAddress
      let name = this.$route.params.name
      let recipient = this.inputNameText
      console.log(this.$route.params)
      if (this.$store.state.chainType == "origin_1170-2") {
        if (!recipient.startsWith("uptick")) {
          this.$toast("error", 'Address Format Error')
          return
        }
        this.requestUptickTransfer(nftId, denomId, name, recipient)
      }

      if (this.$store.state.chainType == "nyancat-9") {
        if (!recipient.startsWith("iaa")) {
          this.$toast("error", 'Address Format Error')
          return
        }
        this.requestIrisTransfer(nftId, denomId, name, recipient)
      }
    },

    async requestUptickTransfer(nftId, denomId, name, recipient) {

      try {
        this.isShowLoading = true
        await uptickTransfer(nftId, denomId, name, recipient)

        //链上转送完成，调用接口
        let params = {}
        params.nftAddress = denomId
        params.nftId = nftId
        params.owner = recipient
        let transferResult = await requestTranserNFT(params)
        //链上转送完成，调用接口
        console.log(transferResult)
        this.$toast("success", "Transfer Success")
        this.$router.push('/home')
        this.isShowLoading = false
      } catch (error) {
        console.log(error)
        this.isShowLoading = false
        this.$toast("error", error.message)
      }
    },
    async requestIrisTransfer(nftId, denomId, name, recipient) {

      try {
        this.isShowLoading = true
        let sender = this.$store.state.IrisAddress;
        let recipient = this.inputNameText;
        let tokenId = nftId;
        let fee = 0;
        let adminAddress = "";
        let nftIds = [];
        nftIds.push(tokenId);
        let result = await transferNft(
          nftIds,
          denomId,
          sender,
          recipient,
          fee,
          adminAddress
        );
        console.log(result)
        let params = {}
        params.nftAddress = denomId
        params.nftId = nftId
        params.owner = recipient
        let transferResult = await requestTranserNFT(params)
        //链上转送完成，调用接口
        console.log(transferResult)
        this.$router.push('/home')
        this.isShowLoading = false
      } catch (error) {
        console.log(error)
        this.isShowLoading = false
        this.$toast("error", error.message)
      }
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
    border-radius: 10px 10px 0px 0px;
  }

  .back {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
}

.content {
  margin: 24px 25px 0 26px;
  width: 326px;

  .name {
    font-family: "AmpleSoft-Bold";
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    // line-height: 70px;
    letter-spacing: 0px;
    color: #ffffff;
    word-wrap: break-word;
    padding-bottom: 20px;
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