<template>
    <div class="container d-flex align-center">
        <div class="topView">
            <button class="btn"></button>
            <div class="title">Receiving Code</div>
        </div>
       <div class="qrcode">
            <canvas id="qrcode" ref="qrcode" width="165"  height="165"></canvas>
       </div>
        <div class="address">uptick1n2lkja0ej74zg3tzntl0arag46vjytaz9cyhp8</div>
        <div style="width: 100%;">
            <button class="subBtn">Copy</button>
        </div>
    </div>
</template>
    
<script>
import qrcode from "qrcode";
export default {
    name: 'receiveCode',
    data() {
        return {
           
        }
    },
    watch: {
       
    },
    mounted(){
    let link= `{"source":"web","target":"buyFree","nftAddress":"jjahbsha","nftId":"dwdwew","owner":"wewewe"}`;
    this.generateQRCode(link)
  },
    methods: {
    // 生成二维码的方法
    	generateQRCode(content) {
      	this.$nextTick(() => {
       			const canvas = this.$refs.qrcode;
        		canvas.width = 165;
        		canvas.height = 165;
        		canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        		qrcode.toCanvas(
         		canvas,
          		content,
          		{
            		width: 218,
          		},
        		);
      	    });
       },
       //保存canvas 生成的二维码图片
    	savePic() {
      	 var canvasData =document.getElementById('qrcode');
         var a = document.createElement("a");
         a.href = canvasData.toDataURL();;
         a.download = "ReceivingCode";
         a.click();
        setTimeout(()=>{
           this.$toast("success", this.$t("success")).then(()=>{
             this.$emit("getOpenQRcode", false);
           })
          
        },1000)
        
        },
   
    }
}
</script>
    
<style lang="scss" scoped>
.qrcode{
    margin-top: 50px;
}
.address{
    margin-top: 70px;
    font-family: "AmpleSoft";
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 15px;
	letter-spacing: 0px;
	color: #fb599b;
}
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
        background: linear-gradient(141deg,
                #ff37b6 0%,
                #9e00ff 100%);
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
    