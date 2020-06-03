<template>
  <div class="post">
    <div class="post-title">{{ topic.title }}</div>
    <div class="post-content" v-html="topic.content"></div>
  </div>
</template>

<script>
import { fetchDetail } from "@/api/article";
export default {
  name: "Article",
  data() {
    return {
      topic: {},
    };
  },
  methods: {
    getDetails() {
      console.log(this.$route.params.id);
      fetchDetail().then((res) => {
        console.log(res.data);
        this.topic = res.data;
      });
    },
  },
  created() {
    this.getDetails();
  },
};
</script>
