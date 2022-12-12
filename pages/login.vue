<template>
  <div class="app-container">
    <Title>登录 | {{ config.TITLE }}</Title>
    <div class="login-dialog">
      <el-form :model="form">
        <el-form-item label="账号">
          <el-input v-model="form.account" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import UserApi from '@/api/UserApi';
import { ElMessage } from 'element-plus';

const config = useAppConfig();

const auth = useCookie('auth', { domain: 'thinkmoon.cn', maxAge: 3600 });

if (process.client && auth.value) {
  navigateTo({ path: '/admin' });
}

definePageMeta({
  layout: false,
});

const form = reactive({
  account: '',
  password: '',
});

function onSubmit() {
  UserApi.login(form).then((res: string) => {
    auth.value = res;
    if (process.client) {
      window.location.href = '/admin';
    }
  }).catch(() => {
    if (process.client) {
      ElMessage.error('登录失败');
    }
  });
}

</script>

<style lang="less" scoped>
.app-container {
  display: flex;
  justify-content: center;

  .login-dialog {
    margin-top: 10%;
    height: 500px;
  }
}
</style>
