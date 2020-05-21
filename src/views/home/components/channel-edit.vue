<template>
  <div class="channel-edit">
    <!-- 频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        slot="default"
        type="warning"
        plain
        size="mini"
        round
        class="edit-btn"
        @click="isEdit=!isEdit"
      >{{isEdit? '完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        v-for="(channel,index) in myChannels"
        :key="index"
        class="grid-item"
        @click="onMyChannelClick(channel,index)"
      >
        <van-icon v-show="isEdit && !fiexChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
        <span slot="text" class="text" :class="{active: index === active}">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐--{{recommendChannels.length}}</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        v-for="(channel,index) in recommendChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        icon="plus"
        @click="onAddChannel(channel)"
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fiexChannels: [0] //固定频道,不允许被删
    };
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data: res } = await getAllChannels();
        this.allChannels = res.data.channels;
      } catch (err) {
        console.log(err);

        this.$toast.fail("获取所有频道失败");
      }
    },
    async onAddChannel(channel) {
      console.log(channel);
      //   myChannels是父组件传递来的数据,所以要在父组件中操作这个数据方法
      this.myChannels.push(channel);
      //   this.$emit("editMyChannels", channel);

      if (this.user) {
        //   已登录
        try {
          await addUserChannel({ id: channel.id, seq: this.myChannels.length });
          this.$toast.success("添加频道成功");
        } catch (err) {
          this.$toast.fail("添加频道失败");
        }
      } else {
        //   未登录
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
    onMyChannelClick(channel, index) {
      // 编辑状态,执行删除频道
      if (this.isEdit) {
        // 如果是固定频道,则不删除
        if (this.fiexChannels.includes(channel.id)) {
          return;
        }
        // 若删除的是高亮前面的数据时,让this.active-1,使高亮维持在原来的高亮位置
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        // 删除频道
        this.myChannels.splice(index, 1);
        this.deleteChannel(channel.id);
      } else {
        // 非编辑状态,执行切换频道
        this.$emit("update-active", index, false);
      }
    },
    async deleteChannel(channelId) {
      if (this.user) {
        //   已登录
        try {
          await deleteUserChannel(channelId);
        } catch (err) {
          console.log(err);
        }
      } else {
        //   未登录
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    }
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      return this.allChannels.filter(channel => {
        return !this.myChannels.some(myChannel => myChannel.id === channel.id);
      });
      //   const channels = [];
      //   this.allChannels.forEach(channel => {
      //     const ret = this.myChannels.find(myChannel => {
      //       return myChannel.id === channel.id;
      //     });
      //     if (!ret) {
      //       channels.push(channel);
      //     }
      //   });
    }
  }
};
</script>

<style lang='less' scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>