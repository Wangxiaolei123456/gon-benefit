<template>
  <div class="Home">
    <div class="top">
      <div class="title pt-7">Equity NFT</div>
      <div class="infos d-flex flex-row align-center ml-6">
        <div class="avata">
          <!-- <v-avatar  size="75">
              <img class="img"  :src="src" alt="avatar" />
          </v-avatar> -->
             <img class="img"  :src="src" alt="avatar" />
        </div>
        <div class="ml-4">
          <div class="name">Sina</div>
          <div class="address">uptick7209…der768rw56</div>
        </div>
        <div class="qrcode">
          <img src="@/assets/qrcode.png" alt="">
        </div>
      </div>
     
    </div>
     <div class="select d-flex flex-row mt-5 ml-6">
        <!-- <div class="chain">Uptick Network</div> -->
        <button class="chain" @click="showChain">{{chainList[chainIndex].text}}</button>
         <button class="Filter ml-3" @click="showFilter" >{{filterList[filterIndex].text}}</button>
         <button class="create ml-8" @click="Create">Create</button>
        <div class="chainList" v-if="isShowChainList">
          <div class="list" v-for="(item,index) in chainList " :key='index'>
          <div class="name" @click="clickChain(index)">{{item.text}}</div>

          </div>
         
        </div>
         <div class="FilterList" v-if="isShowFilterList">
          <div class="list" v-for="(item,index) in filterList " :key='index'>
          <div class="name" @click="clickFilter(index)">{{item.text}}</div>
          </div>
         
        </div>
      </div>
      <div class="Cardlist mt-5 ml-6 mr-6">
      <div class="listitem mb-5" v-for="(item,index) in Marketlist" :key="index"   >
       <Card :src ='item.src'/>
    </div>
      </div>
  
  </div>
</template>

<script>
import {initWallet  } from "../keplr/index";
import Card from "./workCard/card";
import {uploadImage} from "../api/image"

export default {
  name: 'Home',
  components:{Card},
  data(){
    return{
       Marketlist:[
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},

      ],
      chainList:[
        {
          text:'Uptick Network',
          id:0
        },
         {
          text:'IRISnet',
          id:1
        },
      ],
       filterList:[
        {
          text:'All',
          id:0
        },
         {
          text:'My Creations',
          id:1
        },
        {
          text:'Received',
          id:2
        },
      ],
      chainIndex:0,
      filterIndex:0,
      isShowChainList:false,
      isShowFilterList:false,
      src:'https://d3i65oqeoaoxhj.cloudfront.net/QmdoDytxTDqse9JCAzkdBmtLfEwG8vbPUaUueVhWpQrs4E/small'
    }

  },
    mounted(){
    console.log('sssssssss', window.keplr);
    debugger
      window.addEventListener("scroll", this.scrolling);
      initWallet();
       
  },
  methods:{

    scrolling() {
      // 滚动条距文档顶部的距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 滚动条滚动的距离
      let scrollStep = scrollTop - this.oldScrollTop;
      console.log("header 滚动距离 ", scrollTop);
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
        //你想做的事情
        console.log("header  你已经到底部了");
      }
      if (scrollStep < 0) {
        console.log("header 滚动条向上滚动了！");
      } else {
        console.log("header  滚动条向下滚动了！");
      }
      // 判断是否到了最顶部
      if (scrollTop <= 0) {
        console.log("header 到了最顶部")
      } 
    },
  Create(){
    this.$router.push({name:'createNFT'})
  },
    addnetwork(){
      initWallet();
      this.$router.push({name:'Test'})
    },
    clickChain(index){
      this.chainIndex = index;
      this.isShowChainList = false;
    },
    clickFilter(index){
      this.filterIndex = index
       this.isShowFilterList =false
    },
    showChain(){
      this.isShowChainList = !this.isShowChainList 
 
    },
    showFilter(){
       this.isShowFilterList = !this.isShowFilterList 
    }
}
  
 
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
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
  .infos{
    margin-top: 30px;
    .avata{
     
     .img{
     width: 75px;
     height: 75px;
      border-radius: 50%;
      border: 5px solid #9e00ff;
      object-fit: cover;
//       border-image: linear-gradient(to right, #ff7700, #ff0099);
// border-image-slice: 1;

       
     }
    }
    .name{
      font-family: "AmpleSoft-Bold" !important;
      font-size: 25px !important;
      font-weight: normal;
      font-stretch: normal;
      line-height: 25px;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .address{
      font-family: "AmpleSoft" !important;
	font-size: 15px !important;
	font-weight: normal;
	font-stretch: normal;
	line-height: 20px;
	letter-spacing: 0px;
	color: #ffffff;
    }
    .qrcode{
      img{
        width: 20px;
        height: 20px;
        margin-top: 20px;
        margin-left: 50px;
      }
    }
  }
 
}
 .select{
     position: relative;
   .chain{
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
   .chainList{
     position: absolute;
     top: 28px;
     width: 140px;
      height: 115px;
      background-color: #611ecd;
      border-radius: 5px;
      z-index: 200;
  .list{
    
    margin: 30px 0px 33px 20px;
   
    .name{
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
   .Filter{
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
   .FilterList{

     position: absolute;
     top: 28px;
     left: 150px;
     width: 140px;
	height: 155px;
	background-color: #611ecd;
  border-radius: 5px;
  z-index: 200;
  .list{
    margin: 30px 0px 33px 20px;
    .name{
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
   .create{
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
  .Cardlist{
    height: 545px;
    overflow-y: auto;
  }
</style>
