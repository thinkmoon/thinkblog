import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 sitemap.xml 文件
const sitemapPath = path.join(__dirname, '..', '.output', 'public', 'sitemap.xml');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// 替换路径，只为文章页面添加 /post 前缀
const updatedContent = sitemapContent.replace(
  /<loc>(\/[^<]+)<\/loc>/g,
  (match, path) => {
    // 跳过根路径和已经包含 /post 的路径
    if (path === '/' || path.startsWith('/post')) return match;
    
    // 只对文章页面添加 /post 前缀
    // 文章页面的特征：不包含 /category/、/tag/、/page/、/search、/admin 等路径
    const isArticlePage = !path.includes('/category/') && 
                          !path.includes('/tag/') && 
                          !path.includes('/page/') && 
                          !path.includes('/search') && 
                          !path.includes('/admin') &&
                          !path.includes('/login') &&
                          path !== '/index' &&
                          path !== '/404';
    
    if (isArticlePage) {
      return `<loc>/post${path}</loc>`;
    }
    
    // 其他页面保持原样
    return match;
  }
);

// 写回文件
fs.writeFileSync(sitemapPath, updatedContent, 'utf8');

console.log('Sitemap updated successfully!');
