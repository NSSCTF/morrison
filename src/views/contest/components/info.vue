<template>
    <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="20" v-loading="isLoading" element-loading-text="加载中...">
            <p style="font-size: 36px;text-align: center;margin: 0">第一场CTF比赛</p>
            <p
                style="font-size: 18px;text-align: center;margin: 0;margin-bottom: 5px"
            >{{ countDownFormat(countDown) }}</p>
            <el-progress style="width: 100%" :show-text="false" :percentage="countDownProcess"></el-progress>
            <el-tabs type="card" @tab-click="tabPaneClick" v-model="activePaneName">
                <el-tab-pane label="主页" name="home">
                    
                </el-tab-pane>
                <el-tab-pane label="公告" name="notice"></el-tab-pane>
                <el-tab-pane
                    label="赛题"
                    name="problem"
                    v-loading="problemLoading"
                    element-loading-text="加载中..."
                >
                    <el-card>
                        <ul class="contest-problem-nav">
                            <li
                                v-for="(item, index) in problemList"
                                :key="index"
                                @click="activeProblemIndex = index"
                            >
                                <template v-if="item.number != 0">
                                    <el-badge :value="`${item.solved}/${item.number}`">
                                        <el-button>{{ problemType[index] }}</el-button>
                                    </el-badge>
                                </template>
                            </li>
                        </ul>
                    </el-card>
                    <ul
                        style="display: flex;margin: 0 -15px;margin-left: -55px;padding-top: 24px;flex-flow: row wrap"
                    >
                        <li
                            v-for="(item, index) in problemList[activeProblemIndex]?.problems"
                            :key="index"
                            class="contest-problem-card"
                        >
                            <el-card
                                @click="clickProblemById(item.id)"
                                style="border: 1px solid rgb(79, 149, 177);"
                            >
                                <div class="header">
                                    <p>{{ item.title }}</p>
                                    <p>solved: {{ item.solved }}</p>
                                </div>
                                <div class="info">
                                    <div class="point">
                                        <span>{{ item.point }}</span>
                                        <span>pt</span>
                                    </div>
                                    <ul class="top3">
                                        <li v-for="(name, i) in item.top3" :key="i">
                                            <div>{{ i + 1 }}.</div>
                                            <span>
                                                <span class="marquee">{{ name }}</span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </el-card>
                        </li>
                    </ul>
                    <el-dialog
                        :title="problem[activeProblemId]?.title"
                        v-model="displayProblemDialog"
                        width="50%"
                        style="min-height: 200px;"
                        center
                    >
                        <p>{{ problem[activeProblemId]?.desc }}</p>
                        <div
                            style="text-align: center; margin-bottom: 0"
                            v-if="isContestEnds == false && !checkSolved(activeProblemId)"
                        >
                            <el-input placeholder="flag..." v-model="submitFlag"></el-input>
                            <el-button
                                style="margin-top: 5px;margin-bottom: 0px"
                                @click="submitProblemFlag"
                            >Submit</el-button>
                        </div>
                        <div v-else-if="checkSolved(activeProblemId)">
                            <el-button style="color: green">已解决</el-button>
                        </div>
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane label="排行榜" name="rank">
                    <el-table :data="rankList" border>
                        <el-table-column label="用户信息" align="center">
                            <el-table-column label="用户名" prop="name" width="200"></el-table-column>
                            <el-table-column label="分数" prop="score" width="70"></el-table-column>
                            <el-table-column label="解题数" prop="solve" width="60"></el-table-column>
                        </el-table-column>
                        <el-table-column
                            :label="problemType[index]"
                            v-for="(item, index) of problemList"
                            :key="index"
                            align="center"
                        >
                            <el-table-column
                                :label="problem.title"
                                v-for="(problem, i) of item.problems"
                                :key="index + '-' + i"
                                width="46"
                            >
                                <template #default="scope">
                                    <div
                                        style="text-align: center;font-size: 1.3rem;width: 100%;height: 21px;color: rgb(51, 180, 79)"
                                    >
                                        <i
                                            class="el-icon-medal"
                                            v-if="scope.row.solved.indexOf(problem.id) == -1"
                                        ></i>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="2"></el-col>
    </el-row>
</template>

