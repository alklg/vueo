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


        <router-link v-if="!jwtToen" to="/login">Login</router-link>
        <span v-else> {{ userInfo.username }} </span>
        <el-dropdown-menu slot = "dropdown">
          <el-dropdown-item command = "/userinfo">个人信息</el-dropdown-item>
          <button @click="logout">退出登录</button>
        </el-dropdown-menu>

      </el-header>

      <br>
      <br>



        <el-upload
            class="upload-demo"
            ref="upload"
            action="http://119.45.145.96:8080/photoSolve"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">

          <el-button slot="trigger" size="small" type="primary" @click="handleUpload1">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="handleUpload2">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

    </el-container>
  </div>
</template>


<script>
export default {
  inject: ['loggedIn'],
  data() {
    return {
      fileList: [

      ],
      userInfo: {},
      jwtToken: null
    };
  },
  mounted() {
      this.jwtToken = localStorage.getItem('jwtToken');
      // 如果有 JWT，则从后端获取用户信息
      if (this.jwtToken) {
      this.getUserInfo(); // 获取用户信息
    }
  },

    methods: {
      getUserInfo() {
        // 从后端获取用户信息的逻辑，示例中假设从后端接口获取用户信息，并存储在 this.userInfo 中
        // 示例：假设后端接口返回的用户信息包括 username 字段
        this.userInfo.username = '用户A'; // 示例：假设用户名为'用户A'
      },
      handleUpload1() {
        const jwtToken = localStorage.getItem('jwtToken');
        console.log(jwtToken)
        if (jwtToken === null || !jwtToken) {
          // 如果没有 JWT，则跳转到登录页面
          this.$router.push('/login');
        } else {
          // 如果有 JWT，则执行上传操作
          this.$refs.upload.submit();

        }
      },
      handleUpload2() {
        const jwtToken = localStorage.getItem('jwtToken');
        console.log(jwtToken)
        if (jwtToken === null || !jwtToken) {
          // 如果没有 JWT，则跳转到登录页面
          this.$router.push('/login');
        } else {
          // 如果有 JWT，则执行上传操作
          this.$refs.upload.submit();
          this.$router.push({path: "/photo"})
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleCommand(command) {
        this.$router.push(command);
      },
      logout() {
        // 执行退出登录的逻辑
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