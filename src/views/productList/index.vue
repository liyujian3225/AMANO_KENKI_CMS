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
            :src="scope.row.coverUrl"
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
        label="販売状態">
        <template slot-scope="scope">
          <el-select v-model="scope.row.saleStatus" placeholder="请选择" @change="(val) => changeSaleStatus(val, scope.row.id)">
            <el-option label="售卖中" value="ON_SOLD"></el-option>
            <el-option label="售卖完毕" value="SOLD_OUT"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)">編集
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
    const category = {
      boat: "MARINE_SUPPLIES",
      engine: "ENGINE",
      buildMachine: "USED_CONSTRUCTION_MACHINE",
    }
    return {
      pageName: this.$route.name,
      pageNameMap: {
        boat: "マリン用品",
        engine: "エンジン",
        buildMachine: "中古建機",
      },
      searchParams: {
        category: category[this.$route.name],
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
      http.get('/api/product', { params: this.searchParams }).then((response) => {
        const { totalElements, content } = response;
        this.productList = content.map(item => {
          const coverId = item.productFiles.filter(a => a.type === "COVER")[0].id;
          const coverUrl = `http://163.43.183.26:8000/api/product/pict/${coverId}`;
          return {
            ...item,
            coverUrl,
          }
        });
        this.totalNum = totalElements;
      })
    },
    productAdd() {
      this.$router.push({
        name: "productAdd",
        query: {
          name: this.pageName
        }
      })
    },
    changeSaleStatus(val, id) {
      http.put('/api/product', { id, saleStatus: val }).then((response) => {
        this.getProductList();
      })
    },
    handleDelete(index, data) {
      const { id } = data;
      http.delete(`/api/product/${id}`).then((response) => {
        this.getProductList();
      })
    },
    handleEdit(index, data) {
      const { id } = data;
      this.$router.push({
        name: "productAdd",
        query: {
          name: this.pageName,
          id
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
