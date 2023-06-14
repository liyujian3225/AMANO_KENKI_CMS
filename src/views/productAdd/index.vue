<template>
  <div class="productAdd">
    <el-form
      label-position="top"
      label-width="80px"
      :model="addForm">
      <el-form-item label="一覧">
        <el-upload
          action="http://163.43.183.26:8000/api/product/pict"
          accept="image/jpg,image/jpeg,image/png"
          :data="{ type: 'COVER' }"
          :headers="headerObj"
          :show-file-list="false"
          :on-success="handleCoverUploadSuccess">
          <img v-if="coverUrl" :src="coverUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="写真">
        <el-upload
          action="http://163.43.183.26:8000/api/product/pict"
          accept="image/jpg,image/jpeg,image/png"
          :data="{ type: 'SLIDESHOW' }"
          :headers="headerObj"
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
            <el-select v-model="addForm.manufacturer_id" placeholder="请选择厂家">
              <el-option
                v-for="item in Manufacturer"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="馬力">
            <el-input v-model="addForm.horsepower"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="製造年">
            <el-date-picker
              v-model="addForm.manufacture_year"
              type="year"
              placeholder="选择年">
            </el-date-picker>
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
        <el-input v-model="addForm.videoUrl"></el-input>
      </el-form-item>
      <el-form-item label="商品説明">
        <el-input
          type="textarea"
          resize="none"
          :rows="10"
          v-model="addForm.description">
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
import { getItem } from "@/utils/storage";
import http from "@/apiRequest/http";
export default {
  data() {
    return {
      headerObj: { Authorization: getItem("token")},
      Manufacturer: [],
      addForm: {

        coverUrl: '',


        name: "",
        region: "",
        type: "",

        horsepower: "",  //马力
        manufacturer_id: "",  //厂家ID
        manufacture_year: "",  //制造年
        videoUrl: "",  //视频地址
        description: "",  //商品说明
      }
    }
  },
  created() {
    this.getManufacturer();
  },
  methods: {
    handleCoverUploadSuccess(res, file) {
      console.log(res)
    },
    getManufacturer() {
      http.get('/api/manufacturer').then((response) => {
        this.Manufacturer = response;
      })
    },
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
