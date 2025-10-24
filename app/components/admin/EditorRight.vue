<template>
  <div class="right" :style="{ 'right': isCollapse ? '-220px' : '-20px' }">
    <section>
      <span class="title">文章分类</span>
      <div class="content">
        <ClientOnly>
          <el-select
            key="category"
            v-model="articleStore.article.categoryId"
          >
            <el-option
              v-for="item of categoryList"
              :key="item.mid"
              :label="item.name"
              :value="item.mid"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </ClientOnly>
      </div>
    </section>
    <section>
      <span class="title">文章标签</span>
      <div class="content">
        <ClientOnly>
          <el-select
            key="category"
            v-model="articleStore.article.selectedTag"
            filterable
            multiple
          >
            <el-option
              v-for="item of tagList"
              :key="item.tid"
              :label="item.name"
              :value="item.tid"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </ClientOnly>
      </div>
    </section>
    <div class="custom-options">
      <template
        v-for="(custom,index) in articleStore.article.fields"
        :key="custom.name"
      >
        <span>{{ custom.name }}</span>
        <el-input
          v-model="articleStore.article.fields[index].value"
          type="textarea"
          rows="6"
          class="input-with-select"
          placeholder="请输入"
        />
      </template>
    </div>
    <div class="operate-bar" @click="isCollapse = !isCollapse">
      <el-icon v-show="isCollapse">
        <icon-arrow-left></icon-arrow-left>
      </el-icon>
      <el-icon v-show="!isCollapse">
        <icon-arrow-right></icon-arrow-right>
      </el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useArticle } from "~/store/article";
import CategoryApi from '@/api/CategoryApi';
import TagApi from '@/api/TagApi';
import { onMounted } from "vue";

const articleStore = useArticle();
const isCollapse = ref(false);

const tagList = ref([]);
const categoryList = ref([]);

async function getTag() {
  tagList.value = await TagApi.getTag();
}

async function getCategory() {
  categoryList.value = await CategoryApi.getCategory();
}

onMounted(() => {
  getCategory();
  getTag();
});
</script>
<style lang="less" scoped>
.right {
  transition: 1s;
  position: absolute;
  width: 200px;
  padding: 6px;
  height: 100%;
  background-color: #fff;
  z-index: 999;
  border: 1px solid #ccc;
}

.operate-bar {
  cursor: pointer;
  position: absolute;
  background-color: #fff;
  height: 100px;
  width: 20px;
  left: -20px;
  top: 40%;
  border: 1px solid #ccc;
  border-right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.custom-options {
  > span {
    margin: 4px 0;
    display: flex;
  }
}

</style>
