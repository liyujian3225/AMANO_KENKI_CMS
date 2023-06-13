<template>
  <div class="factoryLogin">
    <div class="topBar">
      <span>メーカー登録</span>
      <el-button type="primary" @click="dialogVisible = true">
        <i class="el-icon-plus"></i>
        新規
      </el-button>
    </div>
    <el-table
      :data="Manufacturer"
      empty-text="データが一時的にありません"
      style="width: 100%">
      <el-table-column
        type="index"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="メーカー">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">削除＃サクジョ＃</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新規"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="メーカー" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">キャンセル</el-button>
        <el-button type="primary" @click="handleSave">を選択して、</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import http from "@/apiRequest/http";
export default {
  data() {
    return {
      Manufacturer: [],
      dialogVisible: false,
      form: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: '名前を入力してください', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
    this.getManufacturer();
  },
  methods: {
    getManufacturer() {
      http.get('/api/manufacturer').then((response) => {
        this.Manufacturer = response;
      })
    },
    handleSave() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          http.post('/api/manufacturer', this.form).then((response) => {
            this.getManufacturer();
            this.dialogVisible = false;
          })
        } else {
          return false;
        }
      });
    },
    handleDelete(index, data) {
      const { id } = data;
      http.delete('/api/manufacturer/' + id).then((response) => {
        this.getManufacturer();
        this.$message({
          message: '削除に成功しました！',
          type: 'success'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
div.factoryLogin {
  div.topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font: normal normal bold 24px/35px Noto Sans CJK JP;
      color: #333333;
    }
    .el-button {
      background: #29619C 0% 0% no-repeat padding-box;
      border: 2px solid #29619C;
      border-radius: 4px;
    }
  }
}
</style>
