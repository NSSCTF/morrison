<template>
    <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="16">
            <span>
            <el-pagination background layout="prev, pager, next" :total="dataTotal" :page-size="4" v-model:current-page="currentPage"></el-pagination>
            </span>
            <ul class="contest-list">
                <li v-for="(item, index) in filterData.slice((currentPage-1)*4, currentPage*4)" :key="index">
                    <img src="base://Q" />
                    <div class="contest-info">
                        <span class="contest-header">{{item.title}}</span>
                        <p>
                            <span>参赛方式：<el-tag size="small">{{item.is_team ? '组队' : '个人'}}</el-tag></span>
                            <span style="padding-left: 10%">时间：{{contestDateFormat(item.start_date)}} - {{contestDateFormat(item.ends_date)}}</span>
                        </p>
                        <p>{{item.desc}}</p>
                    </div>
                    <div class="contest-button">
                        <router-link :to="`/contest/${item.id}/`"><el-button>进入</el-button></router-link>
                        <el-button :disabled="item.state != 1" :type="item.my_state ? 'success' : ['', 'primary', 'warning', 'info'][item.state]" >{{item.my_state ? '已报名' : ['准备中', '可报名', '比赛中', '已结束'][item.state]}}</el-button>
                    </div>
                </li>
            </ul>
        </el-col>
        <el-col :span="4"></el-col>
    </el-row>
</template>

<script lang="ts">
import { reactive, toRefs, watch } from "vue";
import { getAllContestInfo } from '@/restful/contest'

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
                desc: '笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记...',
                state: 0,
                my_state: 0,
            }] as any[],
            allData: [],

            dataTotal: 10,
            currentPage: 1
        });

        getAllContestInfo().then(res => {
            if (res.code == 200) {
                state.allData = res.data.info;
                state.filterData = res.data.info;
                state.dataTotal = res.data.info.length();
                changePage(state.currentPage);
            }
        })

        const changePage = (page: number) => {
            state.contestData = state.filterData.slice((page-1)*4, page*4);
        }

        watch(
            () => state.currentPage,
            (page) => {
                // changePage(page)
            } 
        )

        const contestDateFormat = (value: number) => {
            let date = new Date(value);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDay();
            
            const hour = date.getHours()
            const minute = date.getMinutes();
            return `${year}-${month < 10 ? '0'+month : month}-${day < 10 ? '0'+day : day} ${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute}`
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
    border: solid 1px grey;
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

.el-button {
    // vertical-align: middle;
}
</style>