import VMdPreview from '@kangc/v-md-editor/lib/preview.js';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);
import externalLinks from 'markdown-it-external-links';


VMdPreview.xss.extend({
  // 扩展白名单
  whiteList: {
    a: ['target', 'href', 'title', 'rel'],
  },
});
VMdPreview.use(githubTheme, {
  Hljs: hljs,
  extend(md) {
    md.use(externalLinks, {
      externalClassName: 'custom-external-link',
      internalClassName: 'custom-internal-link',
      internalDomains: ['www.thinkmoon.cn'],
      externalRel: 'nofollow noopener noreferrer',
    });
  },
});

export default VMdPreview;
