<template>
    <el-row v-nss-title="username + '的主页'">
        <el-col :span="3"></el-col>
        <el-col :span="18" v-loading="isLoading" element-loading-text="加载中...">
            <el-card style="width: 100%;height: 200px;">
                <div style="height: 200px">
                    <el-avatar
                        class="user-avatar"
                        :src="avatar"
                        @click="isMySelfSpace && (uploadAvatarDialogVisible = true)"
                        @error="avatar = require('@/assets/image/default.jpg')"
                    />
                    <div class="user-info">
                        <div style="font-size: 42px; margin-bottom: 5px">
                            <b>{{ username.toUpperCase() }}</b>
                        </div>
                        <div>{{ bio }}</div>
                    </div>
                </div>
                <el-dialog title="上传头像" v-model="uploadAvatarDialogVisible" width="30%" center>
                    <el-upload
                        class="avatar-uploader"
                        :action="AVATAR_UPLOAD_URL"
                        :show-file-list="false"
                        with-credentials
                        :http-request="myAvatarUpload"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="uploadAvatarUrl" :src="uploadAvatarUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <template #footer>
                        <span class="dialog-footer">
                            <!-- <el-button @click="uploadAvatarDialogVisible = false">取 消</el-button> -->
                            <el-button type="primary" @click="uploadAvatarDialogVisible = false">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </el-card>
            <el-card>
                <div class="user-nav">
                    <ul class="left">
                        <li
                            :tabindex="1"
                            :class="userNavActiveId == 1 ? 'is-active' : ''"
                            @click="userNavActiveId = 1"
                        >
                            <span>主页</span>
                        </li>
                        <li
                            :tabindex="1"
                            :class="userNavActiveId == 2 ? 'is-active' : ''"
                            @click="userNavActiveId = 2"
                        >
                            <span>统计</span>
                        </li>
                        <li
                            :tabindex="1"
                            :class="userNavActiveId == 3 ? 'is-active' : ''"
                            @click="userNavActiveId = 3"
                        >
                            <span>博客</span>
                        </li>
                        <li
                            :tabindex="1"
                            :class="userNavActiveId == 4 ? 'is-active' : ''"
                            @click="userNavActiveId = 4"
                        >
                            <span>团队</span>
                        </li>
                        <li
                            :tabindex="1"
                            :class="userNavActiveId == 5 ? 'is-active' : ''"
                            @click="userNavActiveId = 5"
                            v-if="isMySelfSpace"
                        >
                            <span>设置</span>
                        </li>
                    </ul>
                    <ul class="right">
                        <li :tabindex="1">
                            <div>
                                <span>关注</span>
                                <span>{{ following }}</span>
                            </div>
                        </li>
                        <li :tabindex="1">
                            <div>
                                <span>粉丝</span>
                                <span>{{ followers }}</span>
                            </div>
                        </li>
                        <li :tabindex="1">
                            <div>
                                <span>解题</span>
                                <span>{{ solves }}#{{ solveRank }}</span>
                            </div>
                        </li>
                        <li :tabindex="1">
                            <div>
                                <span>积分</span>
                                <span>
                                    <b :class="ratingClass()">{{ rating }}</b>
                                    #{{ ratingRank }}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </el-card>
            <el-row style="margin-top: 36px;" type="flex" justify="space-between">
                <el-col :span="17">
                    <div v-if="userNavActiveId == 1">
                        <el-card>
                            <pre style="min-height: 200px;padding: 0 10px"><p>这里什么都没有...</p></pre>
                        </el-card>
                    </div>

                    <div v-show="userNavActiveId == 2">
                        <div id="solveInfo" style="width: 100%;height: 300px"></div>
                    </div>

                    <div v-if="userNavActiveId == 3"></div>

                    <div v-else-if="userNavActiveId == 4"></div>
                    <div v-else-if="userNavActiveId == 5">
                        <ul class="user-setting">
                            <li>
                                <span>公开邮箱</span>
                                <span>
                                    <el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                                </span>
                            </li>
                            <li>
                                <span>更改个人简介</span>
                                <span>
                                    <el-input size="mini" style="width: 100%"></el-input>
                                </span>
                            </li>
                        </ul>
                        <div>
                            <el-button type="primary">
                                提交
                            </el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-card>
                        <div style="justify-content: space-between;display: flex;padding: 5px 10px">
                            <span>用户ID</span>
                            <span>{{ uid }}</span>
                        </div>
                        <div style="justify-content: space-between;display: flex;padding: 5px 10px">
                            <span>用户名</span>
                            <span>{{ username }}</span>
                        </div>
                        <div style="justify-content: space-between;display: flex;padding: 5px 10px">
                            <span>注册时间</span>
                            <span>{{ registerDate }}</span>
                        </div>
                        <div style="justify-content: space-between;display: flex;padding: 5px 10px">
                            <span>上次登陆</span>
                            <span>{{ lastLoginDate }}</span>
                        </div>
                        <div style="justify-content: space-between;display: flex;padding: 5px 10px">
                            <span>Email</span>
                            <span>{{ email }}</span>
                        </div>
                    </el-card>
                    <el-card header="团队" style="margin-top: 36px;">
                        <p style="color: rgba(128, 128, 128, 0.664);">暂时没有加入任何团队</p>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="3"></el-col>
    </el-row>
