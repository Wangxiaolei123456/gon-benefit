<template>
  <div class="Home">
    <div class="top">
      <div class="title pt-7">UniCard</div>
      <div class="infos d-flex flex-row align-center ml-6">
        <div class="avata">
          <!-- <v-avatar  size="75">
              <img class="img"  :src="src" alt="avatar" />
          </v-avatar> -->
          <div class="profileBorder">
            <img class="img" :src="src" alt="avatar" @click="EditInfo" />
          </div>
        </div>
        <div class="ml-4">
          <div class="name" @click="EditInfo">{{ userName }}</div>
          <div class="address">{{ userAddress | namefilter }}</div>
        </div>
        <div class="qrcode">
          <img src="@/assets/qrcode.png" alt="" @click="clickCode" />
        </div>
      </div>
    </div>
    <div class="select d-flex  mt-5 ml-5">
      <button class="chain" @click="showChain">
        {{ getChainNameFromId(selectChain) }}
      </button>
      <!-- <button class="Filter ml-3" @click="showFilter">
        {{ filterList[filterIndex].text }}
      </button> -->
      <button class="create ml-8" @click="Create">Create</button>
      <img src="@/assets/refresh.png" v-if="canClick" style="width: 30px; height: 30px;" alt="" @click="Reload" />
      <div class="second" v-if="!canClick">{{ second }}</div>
      <div class="chainList" v-if="isShowChainList">
        <div class="list" v-for="(item, index) in chainList" :key="index">
          <div class="name" @click="clickChain(index)">{{ item.text }}</div>
        </div>
      </div>
      <!-- <div class="FilterList" v-if="isShowFilterList">
        <div class="list" v-for="(item, index) in filterList" :key="index">
          <div class="name" @click="clickFilter(index)">{{ item.text }}</div>
        </div>
      </div> -->
    </div>
    <div class="Cardlist mt-5 ml-6 mr-6" v-if="list.length > 0">
      <div class="listitem mb-5" v-for="(item, index) in list" :key="index">
        <Card :imgUrl="item.imgUrl" :name="item.name" :NFTInfo="item" />
      </div>
    </div>
    <div v-else class="empty">Empty</div>
    <loading :isShowLoading="isShowLoading"></loading>
  </div>
</template>

<script>
import Card from "../workCard/card";
import { uploadImage } from "../../api/image";
import { getIirsAccoutInfo } from "/src/keplr/iris/wallet";
import { getAccountInfo } from "/src/keplr/uptick/wallet";
import { getMyCardList, createInfo, getUserInfo, updateUser } from "@/api/home";
import Loading from "@/components/loading.vue";
import { keplrKeystoreChange } from "../../keplr/index";
import { getNftImg } from "/src/api/image";

