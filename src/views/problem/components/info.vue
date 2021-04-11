<template>
    <el-row v-nss-title="problem.title">
        <el-col :span="1"></el-col>
        <el-col :span="16">
            <el-tabs v-loading="problem.isLoading" v-model="activeName" type="card" @tab-click="handleClick" element-loading-text="加载中...">
                <el-tab-pane label="题目" name="first">
                    <el-card class="problem-card" :body-style="{ 'min-height': '500px', 'width': '100%' }" v-loading="problem.isLoading" element-loading-text="加载中...">
                        <div class="problem-title">
                            <el-badge :value="isSolved ? '已解决' : ''" type="success">
                                <span style="font-size: 28px">
                                    {{ problem.title }}
                                </span>
                            </el-badge>
                        </div>
                        <div class="problem-body">
                            <p>题目分数：{{ problem.point }}</p>
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
                            <p v-if="problem.hint !== false">
                                提示：
                                <el-button v-if="isHinted == false" @click="isDisplayBuyHintDialog = true">显示提示</el-button>
                                <pre v-else>{{problem.hint}}</pre>
                                <el-dialog
                                title="提示"
                                v-model="isDisplayBuyHintDialog"
                                width="30%"
                                center>
                                <span>将花费{{problem.hint_price}}购买本题提示。</span>
                                <template #footer>
                                    <span class="dialog-footer">
                                    <el-button @click="isDisplayBuyHintDialog = false">取 消</el-button>
                                    <el-button type="primary" @click="handleOpenHint">确 定</el-button>
                                    </span>
                                </template>

                                </el-dialog>
                            </p>
                        </div>
                        <div class="problem-footer">
                            <template v-if="isOpen == false">
                                <el-button @click="handleOpenDocker">开启环境 <i class="el-icon-coin">{{problem.price}}</i></el-button>
                            </template>
                            <template v-else-if="noDocker == false">
                                <div v-loading="isOpenAndLoading">
                                    <p>
                                        <a :href="docker.url" target="blank">{{ docker.url }}</a>
                                    </p>
                                    <el-row style="margin-bottom: 10px">
                                        <el-col :span="8"></el-col>
                                        <el-col :span="8">
                                    <el-progress :percentage="dockerRemainPercentage" :format="()=>{return `剩余：${docker.remain}秒`}">
                                    </el-progress>
                                </el-col>
                                    </el-row>
                                    <el-button @click="handleCloseDocker">关闭环境</el-button>
                                    <el-button @click="handleDelayDocker">延长时间</el-button>
                                </div>
                            </template>
                            <el-button v-if="problem.annex != null">
                                <el-link :href="problem.annex" target="_blank">附件下载</el-link>
                                </el-button>
                            <div class="problem-flag" v-if="isOpen">
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
                <el-tab-pane label="Write Up" name="third">
                    <el-table :data="wpData" stripe style="width: 100%">
                        <el-table-column prop="author" label="作者" width="180" align="center"></el-table-column>
                        <el-table-column prop="date" label="日期" align="center" width="200"></el-table-column>
                        <el-table-column prop="url" label="链接" align="center" width="700"></el-table-column>
                        <el-table-column prop="likes" label="#" align="right"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="详细数据" name="four">
                    <div class="statistics-head">
                        <el-row>
                            <el-col :span="12">
                        <p id="levelInfo" style="width: 100%;">22</p>
                        </el-col>
                        <el-col :span="11">
                        <p id="timeInfo" style="width: 100%;">11</p>
                        </el-col>
                        </el-row>
                        <el-table :data="solveData" stripe style="width: 100%">
                            <el-table-column prop="author" label="用户"></el-table-column>
                            <el-table-column prop="date" label="日期"></el-table-column>
                            <el-table-column prop="time" label="用时(分)"></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
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
            <el-card style="margin-top: 30px;" v-if="isSolved">
            <el-collapse>
                <el-collapse-item title="我的评价">
                    <p>难度评分：<el-rate v-model="myInfo.level" @change="handleMyInfoLevelChange" allow-half show-score style="display: inline"></el-rate></p>
                </el-collapse-item>
            </el-collapse>
            </el-card>
        </el-col>
    </el-row>
