<template>
    <el-row>
        <el-col>
            <el-card>
                <el-button :disabled="mutipleSelection.length==0" @click="openSelection">开放所选</el-button>
                <el-button :disabled="mutipleSelection.length==0" @click="closeSelection">关闭所选</el-button>
                <el-button :disabled="mutipleSelection.length==0" @click="delSelection">删除所选</el-button>
                <el-table
                    v-loading="isLoading"
                    element-loading-text="加载中..."
                    :data="allProblem.slice((page-1)*pageSize,page*pageSize)"
                    @selection-change="handleSelectionChange"
                    border
                    style="width: 100%;margin-top: 1rem"
                >
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="title" label="标题" width="180"></el-table-column>
                    <el-table-column prop="user" label="用户" width="180"></el-table-column>
                    <el-table-column prop="type" label="类型" width="60"></el-table-column>
                    <el-table-column prop="docker" label="镜像名"></el-table-column>
                    <el-table-column prop="point" label="分数" width="60"></el-table-column>
                    <el-table-column prop="date" label="时间" width="110"></el-table-column>
                    <el-table-column label="通过率" width="110">
                        <template #default="scope">
                            <span>{{ `${scope.row.solved}/${scope.row.try}` }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="likes" label="被收藏数" width="50"></el-table-column>
                    <el-table-column label="状态" width="70">
                        <template #default="scope">
                            <span
                                :style="{ 'color': scope.row.state ? 'blue' : 'red' }"
                            >{{ scope.row.state ? '开放' : '非开放' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作项" width="130">
                        <template #default>
                            <el-link :underline="false" type="primary">
                                <i class="el-icon-refresh"></i>改变
                            </el-link>
                            <el-divider direction="vertical"></el-divider>
                            <el-link :underline="false" type="danger">
                                <i class="el-icon-circle-close"></i>删除
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <span style="text-align: center;">
                <el-pagination :hide-on-single-page="true" background layout="prev, pager, next" :total="total" :page-size="pageSize" v-model:current-page="page"></el-pagination>
            </span>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { reactive, toRefs } from "@vue/reactivity";
import '@/utils/format'
import { getProblemTotal,getProblemByPage } from "@/restful/admin";
import Notification from '@/utils/notification'

export default {
    setup() {
        const state = reactive({
            problems: [{
                title: "EZ",
                user: "Xenny",
                type: "WEB",
                docker: "xenny/ezproblem",
                point: 500,
                likes: 32,
                state: 0,
                solved: 1234,
                date: new Date().format('yyyy-MM-dd'),
                try: 6789,
            }],
            allProblem: [{
                title: "EZ",
                user: "Xenny",
                type: "WEB",
                docker: "xenny/ezproblem",
                point: 500,
                likes: 32,
                state: 0,
                solved: 1234,
                date: new Date().format('yyyy-MM-dd'),
                try: 6789,
            },{
                title: "E7Z",
                user: "Xenny",
                type: "WEB",
                docker: "xenny/ezproblem",
                point: 500,
                likes: 32,
                state: 0,
                solved: 1234,
                date: new Date().format('yyyy-MM-dd'),
                try: 6789,
            }] as any[],
            mutipleSelection: [] as any[],
            isLoading: false,
            page: 1,
            pageSize: 1,
            total: 50,
        });

        getProblemTotal().then((res: any) => {
            state.total = res.data;
        })

        getProblemByPage(1).then((res: any) => {
            state.allProblem.concat(res.data);
            state.isLoading = false;
        }).catch((res: any) => {
            Notification.error({
                message: "题目数据获取失败！"
            })
        })

        const handleSelectionChange = (val: any[]) => {
            state.mutipleSelection = val;
        }

        const openSelection = () => {

        }

        const closeSelection = () => {

        }

        const delSelection = () => {

        }

        return {
            ...toRefs(state),

            handleSelectionChange,
            openSelection,
            closeSelection,
            delSelection
        }
    }
}
</script>