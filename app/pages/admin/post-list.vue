<template>
  <div>
    <el-table
      :data="tableData"
      height="640"
      size="small"
      stripe
    >
      <el-table-column
        prop="cid"
        label="序号"
        width="80"
        align="center"
      />
      <el-table-column
        align="center"
        label="缩略图"
        prop="title"
        width="100"
      >
        <template #default="scope">
          <el-image
            :src="scope.row.fields.thumb"
            fit="cover"
            style="width: 180px; height: 60px"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="320"
      >
        <template #default="scope">
          <el-link @click="handleEdit(scope.$index, scope.row)">
            <strong>{{ scope.row.title }}</strong>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="标签"
        prop="title"
        width="160"
      >
        <template #default="scope">
          <el-tag
            v-for="item of scope.row.tag"
            :key="item.tid"
            class="margin-xs"
            size="small"
          >
            {{ item.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="desc"
        label="摘要"
      >
        <template #default="scope">
          {{ scope.row.fields.desc }}
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        label="创建时间"
        width="110"
      >
        <template #default="scope">
          <span>{{ formatTime(scope.row.created * 1000, 'YYYY/MM/DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="modified"
        label="更新时间"
        width="110"
      >
        <template #default="scope">
          <span>{{ formatTime(scope.row.modified * 1000, 'YYYY/MM/DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="pagination.index"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import ArticleApi from '@/api/ArticleApi';
import { formatTime } from '~/utils/TimeUtils';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  keepalive: true,
});

const router = useRouter();
const tableData = ref([]);
const pagination = reactive({
  total: 0,
  index: 0,
  size: 10,
});

loadData();

function loadData() {
  ArticleApi.getList({
    current: pagination.index,
    size: pagination.size,
  }).then((res: any) => {
    tableData.value = res.records;
    tableData.value.forEach((item) => {
      if (item.fields instanceof Array) {
        const fields = {};
        item.fields.forEach((i) => {
          fields[i.name] = i.value;
        });
        item.fields = fields;
      }
    });
    pagination.index = res.current;
    pagination.total = res.total;
  });
}

function handleSizeChange(val) {
  pagination.size = val;
  loadData();
}

function handleCurrentChange(val) {
  pagination.index = val;
  loadData();
}

function handleEdit(index, row) {
  router.push(`/admin/article-editor?cid=${row.cid}`);
}
</script>
<style lang="less" scoped>
</style>
