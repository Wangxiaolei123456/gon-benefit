<template>
  <div class="container align-center">
    <div class="topView">
      <button class="btn" @click="backPage"></button>
      <div class="title">Profile</div>
    </div>
    <div class="profile">
      <div class="profileBorder">
        <input
          type="file"
          accept="image/*"
          ref="fileInput"
          style="display: none"
          @change="uploadFile"
        />
        <img class="addButton" :src="Src" @click="chooseFile" />
      </div>
    </div>
    <div class="name" style="padding-top: 35px">
      <div class="title" style="text-align: left">Username</div>
      <input
        class="textInput"
        type="text"
        v-model="inputNameText"
        @input="checkInput"
      />
    </div>
    <div style="width: 100%">
      <button class="subBtn" @click="submitButton" :disabled="isInputEmpty">
        Submit
      </button>
    </div>
    <div class="disconnect" @click="disconnect">Disconnect</div>
    <uComponents ref="ucom"></uComponents>
  </div>
</template>
    
<script>
import { uploadImage, getNftImg } from "/src/api/image";
import { editUserInfo, getUserInfo } from "../../api/home";
import { keplrKeystoreChange } from "../../keplr/index";
export default {
  name: "HelloWorld",
  data() {
    return {
      inputNameText: "", // 初始化输入框的值为空
      uploadedProfileHash: "Qme2yTuaJXxKgXrjnwU8SgjGq5Vxpf1PPBVKLxVxAAETkH", //头像的默认hash
      isInputEmpty: true,
      Src: "",
    };
  },
  watch: {
    inputNameText() {
      this.checkInput();
    },
  },
  async mounted() {
    window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
    //    if(this.$route.params.name){
    //        this.inputNameText = this.$route.params.name
    //    }

    // 查询用户信息
    let InfoParams = {
      address: this.$store.state.IrisAddress,
    };

    let infoResult = await getUserInfo(InfoParams);
    if (infoResult.data.code == 0) {
      this.inputNameText = infoResult.data.obj.name;
      if (infoResult.data.obj.photo) {
        this.Src = infoResult.data.obj.photo;
      } else {
        this.Src = this.loadeProfileImageUrl();
      }
    }
  },
  methods: {
    keplrKeystoreChange() {
      keplrKeystoreChange();
    },
    disconnect() {
      localStorage.clear();
      this.$store.commit("SET_DID", "");
      this.$store.commit("SET_UPTICK_DID", "");
      this.$router.push({ name: "WalletConnect" });
    },
    backPage() {
      this.$router.go(-1);
    },
    async submitButton() {
      // 在这里处理输入框的提交操作 this.$store.state.UptickAddress:this.$store.state.IrisAddress,
      let infoParams = {
        name: this.inputNameText,
        address: this.$store.state.IrisAddress,
        uptickAddress: this.$store.state.UptickAddress,
        photo: getNftImg(this.uploadedProfileHash),
      };
      let res = await editUserInfo(infoParams);
      if (res.data.code == 0) {
        this.$toast("success", "Edit success").then(() => {
          this.$router.push({ name: "Home" });
        });
      } else {
        this.$toast("error", "Edit faild");
      }
    },
    chooseFile() {
      this.$refs.fileInput.click();
    },
    async uploadFile(event) {
      console.log(event);
      const file = event.target.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const value = await uploadImage(file);
        console.log(value.data.data);
        this.uploadedProfileHash = value.data.data;
        this.Src = getNftImg(this.uploadedProfileHash);
        console.log("sssss", this.Src);
      } catch (error) {
        console.error(error);
      }
    },
    loadeProfileImageUrl() {
      return getNftImg(this.uploadedProfileHash);
    },
    checkInput() {
      this.isInputEmpty = this.inputNameText.trim() === "";
    },
  },
};
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
  background-image: url("/src/assets/return.png");
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

.profile {
  width: 100%;
  display: flex;
  justify-content: center;

  .profileBorder {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    background: linear-gradient(141deg, #ff37b6 0%, #9e00ff 100%);
    border-radius: 50%;
  }

  .addButton {
    height: 110px;
    width: 110px;
    // background-image: url('/src/assets/icon_profile.png');
    border-radius: 55px;
    background-size: cover;
    background-position: center;
    border: none;
  }
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
    padding-left: 10px;
    height: 44px;
    background-image: linear-gradient(#e8daff, #e8daff),
      linear-gradient(#a17ae0, #a17ae0);
    background-blend-mode: normal, normal;
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
    background-image: linear-gradient(#e8daff, #e8daff),
      linear-gradient(#a17ae0, #a17ae0);
    background-blend-mode: normal, normal;
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
.disconnect {
  margin-top: 100px;
  font-family: "AmpleSoft";
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #ff3333;
}
</style>
    