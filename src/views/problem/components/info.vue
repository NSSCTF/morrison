<template>
    <el-row>
        <el-col :span="1"></el-col>
        <el-col :span="16">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="题目" name="first">
                    <el-card class="problem-card" :body-style="{ 'min-height': '500px' }">
                        <div class="problem-title">
                            <p style="font-size: 28px">{{ problem.title }}</p>
                        </div>
                        <div class="problem-body">
                            <p>题目分数：{{ problem.score }}</p>
                            <p>
                                题目难度：
                                <el-rate
                                    v-model="problem.level"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    style="display: inline;"
                                    score-template="{value}"
                                ></el-rate>
                            </p>
                            <p>
                                题目标签：
                                <el-tag
                                    v-for="(tag, index) in problem.tag"
                                    :key="index"
                                    style="margin: 5px"
                                >{{ tag }}</el-tag>
                            </p>
                            <p>
                                题目描述：
                                <span>{{ problem.desc }}</span>
                            </p>
                            <p v-if="problem.hint != false">
                                提示：
                                <el-button v-if="isHinted == false">显示提示</el-button>
                                <pre v-else>{{problem.hint}}</pre>
                            </p>
                        </div>
                        <div class="problem-footer">
                            <template v-if="isOpen == false">
                                <el-button>开启环境</el-button>
                            </template>
                            <template v-else>
                                <p>
                                    <router-link to="/">{{ docker.url }}</router-link>
                                </p>
                                <el-button>关闭环境</el-button>
                                <el-button>延长时间</el-button>
                            </template>
                            <el-button v-if="problem.annex != false">附件下载</el-button>
                            <div class="problem-flag">
                                <template v-if="isSolved == false">
                                    <el-input v-model="flag" placeholder="flag"></el-input>
                                    <el-button @click="submitFlag()" style="margin-top: 12px">提交</el-button>
                                </template>
                                <template v-else>
                                    <el-button style="color: green">已解决</el-button>
                                </template>
                            </div>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="讨论区" name="second" :disabled="isSolved == false">讨论区</el-tab-pane>
                <el-tab-pane label="Write Up" name="third">WP</el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="5">
            <div id="solveInfo" :style="{ width: '300px', height: '300px' }"></div>
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>作者</span>
                    </div>
                </template>
                <router-link :to="'/user/' + problem.uid">{{problem.author}}</router-link>
            </el-card>
        </el-col>
    </el-row>
</template>
<script lang="ts">
import { inject, onMounted, reactive, toRefs } from "vue";
import { useRoute } from 'vue-router'
import { getProblemInfoById } from '@/restful/problem'
import { getDockerInfoById } from '@/restful/docker'
import Notification from '@/utils/notification'
import problem from '@/mock/problem'

export default {
    setup() {
        const route = useRoute();
        const id: number = parseInt(route.params.id as string);
        let echarts: any = inject("ec");

        const state = reactive({
            activeName: 'first',
            flag: '',
            problem: {
                title: '',
                desc: '',
                uid: 0,
                score: 500,
                author: '',
                hint: false as boolean | string,
                hint_price: 0,
                tag: [] as string[],
                annex: false,
                level: 0
            },
            info: {
                solved: 42,
                wa: 10,
                na: 48,
            },
            docker: {
                url: 'http://docker.ctfer.vip/asd',
                remain: 0
            },
            isOpen: true,
            isSolved: true,
            isHinted: true
        });

        onMounted(() => {
            let myChart = echarts.init(document.getElementById("solveInfo"));
            // 绘制图表
            myChart.setOption({
                title: { text: "统计" },
                series: [
                    {
                        type: 'sunburst',
                        data: [{
                            name: 'Solved',
                            value: state.info.solved,
                            children: [{
                                value: state.info.solved,
                            }]
                        }, {
                            name: 'Tried',
                            value: state.info.wa + state.info.na,
                            children: [{
                                name: 'WA',
                                value: state.info.wa
                            }, {
                                name: 'NA',
                                value: state.info.na
                            }]
                        }]
                    },
                ],
            });
            window.onresize = function() {//自适应大小
                myChart.resize();
            }
        })

        getProblemInfoById(id).then(res => {
            if (res.data.code == 200) {
                state.problem.title = res.data.title;
                state.problem.desc = res.data.desc;
                state.problem.hint = res.data.hint;
                state.problem.hint_price = res.data.hint_price;
                state.problem.level = res.data.level;
                state.problem.uid = res.data.uid;
                state.problem.author = res.data.author;
                state.problem.tag = res.data.tag;
                state.problem.annex = res.data.annex;
                state.isHinted = res.data.is_hinted;
                state.isSolved = res.data.is_solved;
                state.isOpen = res.data.is_open;
                state.info.solved = res.data.info.solved;
                state.info.wa = res.data.info.wa;
                state.info.na = res.data.na;
            } else {
                Notification.error({
                    message: '题目数据获取失败！'
                })
            }

            if (res.data.is_open) {
                getDockerInfoById(res.data.did).then(res => {
                    state.docker.url = res.data.url;
                    state.docker.remain = res.data.remain;
                })
            }
        })
        state.problem = problem;


        const handleClick = (tab: any, event: any) => {
            console.log(tab, event)
        }

        const submitFlag = () => {
            console.log(state.flag)
        }

        return {
            ...toRefs(state),

            handleClick,
            submitFlag,
        }
    }
};
</script>

<style lang="scss">
.problem-card {
    width: 100%;
    min-height: 500px;
}

.problem-body {
    margin-top: 10px;
    min-height: 200px;
}

.problem-body p {
    font-size: 20px;
}

.problem-title {
    text-align: center;
}

.problem-footer {
    margin-top: 50px;
    text-align: center;
}

.problem-flag {
    padding: 5px 10px;
    margin-left: 50px;
    margin-right: 50px;
}
</style>