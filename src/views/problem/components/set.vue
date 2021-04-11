<template>
  <el-row v-nss-title="'题目列表'">
    <el-col :span="2"></el-col>
    <el-col :span="20" v-loading="isLoading">
      <div>
        <ul class="setheader">
          <span class="element">来源：</span>
          <li>
            <span
              :class="setSourceNavActiveId == 0 ? 'is-active' : ''"
              @click="changeSourceId(0)"
            >All</span>
          </li>
          <li>
            <span
              :class="setSourceNavActiveId == 1 ? 'is-active' : ''"
              @click="changeSourceId(1)"
            >NSSCTF</span>
          </li>
          <li>
            <span
              :class="setSourceNavActiveId == 2 ? 'is-active' : ''"
              @click="changeSourceId(2)"
            >BUUOJ</span>
          </li>
        </ul>
        <ul class="setheader">
          <span class="element">类型：</span>
          <li>
            <span :class="setTypeNavActiveId == 0 ? 'is-active' : ''" @click="changeTypeId(0)">All</span>
          </li>
          <li>
            <span :class="setTypeNavActiveId == 1 ? 'is-active' : ''" @click="changeTypeId(1)">WEB</span>
          </li>
          <li>
            <span :class="setTypeNavActiveId == 2 ? 'is-active' : ''" @click="changeTypeId(2)">PWN</span>
          </li>
          <li>
            <span :class="setTypeNavActiveId == 3 ? 'is-active' : ''" @click="changeTypeId(3)">REVERSE</span>
          </li>
          <li>
            <span
              :class="setTypeNavActiveId == 4 ? 'is-active' : ''"
              @click="changeTypeId(4)"
            >CRYPTO</span>
          </li>
          <li>
            <span
              :class="setTypeNavActiveId == 5 ? 'is-active' : ''"
              @click="changeTypeId(5)"
            >MISC</span>
          </li>
          <li>
            <span
              :class="setTypeNavActiveId == 6 ? 'is-active' : ''"
              @click="changeTypeId(6)"
            >ANDROID</span>
          </li>
          <li>
            <span
              :class="setTypeNavActiveId == 7 ? 'is-active' : ''"
              @click="changeTypeId(7)"
            >ETH</span>
          </li>
          <li>
            <span
              :class="setTypeNavActiveId == 8 ? 'is-active' : ''"
              @click="changeTypeId(8)"
            >IOT</span>
          </li>
          <li>
            <span
              :class="setTypeNavActiveId == 9 ? 'is-active' : ''"
              @click="changeTypeId(9)"
            >AI</span>
          </li>
          <li>
            <span
              :class="setTypeNavActiveId == 10 ? 'is-active' : ''"
              @click="changeTypeId(10)"
            >EGG</span>
          </li>
        </ul>
        <transition name="fade">
          <div v-if="displaySearchPane == true">
            <el-form :model="search" label-width="100px" label-position="right">
              <el-form-item label="Tag查询：">
                <el-radio-group v-model="search.tagType">
                  <el-radio :label="0">与查询</el-radio>
                  <el-radio :label="1">或查询</el-radio>
                  <el-radio :label="2">非查询</el-radio>
                  <el-radio :label="3">尽量多</el-radio>
                  <el-radio :label="4">尽量少</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="Tag：">
                <el-tag
                  :key="tag"
                  v-for="tag in search.tag"
                  closable
                  :disable-transitions="false"
                  @close="handleTagClose(tag)"
                  style="margin-left: 15px"
                >{{ tag }}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="tagInputVisible"
                  v-model="tagInputValue"
                  size="small"
                  maxlength="8"
                  show-word-limit
                  style="width: 10%;margin-left: 15px"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                ></el-input>
                <el-button
                  v-else-if="search.tag.length < 8"
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                >+ New Tag</el-button>
              </el-form-item>
              <el-form-item label="用户：">
                <el-input style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item label="日期：">
                <el-date-picker
                  v-model="search.date"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :shortcuts="shortcuts"
                ></el-date-picker>
              </el-form-item>
            </el-form>
          </div>
        </transition>
        <div style="text-align: center;color: grey">
          <span @click="displaySearchPane = !displaySearchPane">
            <i :class="displaySearchPane ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
            {{ displaySearchPane ? '收起高级搜索选项' : '展开高级搜索选项' }}
          </span>
        </div>
      </div>
      <el-divider></el-divider>
      <el-table
        v-loading="problemLoading"
        element-loading-text="加载中..."
        :data="tableData"
        style="width: 100%"
        size="small"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="id" label="ID" width="180" align="left"></el-table-column>
        <el-table-column prop="title" label="Title" width="250" align="center">
          <template #default="scope">
            <router-link :to="'/problem/' + scope.row.id + '/'">{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="author" width="200" label="Author" align="center">
          <template #default="scope">
            <router-link :to="'/user/' + scope.row.uid + '/'">{{ scope.row.author }}</router-link>
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
                  >{{ tag }}</el-tag>
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          :filters="[{ text: '只看点赞', value: true }, { text: '只看没点赞', value: false }]"
          :filter-method="filterLike"
          prop="likes"
          label="Like"
          align="right"
        >
          <template #default="scope">
            <i
              :class="scope.row.isLike ? 'el-icon-star-on' : 'el-icon-star-off'"
              @click="changeLikeState(scope.row.id, scope.row.isLike)"
            >{{ scope.row.likes }}</i>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center;margin-top: 20px"
        background
        @current-change="toPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="dataTotal"
      ></el-pagination>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>

<script lang="ts">
import { putProblemLikeState } from '@/restful/problem';
import { computed, reactive, toRefs, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Notification from '@/utils/notification'

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      setSourceNavActiveId: 0,
      setTypeNavActiveId: 0,
      displaySearchPane: false,

      tagInputVisible: false,
      tagInputValue: '',

      search: {
        tag: [] as any[],
        tagType: 0,
        date: ''
      },

      isLoading: true,
      problemLoading: true,
      page: 1,
      pageSize: 20,
      dataTotal: 0,

      tableData: [],

      shortcuts: [{
        text: '最近一周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        })(),
      }, {
        text: '最近一个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        })(),
      }, {
        text: '最近三个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        })(),
      }],
    })

    const handleTagClose = (tag: string) => {
      state.search.tag.splice(state.search.tag.indexOf(tag), 1);
    }

    const showInput = async () => {
      state.tagInputVisible = true;
    }

    const handleInputConfirm = () => {
      let inputValue = state.tagInputValue;
      if (inputValue) {
        state.search.tag.push(inputValue);
      }
      state.tagInputVisible = false;
      state.tagInputValue = '';
    }


    const toPage = async (val: any) => {
      state.page = val;
      state.problemLoading = true;
      await store.dispatch('problem/setTableDataBySourceAndType', { source: state.setSourceNavActiveId, type: state.setTypeNavActiveId });
      state.tableData = store.getters['problem/getTableDataBySourceAndType'](state.setSourceNavActiveId, state.setTypeNavActiveId);
      state.problemLoading = false;
    }

    const goBack = () => {
      router.back()
    }

    const filterLike = (value: any, row: any) => {
      return row.isLike === value;
    }
    store.dispatch('problem/setTableDataBySourceAndType', { source: state.setSourceNavActiveId, type: state.setTypeNavActiveId }).then(() => {
      state.dataTotal = store.getters['problem/getTableDataBySourceAndType'](state.setSourceNavActiveId, state.setTypeNavActiveId).length;
      state.isLoading = false;
      toPage(1)
    })

    const tableRowClassName = ({ row, rowIndex }: any) => {
      if (row.state == 1) {
        return 'warning-row';
      } else if (row.state == 2) {
        return 'success-row';
      }
      return '';
    }

    const changeSourceId = (val: number) => {
      state.setSourceNavActiveId = val;
      store.dispatch('problem/setTableDataBySourceAndType', { source: state.setSourceNavActiveId, type: state.setTypeNavActiveId }).then(() => {
        state.dataTotal = store.getters['problem/getTableDataBySourceAndType'](state.setSourceNavActiveId, state.setTypeNavActiveId).length;
        state.isLoading = false;
        toPage(1)
      })
    }

    const changeTypeId = (val: number) => {
      state.setTypeNavActiveId = val;
      store.dispatch('problem/setTableDataBySourceAndType', { source: state.setSourceNavActiveId, type: state.setTypeNavActiveId }).then(() => {
        state.dataTotal = store.getters['problem/getTableDataBySourceAndType'](state.setSourceNavActiveId, state.setTypeNavActiveId).length;
        state.isLoading = false;
        toPage(1)
      })
    }

    const changeLikeState = (pid: number, s: boolean) => {
      putProblemLikeState(pid, !s).then((res: any) => {
        if (res.code == 200) {
          if (res.data.state) {
            Notification.info({
              message: "收藏题目成功。"
            });
          } else {
            Notification.info({
              message: "取消收藏成功。"
            })
          }
          store.dispatch('problem/setTableDataBySourceAndType', { source: state.setSourceNavActiveId, type: state.setTypeNavActiveId });
        } else if (res.code == 403) {
          Notification.info({
            message: "请先登录！"
          });
          router.push({
            path: '/user/login',
            query: { redirect: route.path }
          });
        }
      })
    }

    return {
      ...toRefs(state),

      tableRowClassName,

      toPage,
      goBack,
      filterLike,
      changeLikeState,
      changeSourceId,
      changeTypeId,

      handleTagClose,
      handleInputConfirm,
      showInput
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #c2fda3;
}

.setheader {
  display: flex;
  margin-left: -35px;

  li {
    list-style-type: none;
    list-style: none;
  }

  span {
    display: block;
    padding: 0.5rem 1rem;
    color: #666666;
  }

  span:hover {
    color: #101b27;
    font-weight: 400;
  }

  .is-active {
    border: 1px solid #3a8ee6;
    background: #3a8ee6;
    color: #fff;
    border-radius: 5px;
  }
}

span.label {
  display: block;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  color: #666666;
}
</style>