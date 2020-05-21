<template>
  <div class="search-suggestion">
    <van-cell
      icon="search" 
      :key="index"
      v-for="(suggestionText,index) in suggestions"
      @click="$emit('search',suggestionText)"
    >
      <div slot="title" v-html="highlight(suggestionText)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    };
  },
  computed: {},
  watch: {
    searchText: {
      // 当searchText发生改变的时候,触发handler函数,但是第一次输入时,不会触发
      handler: debounce(function(val) {
        this.loadSearchSuggestions(val);
      }, 300),
      immediate: true //该回调将在侦听开始之后被立即调用
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data: res } = await getSearchSuggestions(q);
        console.log(res);
        this.suggestions = res.data.options;
      } catch (err) {
        this.$toast.fail("数据获取失败,请稍后重试");
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`;
      //   RegExp: 正则表达式构造函数:
      // 参数1: 匹配模式字符串,它会根据这个字符串创建正则对象
      // 参数2: 匹配模式, 要写到字符串
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, highlightStr);
    }
  }
};
</script>

<style lang='less' scoped>
.search-suggestion {
  /deep/span.active {
    color: #3296fa;
  }
}
</style>