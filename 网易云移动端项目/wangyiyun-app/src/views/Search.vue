<template>
  <div class="searchTop">
    <!-- 返回 -->
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <!-- 输入框 -->
    <input type="text" placeholder="薛之谦" v-model="searchKey" @keydown.enter="enterKey"/>
  </div>
  <!-- 历史记录 -->
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span v-for="item in keyWorldList" :key="item" class="spanKey" @click="searchHistory(item)">
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
     <div class="itemList">
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <!-- 左侧 点击添加到播放 并且播放 -->
        <div class="itemLeft" @click="updateIndex(item)">
          <!-- 序号 -->
          <span class="leftSpan">{{ i + 1 }}</span>
          <!-- 歌曲名字和作者 -->
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.artists" :key="index">{{item1.name}}</span>
          </div>
        </div>
        <!-- 右侧按钮 -->
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if='item.mvid !=0'>
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
</template>
<script>
import { getSearchMusic } from "@/request/api/home.js";
export default {
  data() {
    return {
      // 历史记录
      keyWorldList: [],
      // 添加搜索的关键字
      searchKey: "",
      // 搜索出来的列表
      searchList: [],
    };
  },
  mounted() {
    // 获取localStorage搜索记录JSON.parse转换一下  重新渲染的时候加个空
    this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList"))
      ? JSON.parse(localStorage.getItem("keyWorldList"))
      : [];
  },
  methods: {
    // 按下enter后
    async enterKey() {
      // 如果关键词不是空的
      if (this.searchKey !== "") {
        // 前面位置添加关键词
        this.keyWorldList.unshift(this.searchKey);
        //   new Set去重 展开
        this.keyWorldList = [...new Set(this.keyWorldList)];
        // 固定长度
        if (this.keyWorldList.length > 10) {
          this.keyWorldList.splice(this.keyWorldList.length - 1, 1);
        }
        // 将搜索记录保存到localStorage
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
        // 获取搜索的音乐
        let res = await getSearchMusic(this.searchKey);
        // 把音乐给searchList
        this.searchList = res.data.result.songs;
        this.searchKey = "";
      }
    },
    // 删除按钮 删除历史信息 删除localStorage和keyWorldList
    delHistory() {
      localStorage.removeItem("keyWorldList");
      this.keyWorldList = [];
    },
    // 点击历史记录也可以搜索
    async searchHistory(item) {
      let res = await getSearchMusic(item);
    //   console.log(res);
      this.searchList = res.data.result.songs;
    },
    // 添加音乐到播放列表 播放
    updateIndex(item){
      // 名字
        item.al=item.album
        // 图片
        item.al.picUrl=item.album.artist.img1v1Url
        this.$store.commit("pushPlayList",item)
        this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)
        
    }
  },
};
</script>
<style lang="less" scoped>
// 搜索头部
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  // 输入框
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
// 搜索历史
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  // 历史
  .searchSpan {
    font-weight: 700;
  }
  // 搜索的关键词
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  // 垃圾桶图标
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
// 搜索列表
 .itemList {
    width: 100%;
    padding: .2rem;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: .4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span{
            font-weight: 400;
            font-size: .24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight{
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon{
          fill: #999;
        }
         .bofang{
            position: absolute;
            left: 0;
          }
         .liebiao{
            position: absolute;
            right: 0;
          }
      }
    }
  }
</style>