<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        to="/search"
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- 标签栏 
    animated 动画效果
    swipeable 手指滑动切换
    -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <article-list :channel="channel"></article-list>
      </van-tab>

      <template slot="nav-right">
        <!-- 添加一个空的占位元素 -->
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="isChannelEditShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 汉堡导航弹出层 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{height:'100%'}"
      close-icon-position="top-left"
    >
      <channel-edit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
        @editMyChannels="onEditMyChannels"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";

export default {
  data() {
    name: "HomeIndex";
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    };
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      try {
        console.log(this.user);

        if (this.user) {
          console.log("wrqrewq");

          // 已登录
          const { data: res } = await getUserChannels();
          console.log(res.data.channels);
          this.channels = res.data.channels;
        } else {
          // 未登录
          const localChannels = getItem("TOUTIAO_CHANNELS");
          if (localChannels) {
            //   有本地存储
            this.channels = localChannels;
          } else {
            //   没有本地存储
            const { data: res } = await getUserChannels();
            console.log(res.data.channels);

            this.channels = res.data.channels;
          }
        }
      } catch (err) {
        console.log(err);

        this.$toast("获取用户频道失败");
      }
    },
    onUpdateActive(index, isChannelEditShow = true) {
      //第二个参数设置窗口是否关闭
      //   console.log(index);
      this.active = index;
      this.isChannelEditShow = isChannelEditShow;
    },
    onEditMyChannels(channel) {
      this.channels.push(channel);
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  // 因为scoped的原因, unset 对组件的子元素失效, 需要在前加上'/deep/' (参考vue文档中vue Loader 中scoped CSS 深度作用选择器)
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      left: 0;
      right: 0;
      z-index: 1;
      top: 92px;

      height: 82px;
    }
    .van-tab {
      border: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0px;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    .placeholder {
      width: 66px;
      height: 82px;
      //   此元素不参与flex剩余空间计算
      flex-shrink: 0;
    }
  }
  .edit-channel-popup {
    padding-top: 100px;
    box-sizing: border-box;
  }
}
</style>
