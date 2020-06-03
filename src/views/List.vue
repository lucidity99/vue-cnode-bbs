<template>
  <div class="list">
    <ul class="post-list">
      <li class="post" v-for="post in list" :key="post.id">
        <div class="post-title">
          <router-link :to="'/topic/' + post.id" class="link-type">
            <span>{{ post.title }}</span>
          </router-link>
        </div>
        <div class="post-author">
          <img :src="post.author.avatar_url" />
          <span>{{ post.author.loginname }}</span>
        </div>
        <div>
          <div class="post-count">
            {{ post.reply_count }}/{{ post.visit_count }} -
            <span>{{
              post.last_reply_at | parseTime("{y}-{m}-{d} {h}:{i}")
            }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";

export default {
  name: "List",

  data() {
    return {
      list: [],
      listQuery: {
        page: 1,
        limit: 20,
      },
    };
  },
  filters: {
    parseTime(val) {
      return parseTime(val);
    },
  },

  methods: {
    getList() {
      fetchList(this.listQuery).then((res) => {
        this.list = res.data;
      });
    },
  },

  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.post-list {
  .post {
    display: flex;
    flex-direction: column;

    .post-author {
      margin-right: 16px;

      img {
        width: 60px;
        height: 60px;
        object-fit: contain;
      }
    }

    .post-title {
      display: flex;
      white-space: nowrap;
    }
  }
}
</style>
