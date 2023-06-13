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
        <el-form-item label="しいパスワード" prop="oldPass">
          <el-input v-model="formLabelAlign.oldPass"></el-input>
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

export default {
  data() {
    return {
      rules: {
        email: [{ required: true, message: 'メールアドレスを入力してください', trigger: 'blur' }],
        code: [{ required: true, message: '認証コードを入力してください', trigger: 'blur' }],
        oldPass: [{ required: true, message: '古いパスワードを入力してください', trigger: 'blur' }],
        newPass: [{ required: true, message: '新しいパスワードを入力してください', trigger: 'blur' }],
      },
      formLabelAlign: {
        email: '',
        code: '',
        oldPass: '',
        newPass: '',
      }
    }
  },
  methods: {
    getCode() {
      let that = this;
      this.$refs['form'].validateField("email", (valid) => {
        if (that.formLabelAlign.email) {
          http.post('/api/code/email/resetPass', that.formLabelAlign).then((response) => {
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
          http.post('/api/users/changePass', this.formLabelAlign).then((response) => {
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
