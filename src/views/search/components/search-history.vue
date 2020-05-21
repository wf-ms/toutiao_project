<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template slot="default">
        <div v-if="isDeleteShow">
          <span @click="$emit('clear-search-histories',[])">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow=false">完成</span>
        </div>
        <van-icon name="delete" v-else @click="isDeleteShow=true"></van-icon>
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item,index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(item,index)"
    >
      <van-icon slot="default" name="close" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    //   prop数据:
    // prop是受父组件数据影响的
    //  如果是普通数据(数字,字符串,布尔值),即便改了也不会传导给父组件
    //  如果是引用类型数据(数组,对象), 可以修改,例如 [].push(xxx), obj.xxx=xxx 但是不能重新赋值, xxx=[]

    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态,删除历史记录
        this.searchHistories.splice(index, 1);
      } else {
        //   非删除状态,直接进入搜索
        this.$emit("search", item);
      }
    }
  }
};
</script>

<style lang='less' scoped>
</style>