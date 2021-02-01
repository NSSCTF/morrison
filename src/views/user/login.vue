<template>
  <el-form
    :model="loginForm"
    ref="loginForm"
    :rules="rules"
    label-width="80px"
    :inline="false"
    size="normal"
    action='/'
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
      <el-button @click="resetForm('loginForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
    methods: {
        submitForm(formName) {
            let params = {
                username: this.loginForm.username,
                password: this.loginForm.password
            };
            this.$http.userLogin(params).then(res => {
                if (res.code === 200) {
                    this.$router.push({
                        name: "Index"
                    });
                    localStorage.setItem('accesss_token', res.data.access_token);
                    localStorage.setItem('username', res.data.username)
                    localStorage.setItem('avatar', res.data.avatar)
                    localStorage.setItem('uid', red.data.uid)
                    localStorage.setItem('level', res.data.level)

                    this.$store.dispatch('setUserInfo', res.data)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    data() {
        const checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("用户名不能为空"));
            } else if (!(/^[a-zA-Z][a-zA-Z0-9]{4,9}$/.test(value))) {
                callback(new Error("用户名格式错误"))
            }
        };
        return {
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {validator: checkUsername, trigger: 'blur'}
                ]
            },
        }
    }
}
</script>