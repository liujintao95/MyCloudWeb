<template>
  <div id="LeftMenu">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="public">
            <i class="el-icon-menu"></i>
            <span slot="title">公共仓库</span>
          </el-menu-item>
          <el-submenu index="private">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>私人仓库</span>
            </template>
            <el-menu-item-group>

              <el-menu-item index="dir">文件</el-menu-item>
              <el-menu-item index="recent">新增</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="文件类型">
              <el-menu-item index="video">视频</el-menu-item>
              <el-menu-item index="photo">图片</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-menu-item index="upload">
            <i class="el-icon-document"></i>
            <span slot="title">上传文件</span>
          </el-menu-item>
          <el-menu-item index="user_info">
            <i class="el-icon-setting"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  methods: {
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-col-12 {
  width: 100%;
}
.el-row, .el-col-12, .el-menu{
  height: 100%;
}
</style>
