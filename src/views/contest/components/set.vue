<template>
    <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="16" v-loading="isLoading" element-loading-text="加载中...">
            <span>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="dataTotal"
                    :page-size="4"
                    v-model:current-page="currentPage"
                ></el-pagination>
            </span>
            <ul class="contest-list">
                <li
                    v-for="(item, index) in filterData.slice((currentPage-1)*4, currentPage*4)"
                    :key="index"
                >
                    <img src="base://Q" />
                    <div class="contest-info">
                        <span class="contest-header">{{ item.title }}</span>
                        <p>
                            <span>
                                参赛方式：
                                <el-tag size="small">{{ item.is_team ? '组队' : '个人' }}</el-tag>
                            </span>
                            <span
                                style="padding-left: 10%"
                            >时间：{{ contestDateFormat(item.start_date) }} - {{ contestDateFormat(item.ends_date) }}</span>
                        </p>
                        <p class="contest-desc">{{ item.desc }}</p>
                    </div>
                    <div class="contest-button">
                        <router-link :to="`/contest/${item.id}/`">
                            <el-button
                            :type="['primary', 'warning', 'info'][item.state]"
                        >{{ ['未开始', '比赛中', '已结束'][item.state] }}</el-button>
                        </router-link>
                        
                    </div>
                </li>
                <li v-if="filterData.length == 0">
                    <div style="text-align: center;width: 100%;">
                        <p style="font-size: 48px;color: rgba(71, 65, 65, 0.555)">No Data Here.</p>
                    </div>
                </li>
            </ul>
        </el-col>
        <el-col :span="4"></el-col>
    </el-row>
</template>

<script lang="ts">
import { reactive, toRefs, watch } from "vue";
import { getAllContestInfo} from '@/restful/contest'

export default {
    setup() {
        const state = reactive({
            contestData: [] as any[],
            filterData: [{
                title: '第一次比赛',
                id: '1',
                start_date: 1614315595770,
                ends_date: 1614345595770,
                is_team: false,
                desc: '记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记...',
                state: 0, // 未开始，比赛中，已结束
            }] as any[],
            allData: [],

            isLoading: false,
            dataTotal: 10,
            currentPage: 1,
            displayRegisterDialog: false,
            selectIndex: 0,
        });

        getAllContestInfo().then(res => {
            if (res.code == 200) {
                state.allData = res.data;
                state.filterData = res.data;
                state.dataTotal = res.data.length;
                changePage(state.currentPage);
                state.isLoading = false;
            }
        })

        const changePage = (page: number) => {
            state.contestData = state.filterData.slice((page - 1) * 4, page * 4);
        }

        watch(
            () => state.currentPage,
            (page) => {
                changePage(page)
            }
        )

        const contestDateFormat = (value: number) => {
            let date = new Date(value);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();

            const hour = date.getHours()
            const minute = date.getMinutes();
            return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`
        }

        return {
            ...toRefs(state),

            contestDateFormat,
        }
    }
}
</script>

<style lang="scss">
.contest-list {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 10px;
}

.contest-list li {
    border: solid 1px gray;
    border-radius: 5px;
    height: 160px;
    display: flex;
    padding: 5px 5px;
}

.contest-list li img {
    width: 25%;
    height: 100%;
}

.contest-info {
    padding: 0;
    margin: 0;
    width: 55%;
    margin-left: 20px;
}

.contest-button {
    width: 15%;
    margin-left: 5%;
    height: 100%;
    // vertical-align: middle;
    padding: 5% 0;
    line-height: 100%;
}

.contest-header {
    font-size: 28px;
}

.contest-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.el-button {
    // vertical-align: middle;
}
</style>