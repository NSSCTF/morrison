<template>
  <el-row
    style="text-align: center;margin-top: 5%"
    type="flex"
    justify="space-between"
    v-nss-title="'主页'"
  >
    <el-col :span="24">
      <el-image :src="require('@/assets/image/logo2.jpg')" />
      <h1>Welcome to NSSCTF</h1>
      <!-- <h1>No System is Safe.</h1> -->
    </el-col>
  </el-row>
</template>

<script lang="ts">
export default{ }
</script>

<style lang="scss">
</style>