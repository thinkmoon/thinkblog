<template>
  <el-container>
    <el-aside
      class="admin-header"
      :style="{width: isCollapse ? '70px' : '160px' }"
    >
      <ClientOnly>
        <el-menu
          :collapse="isCollapse"
          :default-active="defaultActive"
          active-text-color="#409eff"
          unique-opened
          @select="select"
        >
          <el-menu-item index="/admin">
            主页
          </el-menu-item>
          <el-menu-item index="/admin/post-list">
            文章
          </el-menu-item>
          <div class="flex-grow"/>
          <div @click="switchCollapse" class="pointer switch-collapse">
            <el-icon v-show="!isCollapse">
              <icon-arrow-left></icon-arrow-left>
            </el-icon>
            <el-icon v-show="isCollapse">
              <icon-arrow-right></icon-arrow-right>
            </el-icon>
          </div>
        </el-menu>
      </ClientOnly>
    </el-aside>
    <el-main>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">
          管理端
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/admin/post-list">文章</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/admin/article-editor"><el-button size="small">新增文章</el-button></a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <NuxtPage/>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});
const isCollapse = ref(true);
const route = useRoute();
const defaultActive = route.path;

function switchCollapse() {
  isCollapse.value = !isCollapse.value;
}

function select(url) {
  location.href = url;
}
</script>
<style lang="less" scoped>
.flex-grow {
  flex-grow: 1;
}

.el-menu {
  display: flex;
  flex-direction: column;
}

.app-container {
  .el-container {
    height: 100%;
  }

  .admin-header {
    display: flex;
    padding: 0;
    max-width: 160px;
    transition: 1s;

    :deep(.el-menu) {
      width: 100%;
    }

    .switch-collapse {
      display: flex;
      justify-content: center;
    }
  }

  .el-main {
    padding: 8px 16px;

    .el-breadcrumb {
      margin-bottom: 8px;
    }
  }
}
</style>
