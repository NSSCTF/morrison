<template>
  <el-row style="text-align: center;margin-top: 10%;">
    <el-col :span="8">
      <el-image
        :src="require('@/assets/image/logo.png')"
        style="width: 140px; height: 140px;border-radius: 5px"
      />
      <h2>CTF Book</h2>
      <p>Aim for the impossible.</p>
      <p>
        <router-link to="/note/set/ctf"><el-button>
          View details &raquo;
        </el-button></router-link>
      </p>
    </el-col>
    <el-col :span="8">
      <el-image
        :src="require('@/assets/image/logo.png')"
        style="width: 140px; height: 140px"
      />
      <h2>WriteUp</h2>
      <p>All writeup.</p>
      <p>
        <router-link to="/note/set/wp"><el-button>
            View details &raquo;
        </el-button></router-link>
      </p>
    </el-col>
    <el-col :span="8">
      <el-image
        :src="require('@/assets/image/balderich.png')"
        style="width: 140px; height: 140px;"
      />
      <h2>Balderich</h2>
      <p>Live with honor, die with glory.</p>
      <p>
        <router-link
          to="/note/set/balderich"><el-button>
          View details &raquo;
        </el-button></router-link>
      </p>
    </el-col>
  </el-row>
</template>
<script>
export default {
};
</script>

<style lang="scss">
  .el-image__inner{
    border-radius: 50%;
  }
</style>