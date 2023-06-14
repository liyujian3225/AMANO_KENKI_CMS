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
        <el-input v-model="addForm.priority"></el-input>
      </el-form-item>
      <el-form-item label="品名">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="製品状態">
            <el-select v-model="addForm.status" placeholder="请选择製品状態">
              <el-option label="中古" value="SECOND_HAND"></el-option>
            </el-select>
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
        <el-input v-model="addForm.option"></el-input>
      </el-form-item>
      <el-form-item label="ギア比/ギア型式">
        <el-input v-model="addForm.gearType"></el-input>
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


        fileIds: [],
        priority: "",  //3优先级，只支持数字。
        name: "",  // 4产品名字
        status: "",  // 5产品状态
        manufacturer_id: "",  //6厂家ID
        horsepower: "",  //7马力
        manufacture_year: "",  //8制造年
        option: "",  //9描述
        gearType: "",  //10型号
        videoUrl: "",  //11视频地址
        description: "",  //12商品说明
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
