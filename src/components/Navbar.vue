<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1"><router-link to="/">NSS</router-link></el-menu-item>
    <el-menu-item index="2"><router-link to="/problem">Problem</router-link></el-menu-item>
    <el-menu-item index="3"><router-link to="/note">Note</router-link></el-menu-item>
    <el-menu-item index="4"><router-link to="/contest">Contest</router-link></el-menu-item>
    <el-menu-item index="5"><router-link to="/rank">Rank</router-link></el-menu-item>
    <el-menu-item index="6"><router-link to="/user">User</router-link></el-menu-item>
    <el-menu-item index="7"><router-link to="/prize">Prize</router-link></el-menu-item>
    <el-menu-item index="8"><router-link to="/about">About</router-link></el-menu-item>

    <div v-if="userInfo.uid">
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
      <el-menu-item index="9" key="login" style="float: right"><router-link to="/logout">Logout</router-link></el-menu-item>
    </div>
    <div v-else>
      <el-menu-item index="12" key="register" style="float: right"><router-link to="/register">Register</router-link></el-menu-item>
      <span style="float: right; line-height: 56px;">|</span>
      <el-menu-item index="11" key="login" style="float: right"><router-link to="/login">Login</router-link></el-menu-item>
    </div>
  </el-menu>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
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

    const handleSelect = (key, keyPath) => {
      data.activeIndex = key
    }

    return {
      ...toRefs(data),

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