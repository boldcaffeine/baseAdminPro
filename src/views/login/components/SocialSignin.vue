<template>
  <div class="social-signup-container">
    <div class="sign-btn" @click="wechatHandleClick('wechat')">
      <span class="wx-svg-container">
        <svg-icon name="wechat" class="icon" />
      </span>
      WeChat
    </div>
    <div class="sign-btn" @click="tencentHandleClick('tencent')">
      <span class="qq-svg-container">
        <svg-icon name="qq" class="icon" color="#fff"  />
      </span>
      QQ
    </div>
  </div>
</template>
  
  <script setup>
// 引入需要的工具函数
// import openWindow from '@/utils/open-window'

// 直接定义方法，不需要使用 `this`
const wechatHandleClick = (thirdpart) => {
  alert("ok");
  // this.$store.commit('SET_AUTH_TYPE', thirdpart)
  // const appid = 'xxxxx'
  // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
  // const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
  // openWindow(url, thirdpart, 540, 540)
};

const tencentHandleClick = (thirdpart) => {
  alert("ok");
  // this.$store.commit('SET_AUTH_TYPE', thirdpart)
  // const client_id = 'xxxxx'
  // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
  // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
  // openWindow(url, thirdpart, 540, 540)
};
</script>
  
  <style lang="scss" scoped>
.social-signup-container {
  margin: 20px 0;

  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }

  .wechat,
  .qq {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }

  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 5px;
  }

  .wx-svg-container {
    background-color: #24da70;
  }

  .qq-svg-container {
    background-color: #6ba2d6;
    margin-left: 50px;
  }
}
</style>
  