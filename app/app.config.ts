import dayjs from 'dayjs';
import packageInfo from './package.json';
export default defineAppConfig({
  TITLE: '指尖魔法屋-醉月思的博客',
  VERSION: `${packageInfo.version} · build-${dayjs().format('YYYYMMDD')}`,
  serviceUrl: 'https://service.thinkmoon.cn/api',
});
