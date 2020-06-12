<template>
  <div>
    <ul class="scroll post-list" ref="scroll" @scroll="onScroll()">
      <li class="post" v-for="(post,index) in list" :key="index">
        <div class="title">
          <router-link :to="'/topic/' + post.id" class="link-type">
            <span>{{ post.title }}</span>
          </router-link>
        </div>
        <div class="author">
          <router-link :to="'/user/' + post.author.loginname" class="link-type">
            <img :src="post.author.avatar_url" />
            <span>{{ post.author.loginname }}</span>
            <span class="date">{{ post.last_reply_at | parseTime() }}</span>
          </router-link>
        </div>
        <div class="summary">{{post.content | formatContent()}}</div>
        <div class="count">{{ post.visit_count }} 阅读 · {{ post.reply_count }} 回复</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";
import { Indicator } from "mint-ui";

export default {
  name: "PostList",
  props: {
    tab: {
      type: String
    }
  },

  data() {
    return {
      list: [],
      listQuery: {
        page: 1,
        limit: 5
      },
      loading: false,
      finished: false,
      screenHeight: 0,
      viewHeight: 0
    };
  },
  filters: {
    parseTime(val) {
      return parseTime(val);
    },
    formatContent(val) {
      return "落地页是独立的网页，专为特定的市场营销活动或搜索广告而设计。当用户点击搜索结果、电子邮件或广告中的链接时，落地页就是用户「落地」的地方。";
    }
  },

  methods: {
    getList() {
      this.loading = true;
      Indicator.open();
      if (this.tab != "all") this.listQuery.tab = this.tab;
      fetchList(this.listQuery).then(res => {
        this.list = this.list.concat(res.data);
        this.listQuery.page++;
        this.loading = false;
        Indicator.close();
        this.$nextTick(function() {
          console.log("nextTick");
        });
      });
    },
    // 上拉加载更多
    onScroll(e) {
      //可滚动容器的高度
      let innerHeight = this.$refs.scroll.scrollHeight;
      //屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight;
      //可滚动容器超出当前窗口显示范围的高度
      let scrollTop = this.$refs.scroll.scrollTop;
      //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      this.finished = false;
      if (innerHeight <= outerHeight + scrollTop && this.loading == false) {
        //加载更多操作
        this.loading = true;
        console.log("loadmore", this.listQuery.page);
        this.getList();
      }
    },
    switchBottom() {
      // this.$nextTick(() => {
      //   // 判断容器内容是否 大于 自身内容可视区域高度
      //   console.log(this.$el.clientHeight, this.$el.scrollHeight, this.show);
      //   if (this.$el.clientHeight > this.screenHeight && this.show == true) {
      //     // 如果大于，则显示加载状态，至于是加载完成还是没有可以继续加载，我们不用关心，如果继续上滑有数据会执行方法的
      //     this.showState = true;
      //   } else {
      //     // 如果页面不足一屏且还有下一页数据，继续执行加载更多方法
      //     if (!this.finished) {
      //       // 不足一屏，还有数据，现在加载状态
      //       this.loading = true;
      //       // 执行父组件请求数据方法
      //       setTimeout(() => {
      //         console.log("loading");
      //         this.getList();
      //       }, 1000);
      //     } else {
      //       // 没有数据不显示底部加载状态
      //       this.loading = false;
      //     }
      //   }
      // });
    }
  },

  mounted() {
    this.screenHeight = document.documentElement.clientHeight;
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.scroll {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  height: 100%;
  overflow: auto;
}
.post-list {
  .post {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 16px;
    margin: 16px 0;
    box-shadow: 0 0 2px #dfdfdf;

    .title {
      display: flex;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }

    .author {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      color: #555;
      font-size: 0.5rem;

      img {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        margin-right: 8px;
        object-fit: contain;
      }
    }

    .summary {
      margin-bottom: 8px;
      font-size: 14px;
      color: #333;
    }

    .count {
      color: #aaa;
      font-size: 14px;
    }
  }
}
</style>
