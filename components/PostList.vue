<template>
  <div class="blog-posts">
    <div
      v-for="item in postList"
      :key="item.id"
      class="content-box"
    >
      <div class="posts-default-img">
        <a
          :href="getPostPath(item)"
          :title="item.title"
        >
          <div class="overlay"/>
          <el-image
            v-if="item.meta.thumb"
            :src="item.meta.thumb"
            fit="cover"
            lazy
          />
        </a>
      </div>
      <div class="posts-default-box">
        <div class="posts-default-title">
          <div
            v-if="item.tags.length > 0"
            class="post-entry-categories"
          >
            <el-tag
              v-for="tagItem in item.tags"
              :key="tagItem"
              class="post-tag"
              rel="tag"
            >
              <el-link
                :href="`/tag/${tagItem}/1`"
                type="primary"
              >
                {{ tagItem }}
              </el-link>
            </el-tag>
          </div>
          <el-link
             :href="getPostPath(item)"
            :underline="false"
            class="post-title"
          >
            {{ item.title }}
          </el-link>
        </div>
        <div class="posts-default-content">
          <div class="posts-text">
            {{ item.meta.desc }}
          </div>
          <div class="posts-default-info">
            <div class="left">
              <div class="post-author">
                <img
                  height="16"
                  :src="avatar"
                  style="border-radius:50% "
                  width="16"
                  alt="醉月思"
                >
                <el-link
                  href="https://www.thinkmoon.cn"
                  target="_blank"
                >
                  醉月思
                </el-link>
              </div>
              <div class="ico-warp">
                <el-icon>
                  <IconFolderOpened/>
                </el-icon>
                <el-link :href="`/category/${item.category}/1`">
                  {{ item.category }}
                </el-link>
              </div>
              <div class="ico-warp">
                <el-icon>
                  <IconCalendar/>
                </el-icon>
                <a>{{ item.date }}</a>
              </div>
            </div>
            <div class="right">
              <div class="ico-warp">
                <el-icon>
                  <IconView/>
                </el-icon>
                <span>{{ item.views }}</span>
              </div>
              <div class="ico-warp">
                <el-icon>
                  <IconStar/>
                </el-icon>
                <span>{{ item.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
function getPostPath(item:any) {
    return `/post${item.path}`
}

const avatar = 'https://blog.cdn.thinkmoon.cn/%E5%81%B7%E6%98%9F%E4%B9%9D%E6%9C%88%E5%A4%A9%E5%A4%B4%E5%83%8F.jpeg';

defineProps({
  postList: Array,
});
</script>
<style lang="less" scoped>
.blog-posts {
  text-align: left;
}

.content-box {
  margin: 20px 0;
  padding: 20px;
  background: #fff;

  .el-image {
    height: 256px;
    width: 100%;
  }

  .post-title {
    font-size: 24px;
    color: #000;

    &:hover {
      color: var(--el-link-default-active-color);
    }
  }

  .posts-text {
    color: #606266;
    font-size: 14px;
  }

  .post-tag {
    margin: 4px 6px;
  }

  @media (max-aspect-ratio: 14/9) {
    margin: 10px 0;
    padding: 10px;
    .posts-text {
      color: #606266;
      font-size: 12px;
    }
    .post-title {
      font-size: 18px;
      color: #000;
    }
  }
}

.posts-default-info {
  margin-top: 6px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  color: #909399;

  .ico-warp {
    display: flex;
    align-items: center;

    :deep(.el-icon) {
      margin-right: 4px;
    }
  }

  > div {
    display: flex;
  }

  .post-author {
    display: flex;
    align-items: center;
  }

  div {
    margin: 0 2px;
  }

  a {
    line-height: 14px;
  }
}
</style>
