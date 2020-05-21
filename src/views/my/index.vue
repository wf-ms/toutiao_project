<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="$store.state.user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" fit="cover" round :src="userInfo.photo"></van-image>
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 退出登录 -->
    <van-cell title="消息通知" is-link></van-cell>
    <van-cell title="小智同学" class="mb-9" is-link></van-cell>
    <van-cell v-if="$store.state.user" @click="onLogout" class="logout-cell" title="退出登录" clickable></van-cell>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    console.log(this.$store.state.user);

    if (this.$store.state.user) {
      this.loadUserInfo();
    }
  },
  methods: {
    //   退出登录
    onLogout() {
      //   在组件中需要使用this.$dialog来调用弹框组件
      this.$dialog
        .confirm({
          title: "确认退出吗?"
        })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          console.log("取消退出登录操作");
        });
    },
    // 获取用户信息
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo();
        console.log(data);
        this.userInfo = data.data;
      } catch (err) {
        console.log(err);
        this.$toast("获取失败,请稍后重试");
      }
    }
  }
};
</script>

<style lang='less' scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
    margin-bottom: 150px;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>