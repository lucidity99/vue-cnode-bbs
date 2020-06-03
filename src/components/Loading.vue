<template>
  <div class="loading" v-show="loading">loading...</div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.bus.$on("loading", (data) => {
      this.loading = !!data;
    });
  },
};
</script>

<style scoped lang="scss">
.loading {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  p {
    padding: 0.15rem 0.15rem 0.2rem;
    color: #fff;
    font-size: 0.16rem;
  }
  img {
    width: 0.4rem;
    height: 0.4rem;
  }
}
</style>
