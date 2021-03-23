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
    <el-menu-item index="9" v-if="isLogin && userInfo.level > 3">Admin</el-menu-item>
    <div v-if="isLogin">
      <router-link to="/user/logout"><el-menu-item index="9" key="login" style="float: right">Logout</el-menu-item></router-link>
      <span style="float: right; line-height: 56px;">|</span>
      <el-submenu index="10" style="float: right">
        <template #title>{{userInfo.username}}</template>
        <el-menu-item index="10-1">
          <router-link :to="'/user/'+userInfo.uid">个人主页</router-link>
        </el-menu-item>
        <el-menu-item index="10-2">
          <router-link to="/user/setting">修改资料</router-link>
        </el-menu-item>
      </el-submenu>
    </div>
    <div v-else>
      <router-link to="/user/register"><el-menu-item index="12" key="register" style="float: right">Register</el-menu-item></router-link>
      <span style="float: right; line-height: 56px;">|</span>
      <router-link to="/user/login"><el-menu-item index="11" key="login" style="float: right">Login</el-menu-item></router-link>
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
      return store.getters['user/isLogin'];
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
      '/about',
      '/admin'
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