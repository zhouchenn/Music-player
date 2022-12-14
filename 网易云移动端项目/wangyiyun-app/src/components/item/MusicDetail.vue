<template>
  <!-- musicList.al.picUrl背景图片虚化 -->
  <img :src="musicList.al.picUrl" alt="" class="bgimg" />
  <!-- 顶部 -->
  <div class="detailTop">
    <!-- 顶部左边 -->
    <div class="detailTopLeft">
      <!-- 左箭头 -->
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <!-- 歌曲名和作者名字 -->
      <div class="leftMarquee">
        <!-- vue3Marquee跑马灯显示歌曲名字 al.name专辑名字-->
        <Vue3Marquee style="color: #fff">{{ musicList.al.name }}</Vue3Marquee>
        <!-- 作者名字 -->
        <span v-for="item in musicList.ar" :key="item">
          {{ item.name }}
        </span>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <!-- 顶部右边 分享按钮-->
    <div class="detailTopRight">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <!-- 中间旋转磁盘 磁盘和歌词切换-->
  <div class="detailContent" v-show="!isLyricShow">
    <!-- 磁针 -->
    <img
      src="@/assets/needle-ab.png"
      alt=""
      class="img_needle"
      :class="{ img_needle_active: !isbtnShow }"
    />
    <!-- 磁盘 -->
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <!-- 旋转的图片 -->
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="img_ar"
      @click="isLyricShow = true"
      :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }"
    />
  </div>
  <!-- 歌词部分 -->
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow = false">
    <!-- 判断时间给样式 -->
    <p v-for="item in lyric" :key="item" :class="{ active: currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,}">
      {{ item.lrc }}
    </p>
  </div>
  <!-- 底部组件 -->
  <div class="detailFooter">
    <!-- 底部头部 -->
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <!-- 底部中间歌曲进度条 step步数 :max="duration"总时长-->
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <!-- 底部下方 -->
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <!-- 上一首 -->
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <!-- 俩按钮二选一  播放和暂停-->
      <svg class="icon bofang" aria-hidden="true" v-if="isbtnShow"  @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
       <!-- 下一首 -->
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>
<script>
// Marquee引入走马灯
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";

import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      // 是否显示歌词
      isLyricShow: false,
    };
  },
  computed: {
    ...mapState(["lyricList", "currentTime", "playListIndex", "playList",'duration']),
    // 歌词
    lyric(){
      let arr;
      // 如果拿到数据歌词
      if (this.lyricList.lyric) {
        // 根据换行符分割歌词 返回新数组map
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          // 切割分钟
          let min = item.slice(1, 3);
          // 秒
          let sec = item.slice(4, 6);
          // 毫秒
          let mill = item.slice(7, 10);
          //歌词
          let lrc = item.slice(11, item.length);
          // 总的时间parseInt
          let time =parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          // 判断是否为非数字
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // 统统返回
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          // 判断到最后一句了 并且下一句的时间没了 显示样式到结束
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } 
          // 下一首歌的时间
          else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      // console.log(arr);
      return arr;
    },
  },
  mounted() {
    // 歌曲总时长
    this.addDuration()
  },
  // 接收footermusic。vue中的
  props: ["musicList", "isbtnShow", "play","addDuration"],
  methods: {
    // 点击返回
    backHome() {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    // 上一首和下一首
    goPlay(num) {
      // playListIndex默认0 0+1或0—1
      let index = this.playListIndex + num;
      if (index < 0) {
        // 播放列表的最后一首歌
        index = this.playList.length - 1;
      } 
      // 到最后一首歌下一首变成开始0
      else if (index == this.playList.length) {
        index = 0;
      }
      // updatePlayListIndex把下标传入更新歌曲上一首还是下一首
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
  watch: {
    // 监听当前时间
    currentTime(newValue) {
      // 获取p标签
      let p = document.querySelector("p.active");  
        // 判断歌词滚到的距离
      if (p.offsetTop > 250) {
          // 用ref=musicLyric 将歌词置于中间部分
          this.$refs.musicLyric.scrollTop = p.offsetTop - 250;
      }
      // 进度条到了总时长
      if(newValue===this.duration){
        // 自动播放下一首
        // 如果到最后一首歌了 updatePlayListIndex(0)返回第一首歌曲
        if(this.playListIndex===this.playList.length-1){
          this.updatePlayListIndex(0);
          this.play()
        }
        // 否则播放下一首
        else{
           this.updatePlayListIndex(this.playListIndex+1);
        }
      }
      // console.log([this.$refs.musicLyric])
    },
  },
  components: {
    Vue3Marquee,
  },
};
</script>
<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  // 虚化
  filter: blur(70px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  // 垂直
  flex-direction: column;
  align-items: center;
  position: relative;
  // 磁针
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    // 旋转
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  // 磁针旋转
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
// 磁盘
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  // 图片
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    // linear匀速 infinite无线循环
    animation: rotate_ar 10s linear infinite;
  }
  // 启动旋转
  .img_ar_active {
    animation-play-state: running;
  }
  // 暂停旋转
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  // 定义一个动画
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
// 歌词样式
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  // 歌词
  p {
    color: rgb(190, 181, 181);
    margin-bottom: 0.3rem;
  }
  // 播放的歌词
  .active {
    color: #fff;
    font-size: 0.5rem;
  }
}
// 底部样式
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>