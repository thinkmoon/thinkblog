<template>
  <div class="page-content">
    <Title>所有分类 | {{ config.TITLE }}</Title>
    <el-tag
      v-for="category in data"
      :key="category.mid"
      type="info"
      class="category-list"
    >
      <el-link
        :href="`/category/${category.name}/1`"
        type="info"
      >
        {{ category.name }}({{ category.count }})
      </el-link>
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
import CategoryApi from '@/api/CategoryApi';

const config = useAppConfig();
const {data} = await useAsyncData('category', () => CategoryApi.getCategory());

</script>

<style lang="less" scoped>
.category-list {
	margin: 10px;
}
</style>
