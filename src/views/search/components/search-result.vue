<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败,请点击重试"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title"></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search.js";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          page: this.page, //页码
          per_page: this.perPage, //每页大小
          q: this.searchText //查询关键词
        });
        console.log(data);

        const { results } = data.data;
        this.list.push(...results);

        this.loading = false;

        // 判断是否还有数据,有就更新页码
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
        this.$toast("数据获取失败,请稍后重试");
      }
    }
  }
};
</script>

<style lang='less' scoped>
</style>