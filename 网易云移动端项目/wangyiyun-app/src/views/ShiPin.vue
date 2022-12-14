<template>
  <div class="Top">
    <div class="topleft">
      <svg class="icon liebiao" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
  <div class="video">
    <div class="topvideo">
      <div>林俊杰:她说</div>
    <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-aixin"></use>
      </svg>
    </div>
    <div class="img">
      <img src="@/assets/他说.png" alt="">
    </div>

    <div class="topvideo">
      <div>胡海泉:嘿，做个人吧</div>
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
    </div>
    <div class="img">
      <img src="@/assets/hu.png" alt="">
    </div>

    <div class="topvideo">
      <div >Kanye West:Closed On Sunday</div>
    <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-aixin"></use>
      </svg>
    </div>
    <div class="img">
      <img src="@/assets/closedonSunday.png" alt="">
    </div>
   
    
  </div>
  
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.Top{
        width: 100%;
        height: 1rem;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

}
.video{
  width: 100%;
 margin-bottom: .5rem;
 background-color: rgb(255, 206, 206);
  .topvideo{
    display: flex;
    justify-content: space-between;
    height: 25px;
    width: 100%;
    margin-top: 15px;
    background-color: rgb(255, 241, 241);

  }
  img{
    width: 100%;
    height: 200px;
  }
}

</style>