<template>
    <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="20">
            <p style="font-size: 36px;text-align: center;margin: 0">第一场CTF比赛</p>
            <p style="font-size: 18px;text-align: center;margin: 0;margin-bottom: 5px">{{countDownFormat(countDown)}}</p>
            <el-progress style="width: 100%" :show-text="false" :percentage="countDownProcess"></el-progress>
            <el-tabs type="card" @tab-click="tabPaneClick">
                <el-tab-pane label="主页" name="home">
                    <p>123</p>
                </el-tab-pane>
                <el-tab-pane label="公告" name="notice"></el-tab-pane>
                <el-tab-pane label="赛题" name="problem">
                    <el-card>
                        <ul class="contest-problem-nav">
                            <li
                                v-for="(item, index) in problemList"
                                :key="index"
                                @click="activeProblemIndex = index"
                            >
                                <el-badge :value="`${item.solved}/${item.number}`">
                                    <el-button>{{ item.title }}</el-button>
                                </el-badge>
                            </li>
                        </ul>
                    </el-card>
                    <el-card>
                        <el-card
                            class="contest-problem-card"
                            v-for="(item, index) in problemList[activeProblemIndex].problems"
                            :key="index"
                            @click="clickProblemById(item.id)"
                        >
                            <div class="header">
                                <p>{{ item.title }}</p>
                                <p>solved: {{ item.solved }}</p>
                            </div>
                            <div class="info">
                                <div class="point">
                                    <span>{{ item.point }}</span>
                                    <span>point</span>
                                </div>
                                <div class="top3">
                                    <p
                                        v-for="(name, i) in item.top3"
                                        :key="i"
                                    >{{ i + 1 }}. {{ name }}</p>
                                </div>
                            </div>
                        </el-card>
                    </el-card>
                    <el-dialog
                        :title="problem[activeProblemId]?.title"
                        v-model="displayProblemDialog"
                        width="50%"
                        style="min-height: 200px;"
                        center
                    >
                        <p>{{ problem[activeProblemId]?.desc }}</p>
                        <div style="text-align: center; margin-bottom: 0" v-if="isContestEnds == false">
                            <el-input placeholder="flag..."></el-input>
                            <el-button style="margin-top: 5px;margin-bottom: 0px">Submit</el-button>
                        </div>
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane label="排行榜" name="rank"></el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="2"></el-col>
    </el-row>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router'
import { getContestInfoById, getContestProblemInfoByCidAndId, getContestProblemInfoListByCid } from '@/restful/contest';
import Notify from '@/utils/notification'

export default {
    setup() {
        const route = useRoute();
        const cid = parseInt(route.params.cid as string);
        const state = reactive({
            home: {
                desc: '',
            },
            notice: [],
            problemList: [
                {
                    title: 'MISC',
                    number: 0,
                    solved: 0,
                    problems: [
                        {
                            id: 1,
                            title: '111',
                            solved: 0,
                            point: 0,
                            top3: ['xxx']
                        }
                    ]
                }
            ],
            problem: {
                0: {
                    id: 0,
                    title: 'signup',
                    desc: "ezezez"
                }            
} as any,
            rank: [],

            activeProblemIndex: 0, // 打开的题目板块索引
            activeProblemId: 0, // 打开的题目ID
            displayProblemDialog: false,

            isContestEnds: false,

            title: '',
            startDate: 0,
            endsDate: 10,
            countDownProcess: 0,
            countDown: 10,
            contestState: 2,
        });

        getContestInfoById(cid).then(res => {
            if (res.code == 200) {
                state.title = res.data.title;
                state.startDate = res.data.start_date;
                state.endsDate = res.data.ends_date;
                state.countDown = res.data.ends_date - res.data.start_date;
                state.contestState = res.data.state;
            } 
        })

        const tabPaneClick = (tab: any) => {
            if (tab == 'notice') {

            } else if (tab == 'problem') {
                getContestProblemInfoListByCid(cid).then(res => {
                    if (res.code == 200) {
                        state.problemList = res.data;
                    }
                })
            } else if (tab == 'rank') {

            }
        }

        const clickProblemById = (id: number) => {
            getContestProblemInfoByCidAndId(cid, id).then(res => {
                if (res.code == 200) {
                    state.problem[id] = res.data;
                    state.displayProblemDialog = true;
                } else {
                    Notify.error({
                        message: "题目数据加载失败！请重试。"
                    })
                }
            })
        }

        const countDownFormat = (time: number) => {
            if (state.contestState == 0) {
                return '未开始';
            } else if (state.contestState == 3) {
                return '已结束';
            }
            const second: number = time%60;
            const minute = Math.round(time/60)%60;
            const hour = Math.round(time/3600);
            return `${hour}:${minute}:${second}`;
        }

        const handleCountDown = () => {
            if (state.contestState == 2 && state.countDown > 0) {
                state.countDown -= 1;
                state.countDownProcess = (1 - state.countDown / (state.endsDate - state.startDate))*100;
                setTimeout(handleCountDown, 1000);
            } else if (state.contestState == 3) {
                state.countDownProcess = 100;
            }
        }

        onMounted(() => {
            handleCountDown();
        })

        return {
            ...toRefs(state),

            tabPaneClick,
            clickProblemById,
            countDownFormat
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
    width: 20%;
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 1.5%;
    margin-bottom: 1.5%;
    float: left;
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
    min-height: 96px;
    margin: 5px 5px;
    width: 40%;
}

.contest-problem-card .point > span:nth-of-type(1) {
    font-size: 36px;
    display: block;
}

.contest-problem-card .point > span:nth-of-type(2) {
    display: block;
}

.contest-problem-card .top3 {
    width: 60%;
    font-size: 18px;
}

.contest-problem-card .top3 > p {
    padding: 0;
    margin: 10px;
}

.contest-problem-card .top3 > p:nth-of-type(1) {
    color: rgb(255, 0, 0);
}

.el-card__body {
    padding: 10px;
}
</style>