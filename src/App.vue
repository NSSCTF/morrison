<template>
  <div id="app">
    <!-- <el-row>
      <el-col :span="24">
      
      </el-col>
    </el-row>-->
    <!-- <el-row style="margin-top: 20px;margin-left: 10px;margin-right: 10px">
      <el-col :span="24">
      
      </el-col>
    </el-row>-->
    <el-container>
      <el-header>
        <navbar />
      </el-header>
      <el-main style="overflow: visible;">
        <router-view />
      </el-main>
      <el-footer>
        <selfFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import navbar from '@/components/Navbar'
import selfFooter from '@/components/Footer'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, provide } from 'vue'
import Notify from '@/utils/notification'
import * as echarts from 'echarts'

export default {
  components: {
    navbar,
    selfFooter
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const isLogin = store.getters['user/isLogin'];

    provide('ec', echarts);

    router.beforeEach((to, from, next) => {
      if (to.meta.requireLogin) {
        if (isLogin == false) {
          Notify.info({
            message: "请先登陆!",
            duration: 2000
          });

          router.push({
            path: '/user/login',
            query: {
              redirect: to.fullPath
            }
          });
          // next();
        } else {
          next();
        }
      } else {
        next();
      }
    })
  }
}
</script>

<style lang="scss">
html,
body,
#app,
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
  min-height: 100%;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.el-main {
  width: 100%;
  min-height: 60%;
  overflow-y: hidden;
}
body,
select,
input,
text {
  font-family: verdana, arial, sans-serif;
}
table {
  font-size: 14px;
}
</style>