</template>
<script lang="ts">
import { useRoute } from 'vue-router'
import { getUserInfoByIdOrName, postUploadUserAvater } from '@/restful/user';
import { useStore } from 'vuex'
import { inject, onMounted, reactive, toRefs, watch } from 'vue';
import { AVATAR_UPLOAD_URL } from '@/config'
import Notification from '@/utils/notification'
import '@/utils/format'

export default {
    setup() {
        const route = useRoute();
        const store = useStore();
        const loginUid = store.getters['user/getUid'];

        const data = route.params.data as string;
        let echarts: any = inject("ec");

        const state = reactive({
            uid: 0,
            bio: '',
            username: '',
            avatar: '',
            registerDate: '',
            lastLoginDate: '',
            email: '',
            following: 0,
            followers: 0,
            solves: 0,
            solveRank: 0,
            rating: 1001,
            ratingRank: 0,

            userNavActiveId: 1,

            isLoading: true,
            isMySelfSpace: true,
            uploadAvatarDialogVisible: false,
            uploadAvatarUrl: undefined,
            AVATAR_UPLOAD_URL: AVATAR_UPLOAD_URL,
        })

        watch(
            () => state.userNavActiveId,
            (count, prevCount) => {
                console.log(count, prevCount)
            }
        )

        const lastLoginDateFormat = (date: number) => {
            date = Math.round(((new Date()).getTime() - date) / 1000 / 60);
            if (date == 0) {
                return "在线";
            } else if (date < 60) {
                return `${date}分钟之前`;
            } else if (date < 60 * 24) {
                return `${Math.round(date / 60)}小时之前`;
            } else if (date < 60 * 24 * 30) {
                return `${Math.round(date / 60 / 24)}天之前`;
            } else if (date < 60 * 24 * 30 * 12) {
                return `${Math.round(date / 60 / 24 / 30)}月之前`;
            } else {
                return `${Math.round(date / 60 / 24 / 30)}年之前`;
            }
        }

        const ratingClass = () => {
            if (state.rating <= 1000) {
                return 'rating-newbie';
            } else {
                return 'rating-master';
            }
        }

        getUserInfoByIdOrName(data).then(res => {
            if (res.code == 200) {
                state.uid = res.data.uid;
                state.bio = res.data.bio;
                state.username = res.data.username;
                state.avatar = res.data.avatar;
                state.registerDate = new Date(res.data.register_date).format('yyyy-MM-dd');
                state.lastLoginDate = lastLoginDateFormat(res.data.last_login_date);
                state.email = res.data.email ? res.data.email : '未公开';

                state.followers = res.data.followers;
                state.following = res.data.following;
                state.solves = res.data.solves;
                state.solveRank = res.data.solve_rank;
                state.rating = res.data.rating;
                state.ratingRank = res.data.rating_rank;

                if (loginUid == res.data.uid) {
                    state.isMySelfSpace = true;
                }
                state.isLoading = false;
            }
        })

        const getWidth = (e: HTMLElement) => {
            let p = e.parentElement as HTMLElement;
            (e.parentElement as HTMLElement).style.cssText = `z-index:-1000;`
            let ret = e.offsetWidth;
            (e.parentElement as HTMLElement).style.cssText = "display:none;"
            return ret;
        }

        onMounted(() => {
            const si = document.getElementById("solveInfo") as HTMLElement;
            console.log(getWidth(si));
            si.style.width = getWidth(si) + 'px';
            const solveInfoChart = echarts.init(si);

            solveInfoChart.setOption({
                title: {
                    text: '做题统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['总数', 'Web', 'Pwn', 'Crypto', 'Reverse', 'Misc']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    left: 'center',
                    itemSize: 25,
                    top: 55,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none',
                        },
                        restore: {},
                    }
                },
                xAxis: {
                    type: "time",
                },
                dataZoom: [{
                    type: 'slider',
                }],
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '总数',
                        type: 'line',
                        data: [[1613926012692, 1], [1613946012693, 2], [1613926112692, 2], [1783926112692, 12]]
                    },
                    {
                        name: 'Web',
                        type: 'line',
                        data: [[1613926012692, 1], [1613946012693, 2], [1613926112692, 2], [1633926112692, 11]]
                    },
                    {
                        name: 'Pwn',
                        type: 'line',
                        data: []
                    }
                ]
            });
            window.onresize = () => { solveInfoChart.resize(); }
            // solveInfoChart.resize();
            setTimeout(() => { solveInfoChart.resize() }, 1000);

        });

        const beforeAvatarUpload = (file: any) => {
            const isValid = (file.type === 'image/jpeg' || file.type === 'image/png');
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isValid) {
                Notification.error({
                    message: '上传头像图片只能是 JPG & PNG 格式!'
                });
            }
            if (!isLt5M) {
                Notification.error({
                    message: '上传头像图片大小不能超过 5MB!'
                });
            }
            return isValid && isLt5M;
        }

        const handleAvatarSuccess = (res: any, file: any) => {
            console.log(res.data)
            state.uploadAvatarUrl = res.data;
            state.avatar = res.data;
        }

        const myAvatarUpload = (content: any) => {
            let formData = new FormData();
            formData.append('file', content.file);
            postUploadUserAvater(formData).then((res: any) => {
                handleAvatarSuccess(res, content.file)
            })
        }

        return {
            ...toRefs(state),

            ratingClass,
            beforeAvatarUpload,
            handleAvatarSuccess,
            myAvatarUpload
        }
    }
}
</script>

