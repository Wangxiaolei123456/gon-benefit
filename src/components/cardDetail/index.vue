<template>
  <div class="home d-flex flex-column align-center">
    <div class="top">
      <v-img class="img" :src="Src" alt="">
        <img class="back mt-5 ml-6" src="@/assets/return.png" @click="backPage" alt="" />
      </v-img>
    </div>
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="des" v-html="desValue">
      
      </div>
    </div>
    <button class="Transfer mt-8" @click="toTransfer">Transfer</button>
    <button class="CrossChain mt-8" @click="toCross">
      Cross-chain transfer
      <img class="icon" :src="chainIcon" alt="" />
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

      desValue: '',
      name: '',
      Src: '',
      resResult: {},
      chainIcon: require('@/assets/uptick network_icon.png')
    };
  },
  mounted() {
    console.log(
      "wxl -- 222",
      this.$route.query.nftAddress,
      this.$route.query.nftId,
      this.$route.query.owner
    );
    this.cardDetail();
    window.addEventListener("keplr_keystorechange", keplrKeystoreChange);

    if (this.$store.state.chainType == "uptick_117-1") {
      this.chainIcon = require('@/assets/uptick network_icon.png')
    }

    if (this.$store.state.chainType == "irishub-1") {
      this.chainIcon = require('@/assets/irisnet_icon.png')
    }
  },
  methods: {
    // 获取卡详情


    async cardDetail() {
      let params = {
        chainType: this.$store.state.chainType,
        nftAddress: this.$route.query.nftAddress,
        nftId: this.$route.query.nftId,
        owner: this.$route.query.owner,
      };
      let res = await cardDetail(params);
      this.name = res.data.obj.name;
      this.desValue = res.data.obj.description;
        this.desValue =  this.desValue.replace(
        /\n/g,
        "<br/>"
      ); 
      this.Src = res.data.obj.imgUrl;
      this.resResult = res.data.obj;
    },
    backPage() {
      this.$router.go(-1);
    },
    toCross() {
      // this.$router.push({name:'crossChain'})
      this.$router.push({ name: 'crossChain', params: this.resResult });

    },

    toTransfer() {
      // this.$router.push({name:'transfer'})
      this.$router.push({ name: 'transfer', params: this.resResult });

    },
    keplrKeystoreChange() {
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
  overflow: auto;
  height: 350px;

  .name {
    width: 326px;
    font-family: "AmpleSoft-Bold";
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .des {
    width: 326px;
    font-family: " AmpleSoft";
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #ffffff;
    word-wrap: break-word;
  }
}

.Transfer {
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

  .icon {
    position: absolute;
    right: 14px;
    top: 7px;
    width: 26px;
    height: 26px;
  }
}

::-webkit-scrollbar {
  display: none;
}</style>