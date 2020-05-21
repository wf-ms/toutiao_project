<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" :success-text="refreshSuccessText" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败,点击中心加载"
      >
        <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title"></van-cell> -->
        <article-item v-for="(article, index) in list" :key="index" :article="article">123</article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article.js";
import ArticleItem from "@/components/article-item";

export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      timestamp: null,
      error: false,
      refreshSuccessText: "刷新成功"
    };
  },
  methods: {
    async onLoad() {
      try {
        console.log(this.channel.id);
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        });
        console.log(data.data);
        const { results } = data.data;
        this.list.push(...results);

        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        // console.log(err);
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
          with_top: 1
        });
        const { results } = data.data;
        this.list.unshift(...results);
        this.refreshing = false;
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (err) {
        console.log(err);
        this.refreshing = false; // 关闭下拉刷新的 loading 状态
        this.refreshSuccessText = `刷新失败`;
      }
    }
  }
};
</script>

<style lang='less' scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>