<template>
  <div class="bgi">
    <TopNav />
    <SwpierTop />
    <IconList/>
    <MusicList/>
  </div>
</template>

<script>
import TopNav from "@/components/home/TopNav.vue";
import SwpierTop from "@/components/home/SwpierTop.vue";
import IconList from "@/components/home/IconList.vue";
import MusicList from "@/components/home/MusicList.vue";
export default {
  name: "Home",
  components: {
    TopNav,
    SwpierTop,
    IconList,
    MusicList,
  },
};
</script>
<style lang="less" scoped>
.bgi{
  height: 12rem;
  background-image: url('../assets/v2-7c8784c1e1e35638946ac177aeb3773e_r.jpg');
  background-size:cover;
}
</style>