<script lang="ts">
import { computed, onMounted, reactive, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { getContestInfoById, getContestProblemInfoByCidAndId, getContestProblemInfoListByCid, getContestRankListByCid, postContestProblemFlag } from '@/restful/contest';
import { useStore } from 'vuex'
import Notify from '@/utils/notification'
import router from '@/router';


export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const cid = parseInt(route.params.cid as string);
        const state = reactive({
            problemType: ['WEB', 'PWN', 'REVERSE', 'CRYPTO', 'MISC', 'ANDROID', 'BLOCKCHAIN', 'IOT', 'AI', 'EGG'],
            home: {
                desc: '',
            },
            notice: [],
            rankList: [{ name: "Xenny", solved: [1], solve: 10, score: 13202 }, { name: "Xenny", solved: [], solve: 10, score: 13202 }],
            problemList: [] as any[],
            problem: {
                0: {
                    id: 0,
                    title: 'signup',
                    desc: "ezezez"
                }
            } as any,
            rank: [],

            submitFlag: '',

            activeProblemIndex: 0, // 打开的题目板块索引
            activeProblemId: 0, // 打开的题目ID
            activePaneName: 'home',
            displayProblemDialog: false,

            isContestEnds: false,

            title: '',
            startDate: 0,
            endsDate: 10,
            countDownProcess: 0,
            countDown: 10,
            contestState: 2,

            isLoading: false,
            problemLoading: true,
            randLoading: true,
        });

        const isLogin = store.getters['user/isLogin'];
        // if (!isLogin) {
        //     Notify.info({
        //         message: "请先登录！"
        //     });
        //     router.push({
        //         path: '/user/login',
        //         query: { redirect: route.path }
        //     });
        // }

        getContestInfoById(cid).then(res => {
            if (res.code == 200) {
                let now = new Date().getTime();
                state.title = res.data.title;
                if (now < res.data.start_date) {
                    state.contestState = 0;
                } else if (now < res.data.ends_date) {
                    state.contestState = 2;
                } else if (now > res.data.ends_date) {
                    state.contestState = 3;
                    Notify.warning({
                        message: "比赛已经结束。"
                    })
                }
                state.startDate = res.data.start_date;
                state.endsDate = res.data.ends_date;
                state.countDown = (res.data.ends_date - (new Date()).getTime()) / 1000;
                state.isLoading = false;
                handleCountDown();
            } else if (res.code == 201) {
                Notify.info({
                    message: "比赛不存在！"
                })
            }
        })

        const tabPaneClick = (tab: any) => {
            if (tab.paneName == 'notice') {

            } else if (tab.paneName == 'problem') {
                state.problemLoading = true;
                getContestProblemInfoListByCid(cid).then(res => {
                    if (res.code == 200) {
                        state.problemList = res.data;
                        for (let i in res.data) {
                            if (res.data[i].number != 0) {
                                state.activeProblemIndex = parseInt(i);
                                break;
                            }
                        }
                        for (let i in res.data) {
                            for (let problem of res.data[i].problems) {
                                state.problem[problem.id].title = problem.title;
                                state.problem[problem.id].desc = problem.desc;
                                state.problem[problem.id].point = problem.point;
                                state.problem[problem.id].solved = problem.solved;
                            }
                        }
                        state.problemLoading = false;
                    }
                })
            } else if (tab.paneName == 'rank') {
                getContestRankListByCid(cid).then(res => {
                    if (res.code == 200) {
                        state.rankList = res.data;
                        state.randLoading = false;
                    }
                })
            }
        }

        const clickProblemById = (id: number) => {
            state.activeProblemId = id;
            state.displayProblemDialog = true;
            // getContestProblemInfoByCidAndId(cid, id).then(res => {
            //     if (res.code == 200) {
            //     } else {
            //         Notify.error({
            //             message: "题目数据加载失败！请重试。"
            //         })
            //     }
            // })
        }

        const countDownFormat = (time: number) => {
            if (state.contestState == 0) {
                return '未开始';
            } else if (state.contestState == 3) {
                return '已结束';
            }
            const second: number = time % 60;
            const minute = Math.round(time / 60) % 60;
            const hour = Math.round(time / 3600);
            const p = (v: any) => {
                return ('00' + v).substr(('' + v).length);
            }
            return `${p(hour)}:${p(minute)}:${p(second)}`;
        }

        const handleCountDown = () => {
            if (state.contestState == 2 && state.countDown > 0) {
                state.countDown -= 1;
                state.countDownProcess = (1 - state.countDown / (state.endsDate - state.startDate)) * 100;
                setTimeout(handleCountDown, 1000);
            } else if (state.contestState == 3) {
                state.countDownProcess = 100;
            } else if (state.contestState == 0) {
                state.countDownProcess = 0;
            }
        };

        const checkSolved = (pid: number) => {
            return state.problem[pid].solved;
            // for (let problems of state.problemList) {
            //     for (let problem of problems.problems) {
            //         if (problem.id == pid) {
            //             if (problem.solved) {
            //                 return true;
            //             } else {
            //                 return false;
            //             }
            //         }
            //     }
            // }
            // return false;
        };

        const changeSolved = (cpid: number) => {
            for (let problems of state.problemList) {
                for (let problem of problems.problems) {
                    if (problem.id == cpid) {
                        problem.solved = 1;
                    }
                }
            }
            return false;
        }

        const submitProblemFlag = () => {
            if (state.submitFlag == '') {
                Notify.info({
                    message: "Flag不能为空。"
                })
            } else {
                postContestProblemFlag(cid, state.activeProblemId, state.submitFlag).then(res => {
                    if (res.code == 200) {
                        if (res.data) {
                            changeSolved(state.activeProblemId);
                            Notify.success({
                                message: "Flag正确！"
                            })
                        } else {
                            Notify.info({
                                message: "Flag不正确。"
                            })
                        }
                    } else {
                        Notify.warning({
                            message: "提交Flag失败。"
                        })
                    }
                    state.displayProblemDialog = false;
                })
            }
        }

        return {
            ...toRefs(state),

            checkSolved,

            tabPaneClick,
            clickProblemById,
            countDownFormat,
            submitProblemFlag
        }
    }
}
</script>

