import { v as vue_cjs_prod, b as _export_sfc$1, u as useRuntimeConfig, c as vueRouter_cjs_prod, A as ArticleApi, d as __nuxt_component_0$1 } from '../server.mjs';
import { u as useAsyncData } from './asyncData.0d50ce9e.mjs';
import { p as pushUrl } from './BaiduSite.6f90474b.mjs';
import { s as serverRenderer } from '../../handlers/renderer.mjs';
import 'unenv/runtime/mock/proxy';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'h3';
import 'defu';
import 'axios';
import 'qiniu-js';
import 'dayjs';
import '@element-plus/icons-vue';
import 'lodash-unified';
import '@vueuse/core';
import '@popperjs/core';
import '@ctrl/tinycolor';
import 'dayjs/plugin/localeData.js';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/plugin/advancedFormat.js';
import 'dayjs/plugin/weekOfYear.js';
import 'dayjs/plugin/weekYear.js';
import 'dayjs/plugin/dayOfYear.js';
import 'dayjs/plugin/isSameOrAfter.js';
import 'dayjs/plugin/isSameOrBefore.js';
import 'async-validator';
import 'memoize-one';
import 'escape-html';
import 'normalize-wheel-es';
import '@floating-ui/dom';
import '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/theme/github.js';
import 'highlight.js';
import '@kangc/v-md-editor/lib/preview.js';
import 'markdown-it-external-links';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'stream';

const _sfc_main = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[pageIndex]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const route = vueRouter_cjs_prod.exports.useRoute();
    const pageIndex = route.params.pageIndex;
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("res", () => ArticleApi.getList({ current: pageIndex }), "$66Eht5WzLu")), __temp = await __temp, __restore(), __temp);
    const postList = vue_cjs_prod.reactive(data.value.records);
    postList.forEach((item) => {
      if (item.fields instanceof Array) {
        const fields = {};
        item.fields.forEach((i) => {
          fields[i.name] = i.value;
        });
        item.fields = fields;
      }
    });
    data.value.total;
    pushUrl(`/page/${route.params.pageIndex}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      const _component_PostList = __nuxt_component_0$1;
      const _component_el_link = vue_cjs_prod.resolveComponent("el-link");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "page-content" }, _attrs))} data-v-631eddd1>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u7B2C${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(route).params.pageIndex)}\u9875 | ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(config).TITLE)}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("\u7B2C" + vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(route).params.pageIndex) + "\u9875 | " + vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(config).TITLE), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="post-container" data-v-631eddd1>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_PostList, { "post-list": postList }, null, _parent));
      _push(`<div class="pagination-div" data-v-631eddd1><div data-v-631eddd1>`);
      if (Number(vue_cjs_prod.unref(pageIndex)) !== 1) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_el_link, {
          href: `/page/${Number(vue_cjs_prod.unref(pageIndex)) - 1}`,
          type: "primary"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u4E0A\u4E00\u9875 `);
            } else {
              return [
                vue_cjs_prod.createTextVNode(" \u4E0A\u4E00\u9875 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-631eddd1>`);
      if (Number(vue_cjs_prod.unref(pageIndex)) !== vue_cjs_prod.unref(data).pages) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_el_link, {
          href: `/page/${Number(vue_cjs_prod.unref(pageIndex)) + 1}`,
          type: "primary"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u4E0B\u4E00\u9875 `);
            } else {
              return [
                vue_cjs_prod.createTextVNode(" \u4E0B\u4E00\u9875 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/page/[pageIndex].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _pageIndex_ = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__scopeId", "data-v-631eddd1"]]);

export { _pageIndex_ as default };
//# sourceMappingURL=_pageIndex_.1eaa5938.mjs.map