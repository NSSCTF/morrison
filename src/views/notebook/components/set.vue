<template>
  <div>
    <el-row>
      <el-col>
        <div class="scaleProgress">
          <el-progress :percentage="processPercentage" stroke-linecap="square"></el-progress>
        </div>
      </el-col>
    </el-row>
    <el-row v-loading="loadingId == -1" type="flex">
      <el-col :span="((2 + (isCollapse?1:0)) % 3) + 2">
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
          @open="openSubmenu"
        >
          <el-submenu
            v-for="(item, index) in setData"
            :index="item.id"
            :key="item.id"
            :disabled="item.count == 0"
          >
            <template #title>
              <i :class="iconList[index]"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-submenu
              v-for="sm in submenus[item.id]"
              :key="sm.id"
              :index="item.id + '-' + sm.id"
              :disabled="sm.count == 0"
            >
              <template #title
                ><p @click="displayList(item.id + '-' + sm.id)">
                  {{ sm.title }}
                </p></template
              >
              <el-menu-item
                v-for="d in submenus[item.id + '-' + sm.id]"
                :key="d.id"
                :index="item.id + '-' + sm.id + '-' + d.id"
                @click="displayArticle(d.id)"
              >
                {{ d.title }}
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="16 + isCollapse * 2">
        <el-container>
          <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="item in pathList"
                :key="item.id"
                @click="item.id < 0 ? false : displayList(item.id)"
                ><a href="javascript:;">{{ item.title }}</a></el-breadcrumb-item
              >
            </el-breadcrumb>
            <el-divider></el-divider>
          </el-header>
          <el-main>
            <el-table
              v-if="displayId == 1"
              v-loading="loadingId == 1"
              :data="submenus[displayIndex]"
              style="width: 100%"
              stripe
            >
              <el-table-column prop="title" label="标题">
                <template #default="scope">
                  <p
                    @click="
                      displayList(
                        (displayIndex == 0 ? '' : displayIndex + '-') +
                          scope.row.id
                      )
                    "
                    v-if="scope.row.count > 0"
                  >
                    {{ scope.row.title }}
                  </p>
                  <p v-else>{{ scope.row.title }}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="count"
                label="文章数"
                align="center"
                width="180"
              >
                <template #default="scope">
                  <p>{{ displayIndex == 0 ? "/" : scope.row.count }}</p>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              v-if="displayId == 2"
              v-loading="loadingId == 2"
              :data="submenus[displayIndex]"
              style="width: 100%"
              stripe
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column
                prop="date"
                label="日期"
                :formatter="formatDate"
                width="180"
              >
              </el-table-column>
              <el-table-column prop="author" label="姓名" width="180">
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题"
                align="center"
                width="400px"
              >
                <template #default="scope">
                  <p @click="displayArticle(scope.row.id)">
                    {{ scope.row.title }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="tag" label="标签" align="right">
                <template #default="scope">
                  <el-popover effect="light" trigger="hover" placement="top">
                    <template #default v-if="scope.row.tag.length != 0">
                      <p>全部标签: {{ scope.row.tag.replaceAll("|", ",") }}</p>
                    </template>
                    <template #reference>
                      <div class="name-wrapper">
                        <el-tag
                          size="medium"
                          v-for="(tag, index) in scope.row.tag
                            .split('|')
                            .slice(0, 3)"
                          :key="index"
                          >{{ tag }}</el-tag
                        >
                      </div>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
            <selfArticle v-if="displayId == 3" :articleData="articleData" />
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always" style="position: fixed;min-width: 250px">
          <template #header>
            <div class="clearfix">
              <span><i class="el-icon-notebook-2" />Content</span>
            </div>
          </template>
          <el-tree
            :data="articleData.navList"
            :props="{ label: 'title', children: 'children' }"
            @node-click="pageJump"
          >
          </el-tree>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, toRefs,onMounted, computed } from "vue";
import * as CD from "../../../mock/comment.js";
import selfArticle from "./article";
import {
  getNoteById,
  getSetById,
  getCategoryByIdAndSubId,
  getNoteListBySetIdAndTypeId,
} from "@/restful/note";
import { useRoute } from "vue-router";
import { mapGetters, useStore } from "vuex"
import handleNavTree from '@/utils/note/content'

