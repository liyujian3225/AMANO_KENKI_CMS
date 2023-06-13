<template>
  <div class="layout">
    <div class="header">
      <img :src="logoImg" >
      <div class="loginOut">
        <span class="nickName">{{ userInfo.nickName }}</span>
        <div class="loginOutBtn" @click="loginOut">
          <span>ログアウト</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="leftMenu">
        <el-menu
          :router="true"
          default-active="0"
          background-color="#29619C">
          <el-menu-item
            v-for="(item, index) in menuList"
            :index="String(index)"
            :route="item.path"
          >
            <img class="iconImage" :src="item.icon" alt="">
            <span class="title" slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="rightContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import http from '@/apiRequest/http'
import { removeItem } from "@/utils/storage";
export default {
  data() {
    return {
      logoImg: require("@/assets/logo.png"),
      menuList: [
        { name: "マリン用品", path: "/boat", icon: require("@/assets/boat.png") },
        { name: "エンジン", path: "/engine", icon: require("@/assets/wind.png") },
        { name: "中古建機", path: "/buildMachine", icon: require("@/assets/car-side.png") },
        { name: "メーカー登録", path: "/factoryLogin", icon: require("@/assets/building.png") },
        { name: "パスワード変更", path: "/changePassword", icon: require("@/assets/lock.png") },
      ]
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    loginOut() {
      http.delete('/auth/logout', {}).then((response) => {
        removeItem("userInfo");
        removeItem("token");
        this.$router.push('/login');
        this.$message({
          message: 'ログアウト成功！',
          type: 'success'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
div.layout {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  >div.header {
    width: 100%;
    height: 90px;
    padding: 0 40px;
    box-sizing: border-box;
    position: absolute;
    left: 0; top: 0;
    background: #FFFFFF 0 0 no-repeat padding-box;
    box-shadow: 0 3px 6px #00000029;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >div.loginOut {
      display: flex;
      align-items: center;
      span.nickName {
        font: normal normal bold 16px/24px Noto Sans CJK JP;
        color: #333;
        margin-right: 20px;
      }
      div.loginOutBtn {
        width: 101px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        border: 1px solid #29619C;
        border-radius: 18px;
        cursor: pointer;
        span {
          color: #29619C;
        }
      }
    }
  }
  >div.content {
    height: calc(100% - 90px);
    margin-top: 90px;
    >div.leftMenu {
      width: 250px;
      height: 100%;
      background: #29619C 0 0 no-repeat padding-box;
      float: left;
      .el-menu {
        border-right: unset;
      }
      .iconImage {
        width: 22px;
        margin-right: 20px;
      }
      .title {
        font: normal normal bold 20px/29px Noto Sans CJK JP;
        color: #FFFFFF;
      }
    }
    >div.rightContent {
      width: calc(100% - 250px);
      height: 100%;
      overflow-y: auto;
      padding: 20px;
      box-sizing: border-box;
      background: #FFFFFF 0 0 no-repeat padding-box;
      float: left;
    }
  }
}
</style>