<style lang="scss">
.user-avatar {
    width: 100px;
    height: 100px;
    // bottom: 84px;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    border: 1px solid rgb(156, 156, 156);
    position: absolute;
}

.user-info {
    position: absolute;
    top: 24px;
    // margin-bottom: 90px;
    left: 134px;
}

.user-nav {
    display: flex;
    justify-content: space-between;
    padding: 0 1.5em;
}
.user-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 15px;
    position: relative;
    height: 40px;
}

.user-setting {
    list-style: none;
    padding: 0;
    margin-top: 0;
    font-size: 18px;
    position: relative;
}

.user-setting li {
    display: flex;
    vertical-align: middle;
    padding-top: 10px;
    justify-content: space-between;
}

.user-setting li span:first {
    width: 15%;
}

.user-setting li span:last-of-type {
    width: 85%;
    text-align: right;
}

.user-nav .left li {
    float: left;
}

.user-nav .right li div {
    display: inline-block;
    padding: 0 0.8em;
}

.user-nav .right li span {
    display: block;
    text-align: center;
}

.user-nav .right li {
    float: left;
    cursor: pointer;
}

.user-nav li > span {
    line-height: 40px;
    padding: 0 30px;
    display: block;
}

.user-nav .left li:hover {
    border: 1px solid #3a8ee6;
    background: #8395a8;
    color: #fff;
    border-radius: 20px;
}
.user-nav .left .is-active {
    border: 1px solid #3a8ee6;
    background: #3a8ee6;
    color: #fff;
    border-radius: 20px;
}
.user-nav .left li:focus {
    border: 1px solid #3a8ee6;
    background: #3a8ee6;
    color: #fff;
    border-radius: 20px;
    outline-style: none;
}

.el-card__body {
    padding: 8px;
}

.rating-newbit {
    color: grey;
}

.rating-master {
    color: red;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>