<template>
  <el-row v-nss-title="'题目种类'">
    <el-col :span="5"></el-col>
    <el-col :span="15">
    <div class="category-card">
      <el-card>
        <h2>WEB</h2>
        <p>
          <router-link to="/problem/set/web"
            ><el-button> View details &raquo; </el-button></router-link
          >
        </p>
      </el-card>
    </div>
    <div class="category-card">
      <el-card>
        <h2>PWN</h2>
        <p>
          <router-link to="/problem/set/pwn"
            ><el-button> View details &raquo; </el-button></router-link
          >
        </p>
      </el-card>
    </div>
    <div class="category-card">
      <el-card>
        <h2>CRYPTO</h2>
        <p>
          <router-link to="/problem/set/crypto"
            ><el-button> View details &raquo; </el-button></router-link
          >
        </p>
      </el-card>
    </div>
    <div class="category-card">
      <el-card>
        <h2>REVERSE</h2>
        <p>
          <router-link to="/problem/set/reverse"
            ><el-button> View details &raquo; </el-button></router-link
          >
        </p>
      </el-card>
    </div>
    <div class="category-card">
      <el-card>
        <h2>MISC</h2>
        <p>
          <router-link to="/problem/set/misc"
            ><el-button> View details &raquo; </el-button></router-link
          >
        </p>
      </el-card>
    </div>
    <div class="category-card">
      <el-card>
        <h2>etc</h2>
        <p>更多板块!敬请期待</p>
        <br />
        <!-- <p>
          <el-button disabled> View details &raquo; </el-button>
        </p> -->
      </el-card>
    </div>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>
<script>
export default {};
</script>

<style lang="scss">
.el-image__inner {
  border-radius: 50%;
}
.category-card {
  float: left;
  width: 25%;
  margin: 30px 30px;
  min-height: 200px;
//   padding: 3px;
  text-align: center;
}
</style>