<template>
<v-card style="background-color:#00043a">
      <div class="work d-flex  flex-column">
    <img
     class="mainImg"
      :src="src"
      @click="imgClick"
      style="cursor: pointer;border-radius: 5px 5px 0px 0px;height:180px"
    >
  </div>
   <div class="content">
        <div class="name">Macaron membership card - Macaronhome</div>

    </div>
</v-card>

</template>

<script>



const WORK_KEY = "WORK";

export default {
  name: "Work",
  inheritAttrs: false,
  props: {
      src:String
   
  },
  data: () => ({
   
   
    
  }),
  watch: {
    // hash: {
    //   handler: async function (hash) {
    //     if (!hash) {
    //      hash = "QmPcXBirGiUSyjb8i2FQUpNDTtPHBsgo7tviwwm4YQeJ6p"
    //     }
    //      this.src = await getFileSrc(WORK_KEY, hash);
          
    //   },
    //   immediate: true,
    // },
  },
  mounted(){
    
   
  },
  methods: {
     imgClick() {
       this.$router.push({name:'cardDetail'})
    },
  },
};
</script>

<style lang="scss" scoped>
.work {
 height: 180px;
.mainImg{
     transition: all .5s ease .1s;
     object-fit: cover;
    
  }
  
  overflow: hidden;
  .mainImg:hover{
    transform: scale(1.1);
    // transform: translate(0px, 0px) scale(2) rotate(0deg);  
  }
   
  .video{
    .icons{
       position: absolute;
      left: 10px;
      bottom: 5px;
    }
   
  }
  
  
}
 .content{
        height: 45px;
        .name{
            font-family: "AmpleSoft";
            font-size: 15px !important;
            font-weight: normal;
            font-stretch: normal;
            line-height: 70px;
            letter-spacing: 0px;
            color: #ffffff;
        }
        .bold{
             font-family: "AmpleSoft-Bold";
        }
    }
</style>