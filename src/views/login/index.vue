<template>
  <div class="login-container">
    <!-- 导航区域 -->
    <!-- page-nav-bar在全局样式中,设置标题栏样式 -->
    <van-nav-bar class="page-nav-bar" title="登录"/>

    <!-- 表单提交区域 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
        placeholder="请输入验证码"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000*60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
          >获取验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user.js";
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810"
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空"
          },
          {
            // pattern 	通过正则表达式进行校验
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误"
          }
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空"
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误"
          }
        ]
      },
      isCountDownShow: false
    };
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "登录中..." // 提示消息
      });

      try {
        const { data: res } = await login(this.user);
        console.log("登录成功", res);
        this.$store.commit("setUser", res.data);
        this.$toast.success("登录成功");
      } catch (err) {
        if (err.response.status === 400) {
          console.log("手机号或验证码错误", err);
          this.$toast.fail("手机号或验证码错误");
        } else if (err.response.status === 507) {
          console.log("服务器数据库异常", err);
          this.$toast.fail("服务器数据库异常");
        } else {
          this.$toast.fail("未知错误");
        }
      }
    },
    async onSendSms() {
      // 1. 校验手机号
      try {
        //不传参数,验证所有表单,当前只需要验证mobile
        await this.$refs.loginForm.validate("mobile");
        console.log("验证成功");
        this.$toast.success("验证成功");
      } catch (err) {
        console.log("验证失败", err);
        return this.$toast.fail("验证失败");
      }
      // 2.验证通过,显示倒计时
      this.isCountDownShow = true;
      // 3.发送请求验证码
      try {
        await sendSms(this.user.mobile);
        this.$toast.success("发送成功");
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    }
  }
};
</script>

<style lang="less" scope>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 200px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>