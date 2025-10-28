<template>
  <div class="top-menu">
    <div class="left">
      <el-link href="/">
        指尖魔法屋
      </el-link>
    </div>
    <el-menu
      :default-active="defaultActive"
      mode="horizontal"
      @select="select"
    >
      <el-menu-item index="/page/1">
        首页
      </el-menu-item>
      <el-menu-item index="/category">
        <NuxtLink to="/category">
          分类
        </NuxtLink>
      </el-menu-item>
      <el-menu-item index="/tag">
        <NuxtLink to="/tag">
          标签
        </NuxtLink>
      </el-menu-item>
    </el-menu>
    <div class="right">
      <el-link
        :underline="false"
        href="/admin"
      >
        <el-icon
          :size="26"
          class="pointer"
        >
          <IconUser />
        </el-icon>
        登录
      </el-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute();

// 计算高亮项：如果是分类或标签相关页面，则高亮对应菜单项
const defaultActive = computed(() => {
  const path = route?.path ?? '/';
  
  // 如果是分类页面或分类相关页面
  if (path.startsWith('/category')) {
    return '/category';
  }
  
  // 如果是标签页面或标签相关页面
  if (path.startsWith('/tag')) {
    return '/tag';
  }
  
  // 首页
  if (path === '/page/1' || path === '/' || path === '/index.html') {
    return '/page/1';
  }
  
  return path;
});

function select(url) {
  location.href = url;
}
</script>
<style lang="less" scoped>
a {
  text-decoration: none
}

.top-menu {
  width: 100vw;
  z-index: 3;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  border-bottom: 1px solid #dcdfe6;

  .left, .right {
    flex: 1.5;
  }

  .right {
    text-align: right;
  }

  .el-menu {
    flex: 7;
    border: none;
  }
}
</style>
