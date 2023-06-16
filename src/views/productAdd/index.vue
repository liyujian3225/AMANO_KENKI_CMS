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
          list-type="picture-card"
          accept="image/jpg,image/jpeg,image/png"
          :data="{ type: 'SLIDESHOW' }"
          :headers="headerObj"
          :multiple="true"
          :limit="15"
          :file-list="fileList"
          :on-success="handleListUploadSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="ソート">
            <el-input-number
              v-model="addForm.priority"
              :min="1" >
            </el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

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
              value-format="yyyy"
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
        <el-button type="primary" @click="handleCancel">キャンセル</el-button>
        <el-button @click="handleSaveProductInfo">保存</el-button>
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
      id: this.$route.query.id,
      name: this.$route.query.name,
      headerObj: { Authorization: getItem("token")},
      Manufacturer: [],
      category: {
        boat: "MARINE_SUPPLIES",
        engine: "ENGINE",
        buildMachine: "USED_CONSTRUCTION_MACHINE",
      },

      //封面图地址
      coverUrl: '',
      coverId: '',

      //批量上传图片
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,

      addForm: {
        id: undefined,
        fileIds: [],
        priority: 1,  //3优先级，只支持数字。
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
  async created() {
    await this.getManufacturer();
    if (this.id) this.getProduceInfo();
  },
  methods: {
    //查询产品详情
    getProduceInfo() {
      http.get(`/api/product/${this.id}`).then((response) => {
        this.coverId = response.productFiles.filter(item => item.type === "COVER")[0].id;
        this.coverUrl = `http://163.43.183.26:8000/api/product/pict/${this.coverId}`;

        const fileList = response.productFiles.filter(item => item.type !== "COVER");
        this.fileList = fileList.map(item => {
          const { id } = item;
          return {
            id,
            name: "",
            url: `http://163.43.183.26:8000/api/product/pict/${id}`,
          }
        })
        this.addForm = {
          id: this.id,
          fileIds: response.productFiles.map(item => item.id),
          priority: response.priority,
          name: response.name,
          status: response.status,
          manufacturer_id: response.manufacturer.id,  //6厂家ID
          horsepower: response.horsepower,
          manufacture_year: String(response.manufactureYear),
          option: response.option,
          gearType: response.gearType,
          videoUrl: response.videoUrl,
          description: response.description,
        }
      })
    },
    //上传封面图
    handleCoverUploadSuccess(res, file) {
      const { id } = res;
      this.coverUrl = `http://163.43.183.26:8000/api/product/pict/${id}`;
      //先提出之前的coverId
      this.addForm.fileIds = this.addForm.fileIds.filter(pid => pid !== this.coverId);
      this.addForm.fileIds.push(id);
      this.coverId = id;
    },
    //批量上传图片
    handleListUploadSuccess(res, file) {
      const { id } = res;
      this.addForm.fileIds.push(id);
    },
    handleRemove(file, fileList) {
      let id;
      if (file.hasOwnProperty("response")) {
        id = file.response;
      } else {
        id = file.id;
      }
      this.addForm.fileIds = this.addForm.fileIds.filter(pid => pid !== id);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getManufacturer() {
      http.get('/api/manufacturer').then((response) => {
        this.Manufacturer = response;
      })
    },
    async handleSaveProductInfo() {
      const params = {
        ...this.addForm,
        category: this.category[this.name]
      }
      !!this.id ? await http.put('/api/product', params) : await http.post('/api/product', params);
      this.handleCancel();
    },
    handleCancel() {
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>
div.productAdd {
  width: 800px;
  margin: 0 auto;
  ::v-deep {
    .el-select, .el-input {
      width: 100%;
    }
  }
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
