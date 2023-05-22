<template>
  <div class="home d-flex flex-column">
    <div class="top">
      <v-img class="img" :src="imgUrl"
        alt="">
        <img class="back mt-5 ml-6" src="@/assets/return.png" @click="backPage" alt="" />
      </v-img>
    </div>
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="d-flex flex-row justify-space-between align-center">
        <div class="title">Cross-chain transfer</div>
        <img class="histroy" src="@/assets/icon_history.png" alt="">
      </div>
      <div class="crosslist mt-9 d-flex flex-row align-center">
        <div class="left d-flex flex-column align-center">
          <div class="From mt-3">From</div>
          <div class="chainName mt-5">Uptick Network</div>
          <img src="@/assets/uptick network_icon.png" alt="">
        </div>
        <img class="rightImg ml-3 mr-3" src="@/assets/icon_r.png" alt="">
        <div class="left d-flex flex-column align-center">
          <div class="From mt-3">To</div>
          <div class="chainName mt-5">IRISnet</div>
          <img src="@/assets/irisnet_icon.png" alt="">
        </div>
      </div>

      <button class="CrossChain mt-8" @click="submitButton"> Submit </button>
      <uComponents ref="ucom"></uComponents>

    </div>



  </div>
</template>

<script>
import { keplrKeystoreChange } from "../../keplr/index";
import { uptick2Iris, iris2Uptick } from "/src/keplr/uptick/wallet"
import { requestTranserNFT } from "/src/api/home"

export default {
  name: "cardDetail",
  components: {},
  data() {
    return {
      imgUrl: "",
      name: ""
    };
  },
  mounted() {
    window.addEventListener("keplr_keystorechange", keplrKeystoreChange);

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
    async submitButton() {

      let nftId = this.$route.params.nftId
      let denomId = this.$route.params.nftAddress
      console.log(this.$route.params)
      try {

        if (this.$store.state.chainType == "uptick_7000-1") {
          await uptick2Iris(denomId, nftId)
        }

        if (this.$store.state.chainType == "gon-irishub-1") {
          await iris2Uptick(denomId, nftId)
        }

        //链上转送完成，调用接口
        let params = {}
        params.nftAddress = denomId
        params.nftId = nftId
        params.status = 1
        let transferResult = await requestTranserNFT(params)
        //链上转送完成，调用接口
        console.log(transferResult)
        this.$toast("success", "Cross Success")
        this.$router.push('/home')
      } catch (error) {
        console.log(error)
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
    font-family: "AmpleSoft-Bold";
    font-size: 25px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #fb599b;
  }

  .histroy {
    width: 21px;
    height: 25px;
  }

  .CrossChain {
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
  }

  .crosslist {
    img {
      margin-top: 20px;
      width: 74px;
      height: 74px;
    }

    .rightImg {
      width: 25px;
      height: 17px;
    }

    .left {
      width: 140px;
      height: 180px;
      background-color: #32154d;
      border-radius: 5px;
      font-family: "AmpleSoft";
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 20px;
      letter-spacing: 0px;

      .From {
        color: #fb599b;
      }

      .chainName {
        color: #ffffff;
      }

    }

  }
}
</style>