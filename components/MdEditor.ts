import VMdEditor from '@kangc/v-md-editor';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';

// highlightjs
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('python', python);
import yaml from 'highlight.js/lib/languages/yaml';
hljs.registerLanguage('yaml', yaml);

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

export default VMdEditor;
