<template>
  <el-row>
    <el-col :span="5"></el-col>
    <el-col :span="15">
      <el-card>
        <h2>WEB</h2>
        <p>
          <router-link to="/problem/set/web"
            ><el-button> View details &raquo; </el-button></router-link
          >
        </p>
      </el-card>
      <el-card>
        <h2>PWN</h2>
        <p>
          <router-link to="/problem/set/pwn"
            ><el-button> View details &raquo; </el-button></router-link
          >
        </p>
      </el-card>
      <el-card>
        <h2>CRYPTO</h2>
        <p>
          <router-link to="/problem/set/crypto"
            ><el-button> View details &raquo; </el-button></router-link
          >
        </p>
      </el-card>
      <el-card>
        <h2>REVERSE</h2>
        <p>
          <router-link to="/problem/set/reverse"
            ><el-button> View details &raquo; </el-button></router-link
          >
        </p>
      </el-card>
      <el-card>
        <h2>MISC</h2>
        <p>
          <router-link to="/problem/set/misc"
            ><el-button> View details &raquo; </el-button></router-link
          >
        </p>
      </el-card>
      <el-card>
        <h2>etc</h2>
        <p>更多板块!敬请期待</p>
        <p>
          <el-button disabled> View details &raquo; </el-button>
        </p>
      </el-card>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>
<script>
export default {};
</script>

<style lang="scss" scope>
.el-image__inner {
  border-radius: 50%;
}
.el-card {
  float: left;
  width: 25%;
  margin: 30px 30px;
  height: 200px;
//   padding: 3px;
  text-align: center;
}
</style>