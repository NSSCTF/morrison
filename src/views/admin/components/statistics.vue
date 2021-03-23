<template>
    <el-row>
        <el-col :span="12">
            <el-card>
                <div style="font-size: 1.2rem;margin-bottom: 6px">
                    <b>Balderich总信息面板</b>
                </div>
                <div class="prog-card">
                    <el-progress
                        type="dashboard"
                        :percentage="balderichInfo.total.cpu"
                        :color="progColors"
                    ></el-progress>
                    <span>CPU占用率</span>
                </div>
                <div class="prog-card">
                    <el-progress
                        type="dashboard"
                        :percentage="balderichInfo.total.ram"
                        :color="progColors"
                    ></el-progress>
                    <span>内存占用率</span>
                </div>
                <div class="prog-card">
                    <el-progress
                        type="dashboard"
                        :percentage="balderichInfo.total.rom"
                        :color="progColors"
                    ></el-progress>
                    <span>硬盘占用率</span>
                </div>
                <div class="prog-info">
                    <span>CPU信息：{{ balderichInfo.total.cpus }} Cores</span>
                    <span>内存信息：{{ balderichInfo.total.rams }} GB</span>
                    <span>硬盘信息：{{ balderichInfo.total.roms }} GB</span>
                </div>
                <el-collapse style="margin-top: 18px;" accordion>
                    <el-collapse-item>
                        <template #title>
                            平台信息
                            <i class="header-icon el-icon-info"></i>
                        </template>
                        <el-card v-for="(serve, index) in balderichInfo.serves" :key="index">
                            <div class="prog-card">
                                <el-progress
                                    width="96"
                                    type="dashboard"
                                    :percentage="serve.cpu"
                                    :color="progColors"
                                ></el-progress>
                                <span>CPU占用率</span>
                            </div>
                            <div class="prog-card">
                                <el-progress
                                    width="96"
                                    type="dashboard"
                                    :percentage="serve.ram"
                                    :color="progColors"
                                ></el-progress>
                                <span>内存占用率</span>
                            </div>
                            <div class="prog-card">
                                <el-progress
                                    width="96"
                                    type="dashboard"
                                    :percentage="serve.rom"
                                    :color="progColors"
                                ></el-progress>
                                <span>硬盘占用率</span>
                            </div>
                            <div class="prog-info2">
                                <span>IP：{{ serve.ip }}</span>
                                <span>CPU信息：{{ serve.cpus }}</span>
                                <span>内存信息：{{ serve.rams }}</span>
                                <span>硬盘信息：{{ serve.roms }}</span>
                            </div>
                        </el-card>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </el-col>
        <el-col :span="11" style="margin-left: 3.5rem">
            <el-card>
                <div style="font-size: 1.2rem;margin-bottom: 6px">
                    <b>Anna总信息面板</b>
                </div>
                <div class="prog-card">
                    <el-progress
                        type="dashboard"
                        :percentage="annaInfo.total.cpu"
                        :color="progColors"
                    ></el-progress>
                    <span>CPU占用率</span>
                </div>
                <div class="prog-card">
                    <el-progress
                        type="dashboard"
                        :percentage="annaInfo.total.ram"
                        :color="progColors"
                    ></el-progress>
                    <span>内存占用率</span>
                </div>
                <div class="prog-card">
                    <el-progress
                        type="dashboard"
                        :percentage="annaInfo.total.rom"
                        :color="progColors"
                    ></el-progress>
                    <span>硬盘占用率</span>
                </div>
                <div class="prog-info">
                    <span>容器数量：{{ annaInfo.total.dockers }}</span>
                    <span>CPU信息：{{ annaInfo.total.cpus }} Cores</span>
                    <span>内存信息：{{ annaInfo.total.rams }} GB</span>
                    <span>硬盘信息：{{ annaInfo.total.roms }} GB</span>
                </div>
                <el-collapse style="margin-top: 18px;" accordion>
                    <el-collapse-item>
                        <template #title>
                            平台信息
                            <i class="header-icon el-icon-info"></i>
                        </template>
                        <el-card v-for="(serve, index) in annaInfo.serves" :key="index">
                            <div class="prog-card">
                                <el-progress
                                    width="88"
                                    type="dashboard"
                                    :percentage="serve.cpu"
                                    :color="progColors"
                                ></el-progress>
                                <span>CPU占用率</span>
                            </div>
                            <div class="prog-card">
                                <el-progress
                                    width="88"
                                    type="dashboard"
                                    :percentage="serve.ram"
                                    :color="progColors"
                                ></el-progress>
                                <span>内存占用率</span>
                            </div>
                            <div class="prog-card">
                                <el-progress
                                    width="88"
                                    type="dashboard"
                                    :percentage="serve.rom"
                                    :color="progColors"
                                ></el-progress>
                                <span>硬盘占用率</span>
                            </div>
                            <div class="prog-info2">
                                <span>容器数量：{{ serve.dockers }}</span>
                                <span>CPU信息：{{ serve.cpus }}</span>
                                <span>内存信息：{{ serve.rams }}</span>
                                <span>硬盘信息：{{ serve.roms }}</span>
                            </div>
                        </el-card>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </el-col>
    </el-row>
    <el-row style="margin-top: 1.5rem">
        <el-col :span="24">
            <el-table
                :data="tableData"
                @selection-change="handleSelectionChange"
                max-height="500"
                border
                stripe
                style="width: 100%"
            >
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="problem" label="题目" width="150"></el-table-column>
                <el-table-column prop="user" label="用户" width="150"></el-table-column>
                <el-table-column prop="state" label="状态" width="100">
                    <template #default="scope">
                        <span :style="{color: scope.row.state == 0 ? 'blue' : (scope.row.state == 1 ? 'green' : 'gray')}">
                            <i :class="scope.row.state == 0 ? 'el-icon-loading' : (scope.row.state == 1 ? 'el-icon-video-play': 'el-icon-video-pause')"></i>
                            {{ scope.row.state == 0 ? "启动中" : (scope.row.state == 1 ? "运行中" : "已停止" )}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="创建时间" width="160"></el-table-column>
                <el-table-column prop="url" label="地址">
                    <template #default="scope">
                        <el-link :href="scope.row.url" type="primary" target="_blank">{{scope.row.url}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="use" label="资源使用" width="270"></el-table-column>
                <el-table-column label="操作项" width="250">
                    <template #default>
                        <el-link :underline="false" type="primary">
                            <i class="el-icon-video-pause"></i>停止
                        </el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link :underline="false" type="danger">
                            <i class="el-icon-refresh-left"></i>回滚
                        </el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link :underline="false" type="danger">
                            <i class="el-icon-circle-close"></i>回收
                        </el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link :underline="false" type="primary">
                            <i class="el-icon-refresh"></i>重启
                        </el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'
import '@/utils/format'

export default {
    setup() {
        const store = useStore();
        const state = reactive({
            progColors: [
                { color: '#f56c6c', percentage: 99 },
                { color: '#e6a23c', percentage: 80 },
                { color: '#5cb87a', percentage: 60 },
                { color: '#1989fa', percentage: 40 },
                { color: '#6f7ad3', percentage: 20 }
            ],
            tableData: [{
                problem: 'EasyLogin',
                user: 'Xenny',
                date: (new Date()).format("yyyy-MM-dd hh:mm"),
                url: "http://ctfer.vip:2000/",
                state: 1,
                use: "CPU: 10%;RAM: 1.2GB;ROM: 2GB"
            }, {
                problem: 'EasyLogin',
                user: 'Xenny',
                date: (new Date()).format("yyyy-MM-dd hh:mm"),
                url: "http://ctfer.vip:2000/",
                state: 1,
                use: "CPU: 10%;RAM: 1.2GB;ROM: 2GB"
            }, {
                problem: 'EasyLogin',
                user: 'Xenny',
                date: (new Date()).format("yyyy-MM-dd hh:mm"),
                url: "http://ctfer.vip:2000/",
                state: 0,
                use: "CPU: 10%;RAM: 1.2GB;ROM: 2GB"
            }, {
                problem: 'EasyLogin',
                user: 'Xenny',
                date: (new Date()).format("yyyy-MM-dd hh:mm"),
                url: "http://ctfer.vip:2000/",
                state: 0,
                use: "CPU: 10%;RAM: 1.2GB;ROM: 2GB"
            }, {
                problem: 'EasyLogin',
                user: 'Xenny',
                date: (new Date()).format("yyyy-MM-dd hh:mm"),
                url: "http://ctfer.vip:2000/",
                state: 1,
                use: "CPU: 10%;RAM: 1.2GB;ROM: 2GB"
            }, {
                problem: 'EasyLogin',
                user: 'Xenny',
                date: (new Date()).format("yyyy-MM-dd hh:mm"),
                url: "http://ctfer.vip:2000/",
                state: 2,
                use: "CPU: 10%;RAM: 1.2GB;ROM: 2GB"
            }],
            multipleSelection: [] as any[]
        });
        
        const balderichInfo = computed(() => store.getters['admin/getBalderichInfo']);
        const annaInfo = computed(() => store.getters['admin/getAnnaInfo']);

        const handleSelectionChange = (val: any[]) => {
            state.multipleSelection = val;
        }



        return {
            ...toRefs(state),

            balderichInfo,
            annaInfo,

            handleSelectionChange
        }
    }
}
</script>

<style lang="scss">
.prog-card {
    display: inline-block;
    text-align: center;
    padding-right: 20px;
    // padding-inline-end: 0px;
}

.prog-card .el-progress {
    display: block;
}

.prog-card > span {
    display: block;
}

.prog-info {
    display: inline-block;
    vertical-align: top;
}

.prog-info > span {
    display: block;
    margin-top: 15px;
}

.prog-info2 {
    display: inline-block;
    vertical-align: top;
}

.prog-info2 > span {
    display: block;
    margin-top: 5px;
}
</style>