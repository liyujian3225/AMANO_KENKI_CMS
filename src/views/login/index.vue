<template>
  <div class="login">
    <div class="login_box">
      <div class="logo_box">
        <img :src="logoImg" >
      </div>
      <div class="form_box">
        <p class="login_title">ログイン</p>
        <el-form
          class="demo-ruleForm"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          label-position="top"
        >
          <el-form-item label="ユーザー名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="パスワード" prop="password">
            <el-input show-password v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button
              class="loginBtn"
              type="primary"
              :round="true"
              @click="submitForm('ruleForm')">ログイン
            </el-button>
            <br>
            <el-button
              class="findPassword"
              type="text"
              @click="findPassword">パスワードを忘れた
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/apiRequest/http'
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min';
export default {
  data() {
    return {
      logoImg: require("@/assets/logo.png"),
      ruleForm: {
        username: 'AMANO-KENKI',
        password: 'Aoqier!16'
      },
      rules: {
        username: [{ required: true, message: 'メールアドレスを入力してください', trigger: 'blur' }],
        password: [{ required: true, message: 'パスワードを入力してください', trigger: 'blur' }]
      }
    }
  },
  methods: {
    encrypt(txt) {
      const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsaBQ8DxnMX5u1IoqPFEAxhJ5MxIw6d/4GtwJ9aRpNLEWxMmo39G3LW5HkUdx4vQFBdL3xBH+kws/ciTY0u6Ub4d8q3AZjRJprKjyidFIm/JwCtCLdZwlHas6avGLfo3SFRERVcl6HiZNAwRPyajU4z3KJZ3+FyP8SJJiiBGzng+pCAXi0/12rh0JT3aQn6CSzSKmc+PhCTAOlMOlSdpH3UEBwcb8H1xu0/0BWdUoYMUatCmwAzDgLs0NrVuRqL4cqK7rFzKdXJWKHlNzQgOx+7SeKBp+OFw0MuWssOlH5477cZEl1wVsDNe6/GcRC2EoLQu1WPNxLfMiuES1x9ryIQIDAQAB'
      const encryptor = new JSEncrypt()
      encryptor.setPublicKey(publicKey) // 设置公钥
      return encryptor.encrypt(txt) // 对需要加密的数据进行加密
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { username, password } = this.ruleForm;
          const params = {
            username,
            password: this.encrypt(password)
          }
          http.post('/auth/login', params).then((response) => {
            const { user, token } = response
            const { user: userInfo } = user;
            console.log(userInfo, token)
            this.$store.commit('setUser', 'Bearer ' + token)
            this.$message({
              message: 'ログイン成功！',
              type: 'success'
            })
            this.$router.push('/homePage')
          })
        }
      })
    },
    findPassword() {

    }
  }
}
</script>
<style lang="scss" scoped>
div.login {
  width: 100%;
  height: 100%;
  div.login_box {
    width: 600px;
    height: 600px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 2;
    .logo_box {
      height: 64px;
      margin-bottom: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 350px;
      }
    }
    .form_box {
      height: 520px;
      padding-top: 35px;
      box-sizing: border-box;
      background: #FFFFFF 0 0 no-repeat padding-box;
      box-shadow: 0 3px 6px #00000029;
      .login_title {
        font: normal normal bold 32px/46px Noto Sans CJK JP;
        color: #333333;
        text-align: center;
        margin-bottom: 50px;
      }
      .demo-ruleForm {
        width: 400px;
        margin: 0 auto;
        .loginBtn {
          width: 200px !important;
          background: #29619C 0 0 no-repeat padding-box;
          margin: 20px 0;
        }
        .findPassword {
          text-decoration: underline;
          font: normal normal bold 16px/24px Noto Sans CJK JP;
          color: #29619C;
        }
        ::v-deep {
          .el-form-item__label {
            color: #29619C;;
          }
          .el-input__inner {
            width: 100%;
          }
          .el-button--primary {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
