import {createStore} from 'vuex'
import {getMusicLyric} from "@/request/api/item.js"
import {getPhoneLogin} from "@/request/api/home.js"
export default createStore({
  state: {
    // 默认的显示的歌曲
    playList: [{ //播放列表
      al: {
        id: 153217942,
        name: "原谅",
        pic: 109951167965483440,
        picUrl: "https://p1.music.126.net/76CCJfSM1-FNjmFHg4EqpQ==/109951167965483435.jpg",
        pic_str: "109951167965483435"
      },
      id: 1989430006,
      name: "原谅",
      ar:[{name: "买辣椒也用券"}]
    }],
    playListIndex: 0, //默认下标为0
    isbtnShow: true, //暂停按钮的显示
    detailShow: false, //歌曲详情页的显示
    lyricList:{},//歌词
    currentTime:0,//当前时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否需要显示
    token:"",
    user:{},//用户信息
  },
  mutations: {
    // 播放和暂停按钮判断
    updateIsbtnShow(state, value) {
      state.isbtnShow = value
    },
    // 添加到播放列表
    pushPlayList(state,value){
      state.playList.push(value)
    },
    // 更新列表音乐
    updatePlayList(state, value) {
      state.playList = value
      // console.log(state.playList);
    },
    // 更新播放的音乐
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },
    // 详情页展示
    updateDetailShow(state) {
      // 关闭和打开取反
      state.detailShow = !state.detailShow
    },
    // 更新歌词
    updateLyricList(state,value){
      state.lyricList=value
    },
    // 歌曲时间
    updateCurrentTime(state,value){
      // console.log(state.currentTime);
      state.currentTime=value
    },
    // 更新歌曲总时长
    updateDuration(state,value){
      state.duration=value
    },
    // 更新登录状态
    updateIsLogin(state){
      state.isLogin=true
    },
    // 更新token
    updateToken(state,value){
      state.token=value
      localStorage.setItem('token',state.token)
    },
    // 更该用户
    updateUser(state,value){
      state.user=value
    }
  },
  actions: {
    // 获取歌词
    async getLyric(context, value) {
      let res = await getMusicLyric(value)
      // 提交给mutation修改updateLyricList里的歌词res.data.lrc
      context.commit("updateLyricList",res.data.lrc)
    },
    // 获取登录
    async getLogin(context,value){
      let res=await getPhoneLogin(value);
      return res
    }
  },
  modules: {}
})