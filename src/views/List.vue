<template>
  <div class="list">
    <mt-navbar class="navbar" v-model="selected">
      <mt-tab-item
        :id="index"
        v-for="(tab, index) in tabs"
        :key="index"
        @click.native.prevent="active = 'tab-container' + index"
      >{{ tab.text }}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="posts page-tabbar-tab-container" v-model="selected" swipeable>
      <mt-tab-container-item :id="index" v-for="(tab, index) in tabs" :key="index">
        <keep-alive>
          <post-list :tab="tab.key" v-if="selected == index" />
        </keep-alive>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import PostList from "@/views/components/PostList";

export default {
  name: "Home",
  components: {
    PostList
  },
  data() {
    return {
      tabs: [
        { key: "all", text: "全部" },
        { key: "ask", text: "问答" },
        { key: "share", text: "分享" },
        { key: "job", text: "招聘" },
        { key: "good", text: "精华" }
      ],
      selected: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;

  background: #fff;
}

.link {
  color: inherit;
  padding: 20px;
  display: block;
}

.posts {
  height: 100vh;
}
</style>
