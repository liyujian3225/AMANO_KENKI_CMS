<template>
  <div class="productList">
    <div class="topBar">
      <span>{{ pageNameMap[pageName] }}</span>
      <el-button type="primary" @click="productAdd">
        <i class="el-icon-plus"></i>
        新規
      </el-button>
    </div>
    <el-table
      :data="productList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="ID">
      </el-table-column>
      <el-table-column
        label="写真">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.productFiles[0].localStorage.path"
            fit="cover">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="メーカー">
        <template slot-scope="scope">
          <span>{{ scope.row.manufacturer.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="品名">
      </el-table-column>
      <el-table-column
        prop="priority"
        label="ソート">
      </el-table-column>
      <el-table-column
        prop="saleStatus"
        label="販売状態">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">編集
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">削除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import http from "@/apiRequest/http";

export default {
  data() {
    return {
      pageNameMap: {
        boat: "マリン用品",
        engine: "エンジン",
        buildMachine: "中古建機",
      },
      pageName: this.$route.name,
      searchParams: {
        id: "",
        name: "",
        manufacturerId: "",
        size: 10,
        page: 0,
      },
      productList: [],
    }
  },
  created() {
    this.getProductList();
  },
  methods: {
    getProductList() {
      http.get('/api/product', this.searchParams).then((response) => {
        const { totalElements, content } = response;
        this.productList = content;
        this.totalNun = totalElements;
      })
    },
    productAdd() {
      this.$router.push({
        name: "productAdd",
        query: {
          name: this.pageName
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
div.productList {
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
