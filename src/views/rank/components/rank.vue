<template>
    <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="16" v-loading="isLoading" element-loading-text="加载中...">
            <el-table :data="rankList" stripe style="width: 100%">
                <el-table-column prop="rank" label="排名" width="60" align="center"></el-table-column>
                <el-table-column prop="name" label="用户" width="115" align="center"></el-table-column>
                <el-table-column prop="team" label="团队" width="135" align="center">
                    <template #default="scope">
                        <span>{{scope.row.team==''?'暂无':scope.row.team}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="bio" label="个人介绍" align="center"></el-table-column>
                <el-table-column prop="rating" label="积分" width="80" align="center"></el-table-column>
                <el-table-column prop="rating_count" label="比赛数" width="65" align="center"></el-table-column>
                <el-table-column prop="score" label="题目积分" width="90" align="center"></el-table-column>
                <el-table-column prop="solves" label="解题数" width="65" align="center"></el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script lang="ts">import { reactive, toRefs } from "@vue/reactivity";
import { getUserRankListByPage } from '@/restful/user';

export default {
    setup() {
        const state = reactive({
            rankList: [{
                rank: 1,
                name: 'testtesta',
                team: '天枢天枢天枢天枢',
                rating: 1689,
                rating_count: 2,
                score: 81117,
                bio: "我们的征途是星辰大海我们的征途是星辰大海我们的征途是星辰大海",
                solves: 1
            }],
            isLoading: true,
        });
        
        getUserRankListByPage(1).then(res => {
            if (res.code == 200) {
                state.rankList = res.data
                state.isLoading = false;
            }
        })

        return {
            ...toRefs(state)
        }
    }
}
</script>