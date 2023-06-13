<template>
  <div class="productAdd">
    <el-form
      label-position="top"
      label-width="80px"
      :model="addForm">
      <el-form-item label="一覧">
        <el-upload
          action="http://163.43.183.26:8000/api/product/pict"
          :data="{ type: 'COVER' }"
          :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="写真">
        <el-upload
          action="http://163.43.183.26:8000/api/product/pict"
          :data="{ type: 'COVER' }"
          :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="ソート">
        <el-input v-model="addForm.type"></el-input>
      </el-form-item>
      <el-form-item label="品名">
        <el-input v-model="addForm.type"></el-input>
      </el-form-item>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="製品状態">
            <el-input v-model="addForm.type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="メーカー">
            <el-input v-model="addForm.type"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="馬力">
            <el-input v-model="addForm.type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="製造年">
            <el-input v-model="addForm.type"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="オプション">
        <el-input v-model="addForm.type"></el-input>
      </el-form-item>
      <el-form-item label="ギア比/ギア型式">
        <el-input v-model="addForm.type"></el-input>
      </el-form-item>
      <el-form-item label="ビデオのリンク">
        <el-input v-model="addForm.type"></el-input>
      </el-form-item>
      <el-form-item label="商品説明">
        <el-input
          type="textarea"
          resize="none"
          :rows="10"
          v-model="addForm.type">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">キャンセル</el-button>
        <el-button>保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addForm: {
        name: "",
        region: "",
        type: "",
      }
    }
  }
}
</script>
<style lang="scss" scoped>
div.productAdd {
  width: 1000px;
  margin: 0 auto;
  ::v-deep .el-upload {
    border: 1px dashed #255691;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