export default {
  name: "Home",
  components: { Card, Loading },
  data() {
    return {
      isShowLoading: false,
      Marketlist: [
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small",
        },
      ],
      chainList: [
        {
          text: "Uptick Network",
          id: 0,
          chianId: "uptick_117-1",
        },
        {
          text: "IRISnet",
          id: 1,
          chianId: "irishub-1",
        },
      ],
      filterList: [
        {
          text: "All",
          id: 0,
        },
        {
          text: "My Creations",
          id: 1,
        },
        {
          text: "Received",
          id: 2,
        },
      ],
      chainIndex: 0,
      filterIndex: 0,
      isShowChainList: false,
      isShowFilterList: false,
      src: "",
      userName: "",
      userAddress: "",
      irisAddress: "",
      uptickAddress: "",
      list: [],
      selectChain: "uptick_117-1",
      canClick: true,
      second: 10,
      timer: null,
    };
  },
  filters: {
    namefilter: function (value) {
      if (value && value.length > 12) {
        return value.substr(0, 12) + "..." + value.substr(-12);
      } else {
        return value;
      }
    },
  },
  async mounted() {

    window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
    console.log("sssssssss", window.keplr, this.$store.state.chainType);
    window.addEventListener("scroll", this.scrolling);

    let uptickAccountInfo = await getAccountInfo();
    let irisAccountInfo = await getIirsAccoutInfo();

    if (!this.$store.state.chainType) {
      this.$store.commit("SET_CHAIN", this.chainList[0].chianId);
    } else {
      if (this.$store.state.chainType == "uptick_117-1") {
        this.selectChain = "uptick_117-1";
        this.userName = uptickAccountInfo.name;
        this.userAddress = uptickAccountInfo.bech32Address;
        localStorage.setItem("userInfo", JSON.stringify(uptickAccountInfo));
      }

      if (this.$store.state.chainType == "irishub-1") {
        this.selectChain = "irishub-1";
        this.userName = irisAccountInfo.name;
        this.userAddress = irisAccountInfo.address;
        localStorage.setItem("userInfo", JSON.stringify(irisAccountInfo));
      }
      this.uptickAddress = uptickAccountInfo.bech32Address
      this.irisAddress = irisAccountInfo.address

    }

    // 查询用户信息
    let InfoParams = {
      address: this.userAddress,
    };

    let infoResult = await getUserInfo(InfoParams);

    console.log("sssss", infoResult);
    debugger;
    if (infoResult.data.code == 1) {
      // 注册账户
      let createParams = {
        name: this.userName,
        address: this.irisAddress,
        uptickAddress: this.uptickAddress,
        photo: "",
      };
      let result = await createInfo(createParams);
      this.src = getNftImg("Qme2yTuaJXxKgXrjnwU8SgjGq5Vxpf1PPBVKLxVxAAETkH");
    } else {
      this.userName = infoResult.data.obj.name;
      if (infoResult.data.obj.photo) {
        this.src = infoResult.data.obj.photo;
      } else {
        this.src = getNftImg("Qme2yTuaJXxKgXrjnwU8SgjGq5Vxpf1PPBVKLxVxAAETkH");
      }
    }

    // 获取列表
    await this.getMyList(this.selectChain);
  },
  methods: {
    getChainNameFromId(id) {
      for (let index = 0; index < this.chainList.length; index++) {
        if (id == this.chainList[index].chianId) {
          return this.chainList[index].text;
        }
      }
    },
    EditInfo() {
      this.$router.push({ name: "Profile", params: { name: this.userName } });
    },
    clickCode() {
      this.$router.push({ name: "receiveCode" });
    },
    keplrKeystoreChange() {
      keplrKeystoreChange();
    },
    async getMyList(selectChain) {
      console.log(selectChain)
      this.isShowLoading = true;
      let params = {
        //this.$store.state.uptickAddress,this.$store.state.IrisAddress
        owner:
          selectChain == "uptick_117-1"
            ? this.$store.state.UptickAddress
            : this.$store.state.IrisAddress,
        chainType: this.selectChain,
        // type:this.filterList[this.filterIndex].id
      };

      let listInfo = await getMyCardList(
        params,
        this.filterList[this.filterIndex].id
      );
      this.list = listInfo.data.list;
      this.isShowLoading = false;
      console.log("ssss", this.list);
    },
    async Reload() {
      if (!this.canClick) {
        return;
      }
      this.canClick = false;
      this.timer = setInterval(async () => {
        this.second--;
        if (this.second === 0) {
          clearInterval(this.timer);
          this.canClick = true;
          this.second = 10;
          await this.getMyList(this.selectChain);
        }
      }, 1000);

      let params = {
        //this.$store.state.uptickAddress,this.$store.state.IrisAddress
        owner:
          this.selectChain == "uptick_117-1"
            ? this.$store.state.UptickAddress
            : this.$store.state.IrisAddress,
      };
      let result = await updateUser(params)
      console.log(result)
      debugger
    },
    scrolling() {
      // 滚动条距文档顶部的距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 滚动条滚动的距离
      let scrollStep = scrollTop - this.oldScrollTop;

      // 更新——滚动前，滚动条距文档顶部的距离
      this.oldScrollTop = scrollTop;

      //变量windowHeight是可视区的高度
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        console.log("header  你已经到底部了");
      }
      //   if (scrollStep < 0) {
      //     console.log("header 滚动条向上滚动了！");
      //   } else {
      //     console.log("header  滚动条向下滚动了！");
      //   }
      //   // 判断是否到了最顶部
      //   if (scrollTop <= 0) {
      //     console.log("header 到了最顶部")
      //   }
    },
    Create() {
      this.$router.push({ name: "createNFT" });
    },

    clickChain(index) {
      localStorage.setItem("setChain", this.chainList[index].chianId);
      this.selectChain = this.chainList[index].chianId;

      if (this.selectChain == "uptick_117-1") {
        this.userAddress = this.$store.state.UptickAddress
      }

      if (this.selectChain == "irishub-1") {
        this.userAddress = this.$store.state.IrisAddress
      }

      this.$store.commit("SET_CHAIN", this.chainList[index].chianId);
      this.chainIndex = index;
      this.isShowChainList = false;
      this.list = [];
      this.getMyList(this.chainList[index].chianId);
    },
    clickFilter(index) {
      this.list = [];
      this.filterIndex = index;
      this.isShowFilterList = false;
      this.getMyList(this.chainList[this.chainIndex].chianId);
    },
    showChain() {
      this.isShowChainList = !this.isShowChainList;
    },
    showFilter() {
      this.isShowFilterList = !this.isShowFilterList;
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.top {
  width: 100%;
  height: 200px;
  background-color: #fb599b;
  border-radius: 10px 10px 0px 45px;

  .title {
    text-align: center;
    font-family: "AmpleSoft-Bold" !important;
    font-size: 31px !important;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .infos {
    margin-top: 30px;

    .avata {
      .img {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        // border: 5px solid #9e00ff;
        object-fit: cover;
        cursor: pointer;
        //       border-image: linear-gradient(to right, #ff7700, #ff0099);
        // border-image-slice: 1;
      }
    }


    .profileBorder {
      // margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 85px;
      height: 85px;
      background: linear-gradient(141deg, #ff37b6 0%, #9e00ff 100%);
      border-radius: 50%;
    }


    .name {
      cursor: pointer;
      font-family: "AmpleSoft-Bold" !important;
      font-size: 25px !important;
      font-weight: normal;
      font-stretch: normal;
      line-height: 25px;
      letter-spacing: 0px;
      color: #ffffff;
      padding-right: 10px;
      // background-color: #611ecd;
      width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .address {
      cursor: pointer;
      font-family: "AmpleSoft" !important;
      font-size: 15px !important;
      font-weight: normal;
      font-stretch: normal;
      line-height: 20px;
      letter-spacing: 0px;
      color: #ffffff;
    }

    .qrcode {
      img {
        width: 20px;
        height: 20px;
        margin-top: 20px;
        margin-left: 30px;
      }
    }
  }
}

.select {
  position: relative;
  // width: 100%;
  // background-color: #611ecd;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-right: 20px;

  .chain {
    width: 135px;
    height: 26px;
    background-color: #611ecd;
    border-radius: 13px;
    text-align: center;
    font-family: "AmpleSoft" !important;
    font-size: 15px !important;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #fb599b;
  }

  .chainList {
    position: absolute;
    top: 30px;
    left: 10px;
    width: 140px;
    height: 115px;
    background-color: #611ecd;
    border-radius: 5px;
    z-index: 200;

    .list {
      margin: 30px 0px 33px 20px;

      .name {
        cursor: pointer;
        font-family: "AmpleSoft" !important;
        font-size: 15px !important;
        font-weight: normal;
        font-stretch: normal;
        line-height: 15px;
        letter-spacing: 0px;
        color: #fb599b;
      }
    }
  }

  .Filter {
    min-width: 75px;
    padding-left: 8px;
    padding-right: 8px;
    height: 26px;
    background-color: #611ecd;
    border-radius: 13px;
    text-align: center;
    font-family: "AmpleSoft" !important;
    font-size: 15px !important;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #fb599b;
  }

  .FilterList {
    position: absolute;
    top: 28px;
    left: 150px;
    width: 140px;
    height: 155px;
    background-color: #611ecd;
    border-radius: 5px;
    z-index: 200;

    .list {
      margin: 30px 0px 33px 20px;

      .name {
        cursor: pointer;
        font-family: "AmpleSoft" !important;
        font-size: 15px !important;
        font-weight: normal;
        font-stretch: normal;
        line-height: 15px;
        letter-spacing: 0px;
        color: #fb599b;
      }
    }
  }

  .create {
    width: 76px;
    height: 26px;
    background-color: #fb599b;
    border-radius: 13px;
    font-family: "AmpleSoft" !important;
    font-size: 15px !important;
    font-weight: normal;
    font-stretch: normal;
    line-height: 15px;
    letter-spacing: 0px;
    color: #ffffff;
  }
}

.Cardlist {
  height: 545px;
  overflow-y: auto;
}

.empty {
  height: 545px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "AmpleSoft" !important;
  color: #ffffff;
}

.second {
  padding-top: 5px;
  background-color: #611ecd;
  color: #fb599b;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  font-family: "AmpleSoft" !important;
   font-size: 15px !important;

}

::-webkit-scrollbar {
  display: none;
}</style>