</template>
<script lang="ts">
import { computed, inject, onMounted, reactive, toRefs } from "vue";
import { useRoute } from 'vue-router'
import { getMyRateInfoById, getProblemInfoById,postOpenDocker,postOpenHintById,postSubmitFlagById,putProblemLevelById,getDockerInfo, postCloseDocker, postDelayDocker } from '@/restful/problem'
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
                author: '',
                point: 0,
                hint: false as boolean | string,
                hint_price: 0,
                price: 0,
                tag: [] as string[],
                annex: null,
                level: 0,
                isLoading: true
            },
            info: {
                solved: 42,
                wa: 10,
                na: 48,
            },
            docker: {
                url: 'http://docker.ctfer.vip/asd',
                createDate: 1615863892443,
                remain: 10,
            },
            myInfo: {
                level: 0,
                isRated: false
            },
            solveData: [],
            wpData: [],

            isOpen: false,
            isSolved: false,
            isHinted: false,
            isOpenAndLoading: true,
            isDisplayBuyHintDialog: false,
            noDocker: false,
        });

        const loadChart = () => {
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
        };

        const dockerRemainPercentage = computed(() => {
            let now = new Date().getTime();
            
            return Math.round(((now - state.docker.createDate)/(now + state.docker.remain*1000 - state.docker.createDate)) * 100);
        })

        const getMyRateInfo = () => {
            getMyRateInfoById(id).then(res => {
                if (res.code === 200) {
                    state.myInfo.isRated = res.data.level != false;
                    state.myInfo.level = res.data.level ? res.data.level : 0;
                } else {
                    Notification.error({
                        message: "获取「我的评价」数据失败。"
                    })
                }
            })
        }

        getProblemInfoById(id).then(res => {
            if (res.code == 200) {
                state.problem.title = res.data.title;
                state.problem.desc = res.data.desc;
                state.problem.hint = res.data.hint;
                state.problem.hint_price = res.data.hint_price;
                state.problem.level = res.data.level;
                state.problem.uid = res.data.uid;
                state.problem.author = res.data.author;
                state.problem.tag = res.data.tag;
                state.problem.annex = res.data.annex;
                state.problem.point = res.data.point;
                state.isHinted = res.data.is_hinted;
                state.isSolved = res.data.is_solved;
                state.isOpen = res.data.is_open;
                state.info.solved = res.data.info.solved;
                state.info.wa = res.data.info.wa;
                state.info.na = res.data.na;

                if (res.data.is_solved) {
                    getMyRateInfo()
                }

                if (res.data.is_hinted) {
                    state.problem.hint = res.data.hint
                }
                loadChart();
                state.problem.isLoading = false;
            } else {
                Notification.error({
                    message: '题目数据获取失败！'
                })
            }

            if (res.data.is_open) {
                loadDockerInfo()
            }
        })


        const handleClick = (tab: any, event: any) => {
            console.log(tab, event)
        }

        const handleOpenHint = () => {
            state.isDisplayBuyHintDialog = false;
            postOpenHintById(id).then(res => {
                if (res.code === 200) {
                    state.isHinted = true;
                    state.problem.hint = res.data.hint;
                } else if (res.code === 201) {
                    Notification.warning({message: "余额不足，购买提示失败。"});
                }
            })
        }

        const submitFlag = () => {
            postSubmitFlagById(id, state.flag).then(res => {
                if (res.code === 200) {
                    Notification.success({message: "恭喜成功解出本题！你可以在「我的评价」中添加评分。"});
                    state.isSolved = true;
                    getMyRateInfo();
                } else {
                    Notification.warning({message: "flag有误，请重新提交。"});
                }
            })
        }

        const handleMyInfoLevelChange = () => {
            if (state.myInfo.isRated) {
                Notification.info({message: "你已经提交过评分了！"});
            } else {
                putProblemLevelById(id, state.myInfo.level).then(res => {
                    if (res.code === 200) {
                        Notification.success({message: "感谢你的评分数据！"})
                    } else {
                        Notification.error({message: "评分出错！请稍后重试。"})
                    }
                });
            }
        }

        const loadDockerInfo = async () => {
            let res = await getDockerInfo(id);
            
            if (res.code == 200) {
                if (res.data.state == false) {
                    setTimeout(loadDockerInfo, 2000)
                } else {
                    state.isOpenAndLoading = false;
                    state.docker.url = res.data.url;
                    state.docker.remain = res.data.timeout;
                    state.docker.createDate = res.data.create_date;

                    let h = () => {
                        if (state.docker.remain > 0) {
                            state.docker.remain -= 1;
                            setTimeout(h, 1000);
                        }
                    };
                    h();
                }

                return true;
            } else if (res.code == 202) {
                state.noDocker = true;
                return true;
            }
            return false;
        }

        const handleOpenDocker = () => {
            postOpenDocker(id).then(res => {
                if (res.code == 200) {
                    state.isOpen = true;
                    state.isOpenAndLoading = true;

                    let func = () => {
                        if (!loadDockerInfo()) {
                            setTimeout(func, 2000)
                        }
                    }
                    func()
                }
            })
        }

        const handleCloseDocker = () => {
            postCloseDocker(id).then(res => {
                if (res.code == 200) {
                    state.isOpen = false;
                    state.isOpenAndLoading = false;
                    Notification.info({
                        message: '关闭docker成功'
                    })
                }
            })
        }

        const handleDelayDocker = () => {
            if (state.docker.remain < 60*5) {
                Notification.warning({
                    message: "剩余时长小于5分钟，无法延时！"
                })
            } else {
                postDelayDocker(id).then(res => {
                    if (res.code == 200) {
                        Notification.info({
                            message: '延长时间成功'
                        })
                    }
                })
            }
        }

        return {
            ...toRefs(state),

            handleClick,
            handleOpenHint,
            submitFlag,
            handleMyInfoLevelChange,
            
            dockerRemainPercentage,

            handleOpenDocker,
            handleCloseDocker,
            handleDelayDocker,
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