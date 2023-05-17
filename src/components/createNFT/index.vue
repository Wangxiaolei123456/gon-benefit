<template>
  <div class="container">
    <div class="topView">
      <button class="btn"></button>
      <div class="title">Create NFT</div>
    </div>
    <!-- <div class="scrollable">

    </div> -->
    <div class="create">
        <input type="file" accept="image/*" ref="fileInput" style="display:none" @change="uploadFile">
        <button class="addButton" @click="chooseFile"></button>
        <div class="suggestedTitle">Suggested proportion 2:1 ( jpg/png/gif )</div>
      </div>
      <div class="name" style="padding-top: 35px;">
        <div class="title" style="text-align: left;">NFT Name</div>
        <input class="textInput" type="text" v-model="inputNameText">
      </div>
      <div class="description" style="padding-top: 25px;">
        <div class="title" style="text-align: left;">Description</div>
        <textarea class="descriptionText" v-model="message"></textarea>
      </div>
      <div class="name" style="padding-top: 25px;">
        <div class="title" style="text-align: left;">Editions</div>
        <input class="textInput" type="text" v-model="inputEditionsText">
      </div>
      <div style="width: 100%;">
        <button class="subBtn" @click="submitButton">Submit</button>
      </div>
  </div>
</template>
  
<script>
import {getMyBalance} from "/src/keplr/iris/wallet"
export default {
  name: 'HelloWorld',
  data() {
    return {
      inputNameText: '',// 初始化输入框的值为空
      inputEditionsText: '',
      message: ''
    }
  },
  methods: {
    submitButton() {
      // 在这里处理输入框的提交操作
      console.log(this.inputText)
      getMyBalance()

    },
    chooseFile() {
      this.$refs.fileInput.click()
    },
    uploadFile(event) {
      console.log(event)
      const file = event.target.files[0]
      console.log(file)
      const formData = new FormData()
      formData.append('file', file)

      // axios.post('/api/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }).then(response => {
      //   console.log(response.data)
      // }).catch(error => {
      //   console.log(error)
      // })
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
  background-image: url('/src/assets/icon_add.png');
  background-size: 300px;
  background-position: center;
  border: none;
  height: 175px;
  width: 100%;
  border-radius: 5px;
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

</style>
  