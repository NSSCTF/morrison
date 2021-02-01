<template>
  <div>
    <el-row>
      <el-col>
        <div class="scaleProgress">
          <el-progress :percentage="50" stroke-linecap="square"></el-progress>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="((2 + isCollapse) % 3) + 2">
        <i
          @click="changeCollapse()"
          :class="'el-icon-' + collapseState"
          style="margin-bottom: 20px"
          >{{ collapseMsg }}</i
        >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-grape"></i>
              <span>Balderich</span>
            </template>
            <el-submenu
              v-for="(sm, i) in submenus"
              :key="sm.id"
              :index="'2-' + (i + 1)"
              @click="displayList(sm.id)"
            >
              <template #title>{{ sm.title }}</template>
              <el-menu-item
                v-for="(item, j) in sm.data"
                :key="item.id"
                :index="'2-' + (i + 1) + '-' + (j + 1)"
                @click="displayArticle(item.id)"
              >
                {{ item.title }}{{ j + 1 }}
              </el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-watermelon"></i>
            <template #title>BUUOJ</template>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-cherry"></i>
            <template #title>Other</template>
          </el-menu-item>
          <el-menu-item index="4" disabled>
            <i class="el-icon-apple"></i>
            <template #title>etc</template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="16 + isCollapse * 2">
        <el-container>
          <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="item in pathList" :key="item.id">{{
                item.title
              }}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-divider></el-divider>
          </el-header>
          <el-main>
            <el-table
              v-if="isTableDisplay"
              :data="tableData"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="标题"
                :formatter="formatter"
                align="center"
                width="400px"
              >
                <template #default="scope">
                  <p @click="displayArticle(scope.row.id)">{{
                    scope.row.address
                  }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="tags" label="标签" align="right">
                <template #default="scope">
                  <el-popover effect="light" trigger="hover" placement="top">
                    <template #default v-if="scope.row.tags.length">
                      <p>全部标签: {{ scope.row.tags.join(",") }}</p>
                    </template>
                    <template #reference>
                      <div class="name-wrapper">
                        <el-tag
                          size="medium"
                          v-for="(tag, index) in scope.row.tags.slice(0, 3)"
                          :key="index"
                          >{{ tag }}</el-tag
                        >
                      </div>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
            <selfArticle v-if="!isTableDisplay" :articleData="articleData"/>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <template #header>
            <div class="clearfix">
              <span><i class="el-icon-notebook-2" />Content</span>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import * as CD from "../../mock/comment.js";
import selfArticle from "./article";
import {getNoteById} from '@/restful/note'
export default {
  components: { selfArticle },
  setup() {
    const state = reactive({
      activeIndex: "",
      isCollapse: true,
      isTableDisplay: true,
      articleData: {},
      collapseState: "circle-plus",
      collapseMsg: "展开",
      submenus: [
        {
          title: "test",
          data: [
            {
              title: "test1",
            },
            {
              title: "test2",
            },
          ],
        },
      ],
      pathList: [
        {
          id: 1,
          title: "WP",
        },
        {
          id: 2,
          title: "BUUOJ",
        },
        {
          id: 3,
          title: "WEB1",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "第一个WP",
          tags: ["java", "CVE", "spring"],
        },
        {
          date: "2016-05-04",
          name: "王小虎3",
          address: "第二个WP",
          tags: ["Python", "flask", "debugger pin"],
        },
        {
          date: "2016-05-01",
          name: "王小虎1",
          address: "第三个WP第三个WP第三个WP第三个WP第三个WP第三个WP第三个WP",
          tags: ["NoSql", "XXE", "代码审计", "PHP"],
        },
        {
          date: "2016-05-03",
          name: "王小虎2",
          address: "第四个WP",
          tags: ["Mysql", "SSRF"],
        },
      ],
    });
    const changeCollapse = () => {
      if (state.isCollapse) {
        state.isCollapse = false;
        state.collapseState = "remove";
        state.collapseMsg = "收起";
      } else {
        state.isCollapse = true;
        state.collapseState = "circle-plus";
        state.collapseMsg = "展开";
      }
    };
    const commentData = reactive({
      commentData: CD.comment.data,
    });
    const displayArticle = (id) => {
      state.isTableDisplay = false
      getNoteById(1).then(res => {
        state.articleData = {
          id: res.data.notebook.id,
          title: res.data.notebook.title,
          author_id: res.data.notebook.author_id,
          author: res.data.author,
          tags: res.data.notebook.tags.split('|'),
          content: res.data.content,
          views: res.data.notebook_info.views,
          stars: res.data.notebook_info.stars,
          votes: res.data.notebook_info.votes,
          isLoading: false
        }
      })
      // console.log(data.data)
    }
    return {
      ...toRefs(state),
      ...toRefs(commentData),
      changeCollapse,
      displayArticle
    };
  },
  methods: {
    // displayArticle: (id) => {
    //   data = getNoteById(1)
    //   console.log(data)
    // },
    displayList: (id) => {},
  },
};
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.scaleProgress {
  transform: scaleY(0.75);
  overflow: hidden;
  z-index: 9999;
  position: fixed;
  padding: 5px;
  text-align: center;
  width: 104%;
  height: 22px;
  top: -15px;
  left: -16px;
  // margin-top: -5%;
}
</style>