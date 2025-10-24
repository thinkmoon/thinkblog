<template>
  <div class="footer">
    <span>Copyright © 2017-{{ (new Date()).getFullYear() }} 指尖魔法屋. All rights reserved</span>
    <span>POWERED BY thinkBlog · v{{ config.VERSION }}</span>
    <span>网站持续搭建中，感谢关注</span>
    <span>本站已顽强运行：蛮久了~</span>
    <div>
      <el-link
        href="http://beian.miit.gov.cn/"
        type="primary"
      >
        粤ICP备17055617号
      </el-link>
    </div>
  </div>
</template>
<script setup lang="ts">
const config = useAppConfig();

</script>
<style lang="less" scoped>
.footer {
  text-align: center;
  background: #303133;
  color: #909399;
  height: 120px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  justify-content: center;
  @media (max-aspect-ratio: 14/9) {
    font-size: 12px;
  }
}
</style>
