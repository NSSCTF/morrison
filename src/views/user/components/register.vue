<template>
    <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="20">
            <el-steps :active="activeStep" finish-status="success" style="margin-top: 20px">
                <el-step title="邀请码"></el-step>
                <el-step title="注册"></el-step>
                <el-step title="激活"></el-step>
            </el-steps>
            <div style="margin-top: 15%;width: 50%;margin-left: 25%;" v-if="activeStep == 0">
                <el-form :model="registerForm" label-width="80px" :inline="false" size="normal">
                    <el-form-item label="邀请码" prop="inviteCode">
                        <el-input v-model="registerForm.inviteCode"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div style="margin-top: 15%;width: 50%;margin-left: 25%;" v-if="activeStep == 1">
                <el-form
                    ref="registerFormRef"
                    :model="registerForm"
                    :rules="rules"
                    label-width="80px"
                    :inline="false"
                    size="normal"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="registerForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="passwordA">
                        <el-input type="password" v-model="registerForm.passwordA"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div style="margin-top: 15%;width: 50%;margin-left: 25%;" v-if="activeStep == 2">
                <el-form :model="registerForm" label-width="80px" :inline="false" size="normal">
                    <el-form-item label="验证码" prop="inviteCode">
                        <el-input v-model="registerForm.inviteCode" placeholder="检查邮箱中的验证码..."></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">激活</el-button>
                        <el-button type="info" @click="reSendVerifyCode">重发</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div style="margin-top: 15%;text-align: center" v-if="activeStep == 3">
                <p style="font-size: 68px">Welcome Join NSSCTF</p>
            </div>
        </el-col>
        <el-col :span="2"></el-col>
    </el-row>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { postCheckInviteCode, postRegisterSendVerifyCode, postRegisterUser } from '@/restful/user'
import Notify from '@/utils/notification'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter();
        const state = reactive({
            activeStep: 0,

            lastSendTime: 0,

            registerForm: {
                inviteCode: '',
                username: '',
                password: '',
                passwordA: '',
                email: '',
                verifyCode: '',
            },
            rules: {
                username: [
                    {
                        validator: (rule: any, value: string, callback: any) => {
                            if (!value) {
                                callback(new Error("用户名不能为空"));
                            } else if (!/^[a-zA-Z][a-zA-Z0-9]{4,9}$/.test(value)) {
                                callback(new Error("用户名格式错误"));
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        validator: (rule: any, value: string, callback: any) => {
                            if (!value) {
                                return callback(new Error("邮箱不能为空"));
                            } else {
                                return callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        validator: (rule: any, value: string, callback: any) => {
                            if (!value) {
                                return callback(new Error("密码不能为空"));
                            } else if (value.length < 6 || value.length > 18) {
                                return callback(new Error("密码长度需要在[6, 18]范围内"));
                            } else {
                                return callback();
                            }
                        },
                        trigger: 'blur',
                    }
                ],
                passwordA: [
                    {
                        validator: (rule: any, value: String, callback: any) => {
                            if (value != state.registerForm.password) {
                                return callback(new Error("两次输入的密码不一致"));
                            } else {
                                return callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            }
        });

        const registerFormRef = ref<any>(null);

        const submitForm = async () => {
            if (state.activeStep == 0) {
                postCheckInviteCode(state.registerForm.inviteCode).then(res => {
                    if (res.code == 200) {
                        state.activeStep += 1;
                    } else {
                        Notify.warning({ message: '邀请码有误或已失效！' });
                    }
                })
            } else if (state.activeStep == 1) {
                registerFormRef.value.validate().then((valid: any) => {
                    if (valid) {
                        postRegisterSendVerifyCode(state.registerForm).then((res: any) => {
                            if (res.code == 200) {
                                state.activeStep += 1;
                            } else {
                                Notify.warning({ message: '邮箱验证码发送失败！' });
                            }
                        })
                    }
                }).catch((res: any) => {
                    Notify.warning({ message: "表单内容有误！请先修改。" });
                });
            } else {
                postRegisterUser(state.registerForm).then(res => {
                    if (res.code == 200) {
                        Notify.success({
                            message: '注册成功！三秒后跳转至主页。'
                        });
                        state.activeStep += 1;
                        setTimeout(() => {
                            router.push({
                                path: '/'
                            })
                        }, 3000);
                    } else {
                        Notify.warning({
                            message: '注册失败！'
                        })
                    }
                })
            }
        };

        const reSendVerifyCode = () => {
            const time = new Date().getTime();
            if (time-state.lastSendTime<=60*1000) {
                Notify.info({message: `${Math.round(60-(time-state.lastSendTime)/1000)}秒后可再次发送。`});
            } else {
                state.lastSendTime = new Date().getTime();
                postRegisterSendVerifyCode(state.registerForm).then((res: any) => {
                    if (res.code == 200) {
                        Notify.success({message: '验证码发送成功！'});
                    } else {
                        Notify.warning({ message: '邮箱验证码发送失败！' });
                    }
                })
            }
        }

        return {
            ...toRefs(state),

            registerFormRef,

            submitForm,
            reSendVerifyCode
        }
    }
}
</script>