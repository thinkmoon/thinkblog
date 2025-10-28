import axios from 'axios';

export const pushUrl = (url: string): void => {
  if (process.server) {
    const site = 'https://blog.thinkmoon.cn';
    axios.post(`http://data.zz.baidu.com/urls?site=${site}&token=CKLtHWl6TKYOJw39`, `${site}/url`)
      .then(() => {
        console.log('[info] 推送成功:', url);
      })
      .catch(() => {
        console.error('[error] 推送失败:', url);
      });
  }
};
