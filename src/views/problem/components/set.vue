<template>
  <el-row>
    <el-col :span="2"> </el-col>
    <el-col :span="20" v-loading="isLoading">
      <el-page-header @back="goBack" :content="title">
      </el-page-header>
      <el-divider></el-divider>
      <el-table :data="tableData" style="width: 100%" stripe size="small">
        <el-table-column prop="id" label="ID" width="180" align="left"> </el-table-column>
        <el-table-column prop="title" label="Title" width="250" align="center">
          <template #default="scope">
            <router-link :to="'/problem/'+scope.row.id+'/'">{{scope.row.title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="author" width="200" label="Author" align="center">
          <template #default="scope">
            <router-link :to="'/user/'+scope.row.uid+'/'">{{scope.row.author}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="tag" width="500" label="Tag" align="center">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top">
                    <template #default v-if="scope.row.tag.length != 0">
                      <p>全部标签: {{ scope.row.tag.join(",") }}</p>
                    </template>
                    <template #reference>
                      <div class="name-wrapper">
                        <el-tag
                          size="medium"
                          v-for="(tag, index) in scope.row.tag.slice(0, 3)"
                          :key="index"
                          >{{ tag }}</el-tag
                        >
                      </div>
                    </template>
                  </el-popover>
          </template>
        </el-table-column>
        <el-table-column 
        :filters="[{text:'只看点赞', value: true}, {text: '只看没点赞', value: false}]"
        :filter-method="filterLike"
        prop="likes" label="Like" align="right">
            <template #default="scope">
              <i :class="scope.row.isLike ? 'el-icon-star-on' : 'el-icon-star-off'">{{scope.row.likes}}</i>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
      style="text-align: center;margin-top: 20px"
    background
    @current-change="toPage"
    :page-size="pageSize"
    layout="total, prev, pager, next, jumper"
    :total="dataTotal">
    </el-pagination>
    </el-col>
    <el-col :span="2"> </el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from 'vue';
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();
        const type = (route.params.type as string).toLowerCase();
        const state = reactive({
            isLoading: false,
            title: type.toUpperCase(),
            page: 1,
            pageSize: 20,
            dataTotal: 0,
        })

        const tableData = computed(() => {
            const problemData = store.getters['problem/getTableDataByType'](type);
            console.log(problemData.slice((state.page-1)*20,state.page*20))
            return problemData.slice((state.page-1)*20,state.page*20);
        });

        const toPage = (val: any) => {
          state.page = val;
        }

        const goBack = () => {
          router.back()
        }

        const filterLike = (value: any, row: any) => {
            return row.isLike === value;
        }
        store.dispatch('problem/setTableDataByType', {type: type}).then(() => {
          state.isLoading = false;
        })

        return {
            ...toRefs(state),

            tableData,

            toPage,
            goBack,
            filterLike
        }
    }
};
</script>
