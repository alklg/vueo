<template>
  <div>

    <div class = "centered-div" >
      <br>
      <div style = "width:500px">
        <div style = "height:20px"></div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size = "mini">
          <el-form-item label="用户名" prop="username" >
            <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
            <div style="height:20px"></div>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            <div style="height:20px"></div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = 'http://119.45.192.148:8080'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: validateUsername, trigger:'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("21431241341")

          axios.post('/login', {
            "username": this.ruleForm.username,
            "password": this.ruleForm.password,
            "code": 1
          }).then(response => {
            console.log(response.data)
            if(response.data.data === "userNotFound") {
              console.log("14546")
              alert("提交信息错误")
              this.$refs[formName].resetFields();

            } else if(response.data === "messageDoesn'tMatch") {
              alert("用户名或密码错误")
              this.$refs[formName].resetFields();
            } else {
              alert("valid success")
              console.log(response.data)
            }
          }, error=> {
            console.log('error123', error.message)
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>


.centered-div {
  height: 380px;
  width: 600px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0.1, 0.1, 0.1, 0.3);
  margin: 0 auto; /* 将元素水平居中 */
  margin-top: 50px;
}
</style>

