<template>
  <div class="post-detail">
    <mt-header :title="title" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="post" v-if="topic.title">
      <div class="title">{{ topic.title }}</div>
      <div class="author">
        <img :src="topic.author.avatar_url" />
        <span>{{ topic.author.loginname }}</span>
      </div>
      <div class="content" v-html="topic.content"></div>
    </div>
    <div class="comments">
      <h2>评论</h2>
      <div v-if="topic.replies">
        <ul>
          <li class="comment" v-for="(reply,index) in topic.replies" :key="index">
            <div class="avatar">
              <img :src="reply.author.avatar_url" />
            </div>
            <div class="comment">
              <div class="comment-name">{{reply.author.loginname}}</div>
              <div class="comment-content">{{reply.content|stripHtml()}}</div>
            </div>
          </li>
        </ul>
        <div class="more-comments">
          <router-link
            :to="'/comments/' + topic.id"
            class="link-type"
          >查看全部{{topic.replies.length}}条评论</router-link>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span>{{topic.create_at | parseTime()}}</span>
      <span class="iconfont icon-icon-test2">{{topic.visit_count}} 閱讀</span>
      <span class="iconfont icon-icon-test">{{topic.reply_count}} 回復</span>
    </div>
  </div>
</template>

<script>
import { fetchDetail } from "@/api/article";
import { parseTime } from "@/utils";

export default {
  name: "Article",
  data() {
    return {
      topic: {},
      title: ""
    };
  },
  filters: {
    parseTime(val) {
      return parseTime(val);
    },
    stripHtml(html) {
      console.log(html);
      return html.replace(/<\/?.+?>/g, "");
    }
  },
  methods: {
    getDetails() {
      fetchDetail(this.$route.params.id).then(res => {
        this.topic = res.data;
      });
    },
    onScroll() {
      if (document.documentElement.scrollTop > 50) {
        this.title = this.topic.title;
      } else {
        this.title = "";
      }
    }
  },
  mounted() {
    this.getDetails();
    window.addEventListener("scroll", this.onScroll);
  }
};
</script>

<style lang="scss">
.post-detail {
  margin: 44px 0;
  .post {
    width: 100vw;
    overflow: hidden;
    .title {
      padding: 8px 16px;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
      background-color: #fff;
    }

    .author {
      padding: 8px 16px;
      background-color: #fff;
      img {
        width: 20px;
      }
    }

    .content {
      padding: 8px 16px;
      background-color: #fff;
      white-space: normal;
      word-break: break-all;

      img {
        width: 100%;
      }
    }
  }

  .comments {
    padding: 16px;
    margin: 16px 0;
    background-color: #fff;
    li {
      display: flex;
      margin-bottom: 8px;

      .avatar img {
        width: 20px;
        margin-right: 8px;
      }

      .comment-name {
        font-size: 12px;
      }
      .comment-content {
        padding: 8px 0;
        background-color: #fff;
        word-break: break-all;

        img {
          width: 90%;
        }
      }
    }
  }
  .bottom {
    position: fixed;
    z-index: 99;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 40px;
    background: #fff;
    box-shadow: 0 0 5px #eee;
  }
}
</style>
