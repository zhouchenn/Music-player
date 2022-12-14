<template>
  <div class="login">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou" class="bai"></use>
      </svg>
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input type="text" name="phone" class="phone" v-model="phone" placeholder="请输入手机号码"/>
      <input type="password" name="passworld" class="passworld" v-model="password" placeholder="请输入密码"/>
      <button class="btn" @click="$router.push('/infoUser')">点击登录</button>
    </div>
  </div>
</template>
<script>
// import {getLoginUser} from '@/request/api/home.js'
export default {
    data(){
        return{
          // 手机号
            phone:'',
            // 密码
            password:''
        }
    },
    methods:{
      // async Login(){
      //   this.$router.push('/infoUser')
      //     let res= await this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})
      //     if(res.data.code===200){
      //       //如果返回的code等于200，说明登录成功，就跳转个人中心页面
      //     this.$store.commit('updateIsLogin',true)
      //     this.$store.commit('updateToken',res.data.token)
      //     let result=await getLoginUser(res.data.account.id)
      //     this.$store.commit('updateUser',result)
      //     // 跳转到个人中心页面
      //     this.$router.push('/infoUser')
      //     }
      //     // 登录错误
      //     else{
      //         alert("手机号码或者密码错误")
      //         this.password=''
      //     }
      //   }
    }

}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(../assets/109951162899017025.jpg);
  background-size:100% 13.34rem;
  .icon{
    fill: currentColor;
    position: fixed;
    top: 10px;
    left: 10px;
    height: 30px;
    width:30px;
    color: #fff;
  }
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    input::-webkit-input-placeholder{
      color: rgb(255, 255, 255);
    }
    .phone,
    .passworld {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid rgb(255, 255, 255,);
      border-radius: 10%;
     background-color: rgba(255, 255, 255,0.3);
     color: #fff;
    }
    .btn{
        width: 2rem;
        height: .6rem;
        border: 1px solid rgba(255, 255, 255,0.3);
        border-radius: 10%;
        background-color: rgba(#fff,#fff,#fff,0.5);
    }
  }
}
</style>
