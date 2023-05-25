<template>
  <div class="container">
    <div class="topView">
      <button class="btn" @click="pushHome"></button>
      <div class="title">Create NFT</div>
    </div>
    <!-- <div class="scrollable">

    </div> -->
    <div class="create">
      <input type="file" accept="image/*" ref="fileInput" style="display:none" @change="uploadFile">
      <!-- <button class="addButton" @click="chooseFile"></button> -->
      <img class="addButton" :src="loadeImageUrl(uploadedImageHash)" @click="chooseFile">
      <div class="suggestedTitle">Suggested proportion 2:1 ( jpg/png/gif )</div>
    </div>
    <div class="name" style="padding-top: 35px;">
      <div style="display: flex; justify-content: space-around;">
        <div class="title" style="text-align: left;">NFT Name</div>
        <div class="title" style="text-align: right;">{{ nameValue.length }}/80</div>
      </div>
      <input class="textInput" type="text" v-model="nameValue" maxlength="80">
    </div>
    <div class="description" style="padding-top: 15px;">
      <div style="display: flex; justify-content: space-around;">
        <div class="title" style="text-align: left;">Description</div>
        <div class="title" style="text-align: right;">{{ descriptionValue.length }}/800</div>
      </div>
      <textarea class="descriptionText" v-model="descriptionValue" maxlength="800"></textarea>
    </div>
    <div class="name" style="padding-top: 15px;">
      <div class="title" style="text-align: left;">Editions</div>
      <input class="textInput" type="text" v-model="amountValue">
    </div>
    <div style="width: 100%;">
      <button class="subBtn" @click="submitButton" :disabled="isInputEmpty">Submit</button>
    </div>
    <loading :isShowLoading="isShowLoading"></loading>
    <uComponents  ref="ucom"></uComponents>
  </div>
</template>
  
<script>
import { getMyBalance, issueDenomAndMint, quiryTx, mintNFT } from "/src/keplr/iris/wallet"
import { getAccountInfo, issueUptickDenomAndMint, uptick2Iris } from "/src/keplr/uptick/wallet"

import { uploadJsonData, requestCreateNFT } from "/src/api/home"
import { uploadImage, getNftImg } from "/src/api/image"
import Loading from "@/components/loading.vue";
import { keplrKeystoreChange } from "../../keplr/index";

export default {
  name: 'HelloWorld',
  components: { Loading },
  data() {
    return {
      nameValue: '',// 初始化输入框的值为空
      descriptionValue: '',
      amountValue: '',
      uploadedImageHash: 'QmPuuSpLdzV4Hz4aJtPUVzxsgnLKPYiqKdYtdTGyLF6Pn5',//默认的图片,
      isInputEmpty: true,
      flag: true,
      isShowLoading: false,
      sender: '',
      metadataUrl: '',
      chainType: ''
    }
  },
  created() {


    console.log(this.$store.state.IrisAddress)//IrisAddress
    console.log(this.$store.state.UptickAddress)//UptickAddress
    console.log(this.$store.state.chainType)//chainType

    this.chainType = this.$store.state.chainType
  
    if (this.chainType == "gon-irishub-1") {
      this.sender = this.$store.state.IrisAddress
    }

    if (this.chainType == "origin_1170-1") {
      this.sender = this.$store.state.UptickAddress
    }

    const randomInt = new Date().getTime() % 100000 + 1;
    this.nameValue = "test_" + this.chainType + "_" + String(randomInt)
    this.descriptionValue = "test_" + this.chainType + "_" + String(randomInt)
    this.uploadedImageHash = 'QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2'

    console.log(this.nameValue)
    window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
  },
  watch: {
    uploadedImageHash: 'checkInput',
    nameValue: 'checkInput',
    descriptionValue: 'checkInput',
    amountValue: 'checkInput',
  },
  methods: {
       keplrKeystoreChange(){
        keplrKeystoreChange();
    },
    async getMetaDataJson() {
      var metaParams = {}
      metaParams.name = this.nameValue
      metaParams.description = this.descriptionValue
      metaParams.image = this.loadeImageUrl(this.uploadedImageHash)
      metaParams.minter = this.sender

      let result = await uploadJsonData(metaParams)
      console.log(result)
      // https://ipfs.upticknft.com/ipfs/QmR55vt4EVdtKyjHuepUgytGiVwTBPnVupDrnJx5gE38Di
      return "https://ipfs.upticknft.com/ipfs/" + result.data.data
    },
    async requestCreateSuccess(txResult) {
      var params = {}

      params.nftAddress = txResult.tokenId;
      params.nftId = txResult.nftIds
      params.hash = txResult.hash
      params.chainType = this.chainType
      params.name = encodeURIComponent(this.nameValue)
      params.description = encodeURIComponent(this.descriptionValue)
      params.creator = this.sender
      params.owner = this.sender
      params.imgUrl = this.loadeImageUrl(this.uploadedImageHash)
      params.metadataUrl = this.metadataUrl
      let result = await requestCreateNFT(params)
      console.log(result)
      if (result.status == 201 || result.status == 200) {
        return result.data.data
      } else {
        // flag = false;
			  throw new Error("Request Creeate Falied");
      }
    },
    async submitButton() {

      // let tokenIdsList =[]
      // let typeUrl =  "/ibc.applications.nft_transfer.v1.MsgTransfer"
      // let port =  'nft-transfer'
      // let channel =  'channel-7'

      // let classId =  'uptick932020a1e33fd792cb22e0a9a7c2315e'
      // let nftId =  'uptick52bb4fce161e6c2e'
      // let sender =  'uptick1e7v3fn2yxxlzpmlgy9232neykpe57gzupas6z6'
      // let receiver =  'iaa1wxl44399uppwd5uc6rrgz07plzs9atv8fxt7qr'
      // let memo =  'uptick to iris'
      // tokenIdsList.push(nftId)

      // await uptick2Iris(typeUrl,port,channel,classId,tokenIdsList,sender,receiver,memo);   
      // console.log("xxl uptick2Iris 02");


      try {
        console.log(this.nameValue)
        this.isShowLoading = true

        let name = this.nameValue;
        let sender = this.sender
        let data = ""
        let amount = Number(this.amountValue)

        let uri = await this.getMetaDataJson()
        this.metadataUrl = uri

        console.log("wxl ---- mintNFT", name, sender, uri, data, amount)

        let txResult;
        if (this.chainType == "gon-irishub-1") {
          txResult = await issueDenomAndMint(
            name,
            sender,
            sender,
            uri,
            data,
            amount,
          );
          console.log(txResult)
        }
        if (this.chainType == "origin_1170-1") {
          txResult = await issueUptickDenomAndMint(
            name,
            sender,
            sender,
            uri,
            data,
            amount,
          );
        }

        debugger
        await this.requestCreateSuccess(txResult)

        let title = "Create Success"
        this.$mtip({
          title: title,
        });
        this.isShowLoading = false
        this.pushHome()

      } catch (error) {
        console.log(error);
        debugger
        this.isShowLoading = false
        this.$mtip({
          title: error.message,
        });
      }
    },
    chooseFile() {
      this.$refs.fileInput.click()
    },
    async uploadFile(event) {
      console.log(event)
      const file = event.target.files[0]
      console.log(file)
      const formData = new FormData()
      formData.append('file', file)
      this.isShowLoading = true
      try {
        const value = await uploadImage(file);
        this.isShowLoading = false
        console.log(value.data.data);
        this.uploadedImageHash = value.data.data
      } catch (error) {
        console.error(error);
        this.isShowLoading = false
      }
    },
    loadeImageUrl(hash) {
      return getNftImg(hash)
    },
    checkInput() {
      this.checkAmountInput()
      this.isInputEmpty =
        this.nameValue.trim() === '' ||
        this.descriptionValue.trim() === '' ||
        this.amountValue.trim() === '' ||
        this.uploadedImageHash.trim() === 'QmPuuSpLdzV4Hz4aJtPUVzxsgnLKPYiqKdYtdTGyLF6Pn5'
      console.log(this.isInputEmpty)
    },
    checkAmountInput() {
      let value = this.amountValue
      console.log(value)
      // 将非数字的字符替换为空字符串
      value = value.replace(/[^\d]/g, '')
      // 将大于50的数字替换为50
      if (value > 50) {
        value = '50'
      }

      if (value == 0) {
        value = ''
      }
      this.amountValue = value
    },
    pushHome() {
      this.$router.push('/home')
    }
  }
}
</script>
  
