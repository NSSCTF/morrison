<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">NSS</el-menu-item>
    <el-menu-item index="2">Problem</el-menu-item>
    <el-menu-item index="3">Note</el-menu-item>
    <el-menu-item index="4">Contest</el-menu-item>
    <el-menu-item index="5">Rank</el-menu-item>
    <el-menu-item index="6">User</el-menu-item>
    <el-menu-item index="7">Prize</el-menu-item>
    <el-menu-item index="8">About</el-menu-item>
 <div v-if="isLogin">
      <el-submenu index="10">
        <template #title>{{userInfo.username}}</template>
        <el-menu-item index="10-1">
          <router-link :to="'/user/'+userInfo.uid">个人主页</router-link>
        </el-menu-item>
        <el-menu-item index="10-2">
          <router-link to="/user/setting">修改资料</router-link>
        </el-menu-item>
        <el-menu-item index="10-3" v-if="userInfo.level > 3">
          <router-link to="/admin">后台管理</router-link>
        </el-menu-item>
      </el-submenu>
      
      <span style="float: right; line-height: 56px;">|</span>
      <el-menu-item index="9" key="login" style="float: right"><router-link to="/user/logout">Logout</router-link></el-menu-item>
    </div>
    <div v-else>
      <el-menu-item index="12" key="register" style="float: right"><router-link to="/user/register">Register</router-link></el-menu-item>
      <span style="float: right; line-height: 56px;">|</span>
      <el-menu-item index="11" key="login" style="float: right"><router-link to="/user/login">Login</router-link></el-menu-item>
    </div>
  </el-menu>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  setup() {
    const data = reactive({
      activeIndex: "1"
    });

    const store = useStore();
    const router = useRouter();

    const isLogin = computed(() => {
      return store.getters['user/isLogin']
    })
    const userInfo = computed(() => {
      return store.getters['user/getUserInfo']
    })

    const paths = [
      '/',
      '/',
      '/problem',
      '/note',
      '/contest',
      '/rank',
      '/user',
      '/prize',
      '/about'
    ]

    const handleSelect = (key, keyPath) => {
      router.push({
        path: paths[key]
      })
    }

    return {
      ...toRefs(data),

      isLogin,
      userInfo,
      handleSelect
    }
  }
};
</script>

<style lang="scss">
.el-menu{
  position: relative;
}
</style>