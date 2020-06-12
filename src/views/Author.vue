<template>
  <div class="author-detail">
    <div v-if="author.loginname">
      <div class="user-info">
        <img class="avatar-img" :src="author.avatar_url" />
        <div class="user-detail">
          <div class="username">{{author.loginname}}</div>
          <div class="gitname">e {{ author.githubUsername}}</div>
          <div class="score">{{author.score}}积分</div>
          <div class="created">{{ author.create_at}}</div>
        </div>
      </div>
      <div class="recent-topics" ref="topics">
        <div class="tabbar" ref="tabbar">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">最近创建的话题</mt-tab-item>
            <mt-tab-item id="2">最近参与的话题</mt-tab-item>
          </mt-navbar>
        </div>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <div class="post" v-for="(post,index) in author.recent_topics" :key="index">
              <div class="author">
                <div class="avatar">
                  <img :src="post.author.avatar_url" />
                </div>
                <div class="username">
                  {{post.author.loginname}}
                  <span class="time">{{post.last_reply_at}}</span>
                </div>
              </div>
              <router-link :to="'/topic/' + post.id" class="link-type">
                <div class="title">{{post.title}}</div>
              </router-link>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div class="post" v-for="(post,index) in author.recent_replies" :key="index">
              <div class="author">
                <div class="avatar">
                  <img :src="post.author.avatar_url" />
                </div>
                <div class="username">
                  {{post.author.loginname}}
                  <span class="time">{{post.last_reply_at}}</span>
                </div>
              </div>
              <router-link :to="'/topic/' + post.id" class="link-type">
                <div class="title">{{post.title}}</div>
              </router-link>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAuthorDetail } from "@/api/article";
export default {
  name: "Author",
  data() {
    return {
      author: {},
      selected: "1",
      top: 0
    };
  },
  methods: {
    getAuthor() {
      fetchAuthorDetail(this.$route.params.username)
        .then(res => {
          this.author = res.data;
        })
        .then(() => {
          this.top = this.$refs.topics.getBoundingClientRect().top;
          console.log(this.$refs.topics.getBoundingClientRect().top);
        });
    },
    onScroll() {
      if (this.$refs.topics.getBoundingClientRect().top <= 0) {
        this.$refs.tabbar.style.position = "fixed";
      } else {
        this.$refs.tabbar.style.position = "static";
      }
    }
  },
  mounted() {
    this.getAuthor();
    window.addEventListener("scroll", this.onScroll);
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #fff;
  margin-bottom: 8px;
  .avatar-img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
  .user-detail {
    text-align: right;
  }
}

.tabbar {
  background: #fff;
  width: 100%;
  z-index: 99;
  top: 0;
}
.recent-topics {
  padding: 0 16px;
  background-color: #fff;

  .post {
    margin: 16px 0;
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
}
</style>