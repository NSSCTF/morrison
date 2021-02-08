<template>
  <div class="article" v-loading="articleData.isLoading != false && true">
    <div class="article-head">
      <span class="article-title">{{articleData.title || title}}</span>
      <el-row>
        <el-col :span="24">
          <span style="float: left; margin-top: 15px">
            <i class="el-icon-date"></i>
            2020-10-10 13:59
          </span>
          <span style="float: right">
            <el-button type="success">
              <i class="el-icon-collection-tag">
                </i>收藏
            </el-button>
            <el-button class="btn btn-info">
              <i class="el-icon-star-off"></i>点赞
            </el-button>
            <el-button class="btn btn-info">
              <i class="el-icon-info"></i>浏览量
            </el-button>
          </span>
        </el-col>
      </el-row>
    </div>
    <el-divider direction="horizontal" />

    <div class="article-body" v-html="compileMarkdown" v-highlight>
    </div>
    <div class="article-comment">
      <el-divider direction="horizontal" style="height: 2px" ><p style="font-size: 24px">评论区</p></el-divider>
      <!-- <comment :comments="commentData" /> -->
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import comment from "./comment";
import * as CD from "../../mock/comment.js";
import marked from 'marked'
import '@/assets/css/prism.css'

const renderMd = new marked.Renderer();
marked.setOptions({
  renderer: renderMd,
})

export default {
  props: {
    articleData: Object
  },
  components: { comment },
  setup(props) {
    const state = reactive({
      id: 0,
      title: props.articleData.title || "Welcome",
      author_id: 1,
      author: "Admin",
      tags: [],
      content: `<p>文档库永久免费开放。</p>
      <p>公者千古，私者一时。</p>`,
      views: 0,
      stars: 0,
      votes: 0,
      isLoading: props.articleData.isLoading || true,
    });
    
    const commentData = reactive({
      commentData: CD.comment.data,
    });

    const compileMarkdown = computed(() => {
      let index = 0;
      renderMd.heading = function(text, level) {
        if (level >= 2 && level <= 3) {
          return `<h${level} id="head-${index++}">${text}</h${level}>`;
        } else {
          return `<h${level}>${text}</h${level}>`;
        }
      }
      return marked(props.articleData.content || state.content)
    })
    return {
      ...toRefs(state),
      ...toRefs(commentData),
      compileMarkdown
    };
  },
};
</script>

<style lang="scss">
// @import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
.article-head {
  padding: 0px 0;
}
.article {
  margin: 0 20px;
}
.article-title {
  font-size: 48px;
}
.article-body {
  min-height: 200px;
}
.article-comment {
  margin-top: 20px;
}
.article-body {
  font-size: 16px;
}
</style>