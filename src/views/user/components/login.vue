<template>
  <el-row v-nss-title="'登陆'">
    <el-col :span="4"></el-col>
    <el-col :span="16" style="margin-top: 20px">
      <h1 style="text-align: center;font-size: 64px">NSSCTF Login</h1>
      <el-form
        :model="loginForm"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="normal"
        action="/"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >登陆</el-button
          >
          <el-button @click="resetForm">清空</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>

<script lang="ts">
import { useRouter, useRoute } from "vue-router";
import { userLogin } from "@/restful/user";
import { useStore } from "vuex";
import { reactive, toRefs, ref } from "vue";
import notify from "@/utils/notification";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            validator: (rule: any, value: any, callback: any) => {
              if (!value) {
                return callback(new Error("用户名不能为空"));
              } else if (!/^[a-zA-Z][a-zA-Z0-9]{4,9}$/.test(value)) {
                callback(new Error("用户名格式错误"));
              }
            },
            trigger: "blur",
          },
        ],
      },
    });

    const submitForm = (formName: string) => {
      let params = {
        username: state.loginForm.username,
        password: state.loginForm.password,
      };
      userLogin(params)
        .then((res) => {
          if (res.code === 200) {
            let redirect = decodeURIComponent(route.query.redirect as string || "/");
            let page = "之前浏览界面";
            if (redirect == "/") {
              page = "主页";
            }
            notify.success({
              title: "登陆成功",
              message: "2秒后自动跳转至" + page,
              duration: 2500,
            });

            store.dispatch("user/userLogin", {
              userinfo: res.data
            });

            setTimeout(
              () =>
                router.push({
                  path: redirect,
                }),
              2000
            );
          } else {
            notify.warning({
              title: "登陆失败",
              message: "账号或密码有误！请重新登陆。",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const resetForm = () => {
      state.loginForm.username = "";
      state.loginForm.password = "";
    };

    return {
      ...toRefs(state),

      submitForm,
      resetForm,
    };
  },
};
</script>