export default {
  components: { selfArticle },
  setup() {
    const router = useRoute();
    const store = useStore();
    const type = router.params.type.toLowerCase();

    const state = reactive({
      activeIndex: "",
      isCollapse: true,
      displayIndex: 0,
      displayId: 3,
      loadingId: -1,
      processPercentage: 0,
      articleData: {
        isLoading: false,
        navList: []
      },
      collapseState: "circle-plus",
      collapseMsg: "展开",
      iconList: [
        "el-icon-grape",
        "el-icon-watermelon",
        "el-icon-cherry",
        "el-icon-apple",
        "el-icon-pear",
        "el-icon-orange",
        "el-icon-coffee",
        "el-icon-cherry",
        "el-icon-lollipop",
        "el-icon-sugar",
        "el-icon-ice-cream-round",
        "el-icon-ice-cream",
        "el-icon-cold-drink",
      ],
      
      pathList: [],
    });
    
    store.dispatch('note/initSetData', {
      type: type
    }).then(() => {
      state.loadingId = 0;
    })
    state.pathList[0] = {id: 0, title: router.params.type.toUpperCase()}

    const submenus = computed(() => {
      console.log(store.getters['note/getSubmenusByType'](type))
      return store.getters['note/getSubmenusByType'](type);
    })

    const setData = computed(() => {
      return store.getters['note/getSetDataByType'](type);
    })

    const titles = computed(() => {
      return store.getters['note/getTitlesByType'](type);
    })

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
      state.displayId = 3;
      state.articleData.isLoading = true;
      getNoteById(parseInt(id)).then((res) => {
        state.articleData = {
          id: res.data.id,
          title: res.data.title,
          author_id: res.data.uid,
          author: res.data.author,
          tags: res.data.tag.split("|"),
          content: res.data.content,
          views: res.data.info.views,
          likes: res.data.info.likes,
          isLike: res.data.like,
          isLoading: false,
        };
        state.pathList.push({
          id: -id,
          title: res.data.title
        })
        state.articleData.navList = handleNavTree(res.data.content, 2, 3);
      });
    };

    const getScrollBarPosition = () => {
        return document.body.scrollTop || document.documentElement.scrollTop
    };

    const getScrollBarMax = () => {
      return document.body.scrollMax || document.documentElement.scrollTopMax
    }

    const moveScrollBar = (pos, interval) => {
      if (!window.scrollTo) return false
      window.onmousewheel = () => false
      if (document.body.movement) clearTimeout(document.body.movement)
      let currentPos = getScrollBarPosition()

      let dist = 0
      if (currentPos === pos) {
          window.onmousewheel = () => true
          return true
      } else if (currentPos < pos) {
          dist = Math.ceil((pos - currentPos) / 10)
          currentPos += dist
      } else if (currentPos > pos) {
          dist = Math.ceil((currentPos - pos) / 10)
          currentPos -= dist
      }

      const scrTop = getScrollBarPosition()

      window.scrollTo(0, currentPos)

      if (getScrollBarPosition() === scrTop) {
          window.onmousewheel = () => true
          return true
      }

      document.body.movement = setTimeout(function () {
          moveScrollBar(pos, interval)
      }, interval)
    };

    const pageJump = (a) => {
      console.log(a.index)
      let anchor = document.getElementById('head-'+a.index);
      moveScrollBar(anchor.offsetTop);
    }

    const displayList = (index) => {
      let indexs = String(index).split("-");
      if (parseInt(indexs[0]) === 0) {
        state.displayId = 1;
        state.displayIndex = 0;
      } else if (indexs.length == 1) {
        state.loadingId = 1;
        state.displayId = 1;
        state.displayIndex = index;
      } else {
        state.loadingId = 2;
        state.displayId = 2;
        state.displayIndex = index;
      }
      store.dispatch('note/displayList', {
        type: type,
        index: String(index),
      }).then(() => {
        state.loadingId = 0;
      })
      state.pathList = [state.pathList[0]];
      let id = "";
      for (let item of indexs) {
        id += item
        state.pathList.push({
          id: id,
          title: store.getters['note/getTitlesByTypeAndId'](type)(id),
        });
        id += "-";
      }
    };

    const openSubmenu = (index) => {
      store.dispatch('note/displayList', {
        type: type,
        index: String(index)
      })
    };

    const formatDate = (row) => {
      return new Date(row.date).toLocaleDateString()
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll, true)
    });

    const handleScroll = () => {
      state.processPercentage = ((getScrollBarPosition() / getScrollBarMax()) * 100).toFixed(0)
    }

    return {
      ...toRefs(state),
      ...toRefs(commentData),
      changeCollapse,
      displayArticle,
      openSubmenu,
      displayList,
      formatDate,

      pageJump,

      submenus,
      titles,
      setData
    };
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