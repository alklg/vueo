<template>
  <div>
    <div class = "centered-div" >
      <br>
      <div style = "width:500px">
            <div style = "height:20px"></div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size = "mini">
          <el-form-item label="用户名" prop="username" >
            <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            <div style="height:20px"></div>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            <div style="height:20px"></div>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type = "email" v-model="ruleForm.email"></el-input>
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
axios.defaults.baseURL = 'http://119.45.145.96:8080'
// backend pass jwtToken


export default {
  data() {


    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length <= 5 || value.length >= 16) {
        callback(new Error('密码在6-15字符内'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkUsername = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入用户名'));
      } else if (value.length <= 2 || value.length >= 16) {
        callback(new Error('用户名在3-15字符内'));
      } else {
        callback();
      }
    };

    var checkEmail = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.isValidEmail = regex.test(value)
        if (!this.isValidEmail) callback(new Error('请输入正确的邮箱'))
        else callback()
      }
    }
    return {
      ruleForm: {
        password: '',
        checkPass: '',
        email: '',
        username: '',
        isValidEmail: true,
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],

        username: [
          { validator: checkUsername, trigger: 'blur'}
        ],

        email: [
          { validator: checkEmail, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("valid success")
          axios.post('/register', {
            "username": this.ruleForm.username,
            "password": this.ruleForm.password,
            "email": this.ruleForm.email,
            "code": 1
          }).then(response => {
            const jwtToken = response.data.data
            localStorage.setItem('jwtToken', jwtToken);
            console.log(jwtToken)
            this.$router.push( { path: '/' })
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