<template>
  <div class="editor-wrapper">
    <div class="editor-container">
      <el-input
        v-model="articleStore.article.title"
        class="title-input"
      />
      <v-md-editor
        v-model="articleStore.article.text"
        mode="editable"
        height="620px"
        :disabled-menus="[]"
        @save="saveArticle"
        @upload-image="handleUploadImage"
      />
    </div>
    <EditorRight/>
  </div>
</template>
<script lang="ts" setup>
import EditorRight from "~/components/admin/EditorRight.vue";
import VMdEditor from "~/components/MdEditor";
import ArticleApi from '@/api/ArticleApi';
import AttachmentApi from '@/api/AttachmentApi';
import dayjs from 'dayjs';
import { useArticle } from "~/store/article";
import * as qiniu from 'qiniu-js';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from "element-plus";

const router = useRouter();
const route = useRoute();

definePageMeta({
  keepalive: true,
});

let articleStore = useArticle();

onActivated(() => {
  if (route.query.cid) {
    ArticleApi.getDetail({ cid: route.query.cid }).then((res) => {
      articleStore.setArticle(res);
    });
  } else {
    articleStore.reset();
  }
});

function saveArticle() {
  const op = route.query.cid ? 'update' : 'add';
  if (!articleStore.article.categoryId) {
    return ElMessage.error('请选择文章分类');
  }
  if (!articleStore.article.selectedTag) {
    return ElMessage.error('请选择文章标签');
  }
  ArticleApi[op](articleStore.article).then(() => {
    ElMessage.success('保存成功');
    location.href = '/admin/post-list';
  }).catch((err) => {
    ElMessage.error('保存失败');
    console.error(err);
  });
}

function handleUploadImage(event, insertImage, files) {
  console.log(arguments);
  AttachmentApi.getUploadToken()
    .then((token: string) => {
      const key = dayjs().format('YYYY-MM-DD/HH-mm-ss');
      const observable = qiniu.upload(files[0], key, token);
      observable.subscribe(null, null, (res) => {
        insertImage({
          url: `https://blog.cdn.thinkmoon.cn/${res.key}`,
        });
      });
    });
}
</script>
<style lang="less">
.editor-wrapper {
  display: flex;
  position: relative;
}

.editor-container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;

  .title-input {
    margin: 6px 0;
  }

  .left textarea {
    height: 560px;
  }

  #write {
    min-height: 620px;
    box-sizing: border-box;
  }
}

.custom-options > .el-input-group {
  margin: 6px 0 0 0;
}
</style>

