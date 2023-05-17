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
    <div class="description" style="padding-top: 25px;">
      <div style="display: flex; justify-content: space-around;">
        <div class="title" style="text-align: left;">Description</div>
        <div class="title" style="text-align: right;">{{ descriptionValue.length }}/800</div>
      </div>
      <textarea class="descriptionText" v-model="descriptionValue" maxlength="800"></textarea>
    </div>
    <div class="name" style="padding-top: 25px;">
      <div class="title" style="text-align: left;">Editions</div>
      <input class="textInput" type="text" v-model="amountValue">
    </div>
    <div style="width: 100%;">
      <button class="subBtn" @click="submitButton" :disabled="isInputEmpty">Submit</button>
    </div>
    <loading :isShowLoading="isShowLoading"></loading>
  </div>
</template>
  
<script>
import { getMyBalance, issueDenomAndMint, quiryTx, mintNFT } from "/src/keplr/iris/wallet"
import { uploadImage, getNftImg } from "/src/api/image"
import Loading from "@/components/loading.vue";

export default {
  name: 'HelloWorld',
  components: { Loading },
  data() {
    return {
      nameValue: '',// 初始化输入框的值为空
      descriptionValue: '',
      amountValue: '',
      uploadedImageHash: 'QmPuuSpLdzV4Hz4aJtPUVzxsgnLKPYiqKdYtdTGyLF6Pn5',//默认的图片,
      // nameValue: 'fantest',// 初始化输入框的值为空
      // descriptionValue: 'fantest',
      // amountValue: '',
      // uploadedImageHash: 'QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2',//默认的图片,
      isInputEmpty: true,
      flag: true,
      isShowLoading: false,
    }
  },
  created() {
    console.log(this.$store.state.IrisAddress)
    console.log(this.nameValue)
  },
  watch: {
    uploadedImageHash: 'checkInput',
    nameValue: 'checkInput',
    descriptionValue: 'checkInput',
    amountValue: 'checkInput',
  },
  methods: {
    async submitButton() {

      try {
        console.log(this.nameValue)
        this.isShowLoading = true

        let name = this.nameValue;
        let sender = 'iaa1wxl44399uppwd5uc6rrgz07plzs9atv8fxt7qr'
        let data = ""
        let amount = Number(this.amountValue)
        let imageUrl = this.loadeImageUrl(this.uploadedImageHash)
        console.log("wxl ---- mintNFT", name, sender, imageUrl, data, amount)

        let txHash = await issueDenomAndMint(
          name,
          sender,
          sender,
          imageUrl,
          data,
          amount,
        );
        console.log(txHash)

        await this.waitForTxConfirmation(txHash.txInfo.hash);

        let title = "Create Success"
        this.$mtip({
          title: title,
        });
        this.isShowLoading = false
        this.pushHome()

      } catch (error) {
        console.log(error);
        // let title = "Create Success"
        this.isShowLoading = false
        this.$mtip({
          title: error.message,
        });
      }
    },

    async waitForTxConfirmation(txHash) {
      this.flag = true;
      while (this.flag) {
        console.log("wwwwww");
        await this.sleep(5000);
        let res = await quiryTx(txHash);
        console.log("wxl -----  quiryTx");
        console.log(res);
        if (res.code == 0) {
          this.flag = false;
          return;
        } else if (res.code == -1) {
          this.flag = false;
          throw new Error(res.log);
        } else {
          this.flag = true;
        }
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
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
      try {
        const value = await uploadImage(file);
        console.log(value.data.data);
        this.uploadedImageHash = value.data.data
      } catch (error) {
        console.error(error);
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
      this.amountValue = value
    },
    pushHome() {
      this.$router.push('/')
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
  margin-top: 35px;
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
</style>
  