import { defineNuxtPlugin } from '#app';
import {
  ElBacktop,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElImage,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElPagination,
  ElScrollbar, ElSelect, ElMessage, ElSubMenu, ElTable, ElTableColumn, ElTag,
  ID_INJECTION_KEY,
} from 'element-plus';
import { User, Star, View, Calendar, FolderOpened, ArrowRight, ArrowLeft } from '@element-plus/icons-vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElBacktop);
  nuxtApp.vueApp.use(ElBreadcrumb);
  nuxtApp.vueApp.use(ElBreadcrumbItem);
  nuxtApp.vueApp.use(ElButton);
  nuxtApp.vueApp.use(ElContainer);
  nuxtApp.vueApp.use(ElForm);
  nuxtApp.vueApp.use(ElFormItem);
  nuxtApp.vueApp.use(ElHeader);
  nuxtApp.vueApp.use(ElIcon);
  nuxtApp.vueApp.use(ElImage);
  nuxtApp.vueApp.use(ElInput);
  nuxtApp.vueApp.use(ElLink);
  nuxtApp.vueApp.use(ElMain);
  nuxtApp.vueApp.use(ElMenu);
  nuxtApp.vueApp.use(ElMenuItem);
  nuxtApp.vueApp.use(ElOption);
  nuxtApp.vueApp.use(ElPagination);
  nuxtApp.vueApp.use(ElScrollbar);
  nuxtApp.vueApp.use(ElSelect);
  nuxtApp.vueApp.use(ElMessage);
  nuxtApp.vueApp.use(ElSubMenu);
  nuxtApp.vueApp.use(ElTable);
  nuxtApp.vueApp.use(ElTableColumn);
  nuxtApp.vueApp.use(ElTag);
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  });
  nuxtApp.vueApp.component('IconUser', User);
  nuxtApp.vueApp.component('IconFolderOpened', FolderOpened);
  nuxtApp.vueApp.component('IconCalendar', Calendar);
  nuxtApp.vueApp.component('IconView', View);
  nuxtApp.vueApp.component('IconStar', Star);
  nuxtApp.vueApp.component('icon-arrow-right', ArrowRight);
  nuxtApp.vueApp.component('icon-arrow-left', ArrowLeft);
});
