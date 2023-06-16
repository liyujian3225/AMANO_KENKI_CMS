<template>
  <div class="changePassword">
    <div class="topBar">
      <span>パスワード変更</span>
    </div>
    <div class="content">
      <el-form label-position="top" label-width="80px" ref="form" :model="formLabelAlign" :rules="rules">
        <el-form-item label="メールアドレス" prop="email">
          <el-input style="width: 78%; margin-right: 2%" v-model="formLabelAlign.email"></el-input>
          <el-button style="width: 20%" type="primary" @click="getCode">認証番号</el-button>
        </el-form-item>
        <el-form-item label="認証番号" prop="code">
          <el-input v-model="formLabelAlign.code"></el-input>
        </el-form-item>
        <el-form-item label="新しいパスワード再確認" prop="newPass">
          <el-input v-model="formLabelAlign.newPass"></el-input>
        </el-form-item>
        <el-form-item class="operateForm">
          <el-button type="primary" @click="handleSave">設定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import http from "@/apiRequest/http";
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min';
export default {
  data() {
    return {
      rules: {
        email: [{ required: true, message: 'メールアドレスを入力してください', trigger: 'blur' }],
        code: [{ required: true, message: '認証コードを入力してください', trigger: 'blur' }],
        newPass: [{ required: true, message: '新しいパスワードを入力してください', trigger: 'blur' }],
      },
      formLabelAlign: {
        email: '',
        code: '',
        newPass: '',
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
    getCode() {
      let that = this;
      this.$refs['form'].validateField("email", (valid) => {
        if (that.formLabelAlign.email) {
          http.post('/api/code/email/resetPass?email=' + that.formLabelAlign.email).then((response) => {
            that.$message({
              message: '認証コードの取得に成功しました！',
              type: 'success'
            })
          })
        }
      });
    },
    handleSave() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const params = {
            ...this.formLabelAlign,
            newPass: this.encrypt(this.formLabelAlign.newPass)
          }
          http.post('/api/users/changePass', params).then((response) => {
            this.$message({
              message: 'パスワードの変更！',
              type: 'success'
            })
          })
        } else {
          return false;
        }
      });
    },
  }
}
</script>
<style lang="scss" scoped>
div.changePassword {
  .el-button {
    background: #29619C 0% 0% no-repeat padding-box;
    border: 2px solid #29619C;
    border-radius: 4px;
  }
  div.topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font: normal normal bold 24px/35px Noto Sans CJK JP;
      color: #333333;
    }
  }
  div.content {
    width: 600px;
    margin: 0 auto;
    .operateForm {
      text-align: center;
    }
  }
}
</style>
