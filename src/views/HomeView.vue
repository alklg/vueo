<template>
  <div class="home" id = "app">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command = "/">option1</el-dropdown-item>
            <el-dropdown-item command = "/registration">注册</el-dropdown-item>
            <el-dropdown-item command = "/info">简介</el-dropdown-item>
            <el-dropdown-item command = "/history">处理历史</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <router-link v-if="!loggedIn" to="/login">Login</router-link>
        <span v-else> {{ userInfo.username }} </span>
        <el-dropdown-menu slot = "dropdown">
          <el-dropdown-item command = "/userinfo">个人信息</el-dropdown-item>
          <button @click="logout">退出登录</button>
        </el-dropdown-menu>

      </el-header>

      <br>
      <br>
      <div style="border: 2px solid black">


        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-container>
  </div>
</template>


<script>
// @ is an alias to /src
//   import Vue from "vue"
  export default {
    inject: ['loggedIn'],
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]

      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // beforeRemove(file, fileList) {
      //   return this.$confirm(`确定移除 ${ file.name }？`);
      // }
      handleCommand(command) {
        this.$router.push(command)
      },

      logout() {

      }

    }
}
</script>


<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>