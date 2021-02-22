<template>
    <el-row>
        <el-col :span="3"></el-col>
        <el-col :span="18">
            <el-card style="width: 100%;height: 200px;">
                <div style="height: 200px">
                    <img class="user-avatar" src="base64://Q" />
                    <div class="user-info">
                        <div style="font-size: 36px">X3NNY</div>
                        <div>凭君莫话封侯事，一将成名万骨枯。</div>
                    </div>
                </div>
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
                    </ul>
                    <ul class="right">
                        <li :tabindex="1">
                            <div>
                                <span>关注</span>
                                <span>0</span>
                            </div>
                        </li>
                        <li :tabindex="1">
                            <div>
                                <span>粉丝</span>
                                <span>0</span>
                            </div>
                        </li>
                        <li :tabindex="1">
                            <div>
                                <span>解题</span>
                                <span>100#1</span>
                            </div>
                        </li>
                        <li :tabindex="1">
                            <div>
                                <span>积分</span>
                                <span>1500#1</span>
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

                    <div v-if="userNavActiveId == 3">
                        
                    </div>

                    <div v-else-if="userNavActiveId == 4"></div>
                </el-col>
                <el-col :span="6">
                    <el-card>
                        <div style="justify-content: space-between;display: flex;padding: 5px 10px">
                            <span>用户ID</span>
                            <span>0</span>
                        </div>
                        <div style="justify-content: space-between;display: flex;padding: 5px 10px">
                            <span>用户名</span>
                            <span>X3NNY</span>
                        </div>
                        <div style="justify-content: space-between;display: flex;padding: 5px 10px">
                            <span>注册时间</span>
                            <span>2020/01/01</span>
                        </div>
                        <div style="justify-content: space-between;display: flex;padding: 5px 10px">
                            <span>上次登陆</span>
                            <span>3 hours ago</span>
                        </div>
                        <div style="justify-content: space-between;display: flex;padding: 5px 10px">
                            <span>Email</span>
                            <span>未公开</span>
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
import { getUserInfoByIdOrName } from '@/restful/user';
import { inject, onMounted, reactive, toRefs } from 'vue';
export default {
    setup() {
        const route = useRoute();
        const data = route.params.data as string;
        let echarts: any = inject("ec");

        const state = reactive({
            uid: 0,
            username: '',
            userNavActiveId: 1,
        })

        // getUserInfoByIdOrName(data).then(res => {
        //     if (res.data.code == 200) {
        //         state.uid = res.data.uid;
        //         state.username = res.data.username;
        //     }
        // })

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
            window.onresize = () => {solveInfoChart.resize();}
            // solveInfoChart.resize();
            setTimeout(() => {solveInfoChart.resize()}, 1000);
            
        });

        return {
            ...toRefs(state)
        }
    }
}
</script>

<style lang="scss">
.user-avatar {
    width: 64px;
    height: 64px;
    // bottom: 84px;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    border: 1px solid rgb(156, 156, 156);
    position: absolute;
}

.user-info {
    position: absolute;
    top: 20px;
    // margin-bottom: 90px;
    left: 96px;
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
</style>