<style lang="scss" scoped>
/* 样式代码 */
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
}

.scrollable {
  padding-top: 20px;
  padding-bottom: 20px;
  height: 100vh;
  width: 100%;
  overflow: scroll;
}

::-webkit-scrollbar {
  display: none;
}

.topView {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 100%;
}

.btn {
  position: absolute;
  top: 20px;
  left: 10px;
  margin-right: auto;
  height: 35px;
  width: 35px;
  background-image: url('/src/assets/return.png');
  background-size: 35px;
  background-position: center;
  border: none;
}

.title {
  text-align: center;
  width: 100%;
  font-family: "AmpleSoft-Bold" !important;
  font-size: 15px !important;
  font-weight: normal;
  font-stretch: normal;
  color: #ffffff;
}

.create {
  width: 100%;
}

.addButton {
  background-color: #fb599b;
  // background-image: url('/src/assets/icon_add.png');
  background-size: 300px;
  background-position: center;
  border: none;
  height: 175px;
  width: 100%;
  border-radius: 5px;
  object-fit: contain;
}

.suggestedTitle {
  width: 238px;
  height: 15px;
  font-family: AmpleSoft !important;
  font-size: 14px !important;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fb599b;
}

.name {
  width: 100%;

  .textInput {
    width: 100%;
    height: 44px;
    padding-left: 10px;
    padding-right: 10px;
    background-image: linear-gradient(#e8daff,
        #e8daff),
      linear-gradient(#a17ae0,
        #a17ae0);
    background-blend-mode: normal,
      normal;
    border-radius: 5px;
  }
}



.description {
  width: 100%;

  .descriptionText {
    resize: none;
    padding-left: 10px;
    padding-right: 10px;

    /* width: 325px; */
    width: 100%;
    height: 119px;
    background-image: linear-gradient(#e8daff,
        #e8daff),
      linear-gradient(#a17ae0,
        #a17ae0);
    background-blend-mode: normal,
      normal;
    border-radius: 5px;
  }
}

.subBtn {
  margin-top: 25px;
  // margin-bottom: 20px;
  width: 100%;
  height: 41px;
  background-color: #fb599b;
  border-radius: 20px;

  font-family: AmpleSoft-Bold !important;
  font-size: 15px !important;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}

.subBtn:disabled {
  background-color: gray;
}

.chainSelected {
  width: 100%;
  background-color: white;
  border-radius: 5px;
  background-image: linear-gradient(#e8daff, #e8daff), linear-gradient(#a17ae0, #a17ae0);
  height: 44px;
}
</style>
  