<style lang="scss">
.contest-problem-nav {
    list-style: none;
    padding: 0 30px;
    margin: 0;
    position: relative;
    height: 42px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
}

.contest-problem-nav li {
    float: left;
}

// .contest-problem-nav li span {
//     line-height: 40px;
//     padding: 0 30px;
//     display: block;
// }

.contest-problem-card {
    width: 23%;
    // height: 15%;
    padding: 1%;
    max-width: 400px;
    list-style: none;
}

.contest-problem-card .header {
    text-align: center;
    padding: 0;
}

.contest-problem-card .header > p:nth-of-type(1) {
    font-size: 28px;
    padding: 0;
    margin: 0;
}

.contest-problem-card .header > p:nth-of-type(2) {
    font-size: 12px;
    padding: 0;
    margin: 0;
}

.contest-problem-card .info {
    display: flex;
    justify-content: space-between;
}

.contest-problem-card .point {
    display: inline-block;
    text-align: center;
    min-height: 102px;
    margin: 5px -25px 5px 5px;
    width: 33%;
}

.contest-problem-card .point > span:nth-of-type(1) {
    font-size: 48px;
    font-weight: 400;
    color: rgb(168, 68, 68);
    display: block;
}

.contest-problem-card .point > span:nth-of-type(2) {
    display: block;
    font-size: 24px;
    color: rgb(108, 139, 139);
}

.contest-problem-card .top3 {
    width: 67%;
    font-size: 18px;
}

.contest-problem-card .top3 > li {
    padding: 0;
    margin: 10px;
    border-bottom: 1px solid rgb(79, 149, 177);
    display: flex;
    text-align: center;
}

.contest-problem-card .top3 > li > div {
    display: flex;
}

.contest-problem-card .top3 > li > span {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
}

.marquee {
    animation: slidein 5s infinite;
    animation-duration: 5s;
    animation-timing-function: linear;
    display: inline-block;
    position: relative;
}

@keyframes slidein {
    0% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }

    to {
        -webkit-transform: translate(-25%);
        transform: translate(-25%);
    }
}

.contest-problem-card .top3 > p:nth-of-type(1) {
    color: rgb(255, 0, 0);
}

.el-card__body {
    padding: 10px;
}
</style>