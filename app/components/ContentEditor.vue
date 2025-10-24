<template>
  <div class="content-editor">
    <div class="editor-header">
      <el-input
        v-model="title"
        placeholder="请输入标题"
        class="title-input"
      />
      <div class="editor-actions">
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </div>
    <div class="editor-meta">
      <el-input
        v-model="description"
        placeholder="请输入描述"
        class="description-input"
      />
      <el-input
        v-model="icon"
        placeholder="请输入图标（可选）"
        class="icon-input"
      />
    </div>
    <v-md-editor
      v-model="content"
      mode="editable"
      height="600px"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import * as qiniu from 'qiniu-js'
import AttachmentApi from '@/api/AttachmentApi'
import { getContent, createNewContent, updateExistingContent, type Content } from '@/utils/content'

const props = defineProps<{
  path: string
}>()

const route = useRoute()
const router = useRouter()
const title = ref('')
const content = ref('')
const description = ref('')
const icon = ref('')

// 加载现有内容
onMounted(async () => {
  if (props.path) {
    try {
      const data = await getContent(props.path)
      if (data) {
        title.value = data.title
        content.value = data.content
        description.value = data.description || ''
        icon.value = data.icon || ''
      }
    } catch (error) {
      console.error('Failed to load content:', error)
      ElMessage.error('加载内容失败')
    }
  }
})

// 处理图片上传
async function handleUploadImage(event: any, insertImage: any, files: File[]) {
  try {
    const token = await AttachmentApi.getUploadToken()
    const key = dayjs().format('YYYY-MM-DD/HH-mm-ss')
    const observable = qiniu.upload(files[0], key, token)
    
    observable.subscribe(null, null, (res) => {
      insertImage({
        url: `https://blog.cdn.thinkmoon.cn/${res.key}`,
      })
    })
  } catch (error) {
    console.error('Failed to upload image:', error)
    ElMessage.error('上传图片失败')
  }
}

// 保存内容
async function handleSave() {
  if (!title.value) {
    ElMessage.warning('请输入标题')
    return
  }

  try {
    const contentData = {
      title: title.value,
      content: content.value,
      description: description.value,
      icon: icon.value,
      updatedAt: new Date().toISOString()
    }

    let success = false
    if (props.path) {
      // 更新现有内容
      success = await updateExistingContent(props.path, contentData)
      if (success) {
        ElMessage.success('更新成功')
      }
    } else {
      // 创建新内容
      const path = `/content/${dayjs().format('YYYY-MM-DD')}/${title.value.toLowerCase().replace(/\s+/g, '-')}`
      success = await createNewContent(path, contentData)
      if (success) {
        ElMessage.success('创建成功')
      }
    }

    if (success) {
      router.push('/')
    } else {
      ElMessage.error('保存失败')
    }
  } catch (error) {
    console.error('Failed to save content:', error)
    ElMessage.error('保存失败')
  }
}

// 取消编辑
function handleCancel() {
  router.back()
}
</script>

<style scoped>
.content-editor {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.editor-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.title-input {
  width: 300px;
}

.description-input {
  flex: 1;
}

.icon-input {
  width: 200px;
}

.editor-actions {
  display: flex;
  gap: 10px;
}
</style> 