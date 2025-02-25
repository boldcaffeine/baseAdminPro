<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" color="#889aa4"></svg-icon>
        </span>
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model:visible="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon name="password" color="#889aa4"></svg-icon>
          </span>
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            show-password
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleLogin"
      >
        Login
      </el-button>

      <div>
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right: 18px">Username : editor</span>
          <span>Password : any</span>
        </div>

        <el-button
          class="thirdparty-button"
          type="primary"
          @click="showDialog = true"
        >
          Or connect with
        </el-button>
      </div>
    </el-form>

    <el-dialog title="Or connect with" v-model="showDialog">
      Can not be simulated on local, so please combine your own business
      simulation! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
  </div>
</template>
  
<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import SocialSign from "./components/SocialSignin.vue";

import { validUsername } from "@/utils/validate.ts";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
// 使用 useRoute 来获取当前路由对象
const route = useRoute();
// 使用 useRouter 来获取路由对象
const router = useRouter();

const validateUsername = (rule, value, callback) => {
  if (!validUsername(value)) {
    callback(new Error("Please enter the correct user name"));
  } else {
    callback();
  }
};

const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("The password can not be less than 6 digits"));
  } else {
    callback();
  }
};
let loginFormRef = ref(null);
let usernameRef = ref(null);
let passwordRef = ref(null);
const loginForm = reactive({
  username: "admin",
  password: "111111",
});

const loginRules = {
  username: [{ required: true, trigger: "blur", validator: validateUsername }],
  password: [{ required: true, trigger: "blur", validator: validatePassword }],
};

const getOtherQuery = (query) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
};

const passwordType = ref("password");
const capsTooltip = ref(false);
const loading = ref(false);
const showDialog = ref(false);
const redirect = ref(undefined);
const otherQuery = ref({});

onMounted(() => {
  if (loginForm.username === "") {
    usernameRef.value.focus();
  } else if (loginForm.password === "") {
    passwordRef.value.focus();
  }
});

watch(
  () => route.query,
  (query) => {
    if (query) {
      redirect.value = query.redirect;
      otherQuery.value = getOtherQuery(query);
    }
  },
  { immediate: true }
);

const checkCapslock = (e) => {
  const { key } = e;
  capsTooltip.value = key && key.length === 1 && key >= "A" && key <= "Z";
};

const showPwd = () => {
  passwordType.value = passwordType.value === "password" ? "" : "password";
  nextTick(() => {
    usernameRef.value.focus();
  });
};

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      store
        .dispatch("user/login", loginForm)
        .then(() => {
          router.push({
            path: redirect.value || "/",
            query: otherQuery.value,
          });
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
</script>
  
  <style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  :deep(.el-input) {
    display: inline-block;
    width: 85%;
    padding: 8px 5px 8px 0;
    .el-input__wrapper {
      width: 100%;
      box-shadow: none;
      background: transparent;
      .el-input__inner {
        color: #fff;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
  
  <style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
  