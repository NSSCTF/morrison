<template>
    <el-row v-nss-title="'管理界面'">
        <el-col :span="3">
            <div style="text-align: center;font-size: 32px;margin-bottom: 5px;background-color: rgba(46, 69, 172, 0.513)">
                <b>NSSCTF</b>
            </div>
            <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @select="openSubmenu"
            :unique-opened="true"
            >
                <el-menu-item index="1">
                    <template #title>
                        <span>信息统计</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="2">
                    <template #title>
                        <span>主页设置</span>
                    </template>
                </el-menu-item>
                <el-submenu index="3">
                    <template #title>
                        <span>文章管理</span>
                    </template>
                    <el-menu-item-group>
                        <template #title>我的</template>
                        <el-menu-item index="3-1">我的文章</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template #title>系统</template>
                        <el-menu-item index="3-2">全部文章</el-menu-item>
                        <el-menu-item index="3-3">分类管理</el-menu-item>
                        <el-menu-item index="3-4">新增文章</el-menu-item>
                        <el-menu-item index="3-5">导出数据</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template #title>
                        <span>题目管理</span>
                    </template>
                    <el-menu-item-group>
                        <template #title>我的</template>
                        <el-menu-item index="4-1">我的题目</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template #title>系统</template>
                        <el-menu-item index="4-2">全部题目</el-menu-item>
                        <el-menu-item index="4-3">新增题目</el-menu-item>
                        <el-menu-item index="4-4">批量新增</el-menu-item>
                        <el-menu-item index="4-5">导出数据</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                    <template #title>
                        <span>比赛管理</span>
                    </template>
                    <el-menu-item-group>
                        <template #title>我的</template>
                        <el-menu-item index="5-1">DIY比赛</el-menu-item>
                        <el-menu-item index="5-2">参加的比赛</el-menu-item>
                        <el-menu-item index="5-3">导出数据</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template #title>系统</template>
                        <el-menu-item index="5-4">全部比赛</el-menu-item>
                        <el-menu-item index="5-5">新增比赛</el-menu-item>
                        <el-menu-item index="5-6">导出数据</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                    <template #title>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item-group>
                        <template #title>团队</template>
                        <el-menu-item index="6-1">我的团队</el-menu-item>
                        <el-menu-item index="6-2">导出数据</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template #title>系统</template>
                        <el-menu-item index="6-3">全部用户</el-menu-item>
                        <el-menu-item index="6-4">全部团队</el-menu-item>
                        <el-menu-item index="6-5">邀请码</el-menu-item>
                        <el-menu-item index="6-6">导出数据</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
        <el-col :span="20" style="margin-left: 1rem;">
            <info-statistics v-if="activeIndex=='1'" />
            <home-setting v-else-if="activeIndex=='2'" />

            <my-article v-else-if="activeIndex=='3-1'" />
            <all-article v-else-if="activeIndex=='3-2'" />
            <category v-else-if="activeIndex=='3-3'" />
            <add-article v-else-if="activeIndex=='3-4'" />
            <note-export v-else-if="activeIndex=='3-5'" />

            <my-problem v-else-if="activeIndex=='4-1'" />
            <all-problem v-else-if="activeIndex=='4-2'" />
            <add-problem v-else-if="activeIndex=='4-3'" />
            <add-problems v-else-if="activeIndex=='4-4'" />
            <problem-export v-else-if="activeIndex=='4-5'" />

            <my-diy v-else-if="activeIndex=='5-1'" />
            <my-contest v-else-if="activeIndex=='5-2'" />
            <contest-my-export v-else-if="activeIndex=='5-3'" />
            <all-contest v-else-if="activeIndex=='5-4'" />
            <add-contest v-else-if="activeIndex=='5-5'" />
            <contest-export v-else-if="activeIndex=='5-6'" />
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";

import homeSetting from './setting.vue'
import infoStatistics from './statistics.vue'

import allTeam from './user/allteam.vue'
import allUser from './user/alluser.vue'
import userExport from './user/export.vue'
import invite from './user/invite.vue'
import userMyExport from './user/myexport.vue'
import myTeam from './user/myteam.vue'

import addContest from './contest/addcontest.vue'
import allContest from './contest/allcontest.vue'
import contestExport from './contest/export.vue'
import myContest from './contest/mycontest.vue'
import myDiy from './contest/mydiy.vue'
import contestMyExport from './contest/myexport.vue'

import addArticle from './note/addarticle.vue'
import allArticle from './note/allarticle.vue'
import category from './note/category.vue'
import noteExport from './note/export.vue'
import myArticle from './note/myarticle.vue'

import addProblem from './problem/addproblem.vue'
import addProblems from './problem/addproblems.vue'
import allProblem from './problem/allproblem.vue'
import problemExport from './problem/export.vue'
import myProblem from './problem/myproblem.vue'

export default {
    components: {
        homeSetting,
        infoStatistics,
        allTeam,
        allUser,
        userExport,
        invite,
        userMyExport,
        myTeam,
        addContest,
        allContest,
        contestExport,
        myContest,
        myDiy,
        contestMyExport,
        addArticle,
        allArticle,
        category,
        noteExport,
        myArticle,
        addProblem,
        addProblems,
        allProblem,
        problemExport,
        myProblem
    },
    setup() {
        const state = reactive({
            activeIndex: "4-3",
            isCollapse: 0
        });

        const openSubmenu = (index: string) => {
            state.activeIndex = index
        }


        return {
            ...toRefs(state),

            openSubmenu
        }
    }
}
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 400px;
}
</style>