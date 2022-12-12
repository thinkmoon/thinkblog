import { defineStore } from 'pinia';
import { reactive } from "vue";

const articleTemplate = {
  cid: '',
  title: '',
  text: '',
  categoryId: '',
  selectedTag: [],
  fields: [
    {
      name: 'thumb',
      value: '',
      rows: 2,
    },
    {
      name: 'desc',
      value: '',
      rows: 6,
    },
  ]
};
export const useArticle = defineStore('article', () => {
  const article = reactive(articleTemplate);

  function setArticle(data: any) {
    article.cid = data.cid;
    article.categoryId = data.categoryId;
    article.title = data.title;
    article.text = data.text;
    article.selectedTag = data.tag.map((item: any) => item.tid);
    data.fields?.forEach((dataItem: any) => {
      const field = article.fields.find(item => item.name == dataItem.name);
      if (field) {
        field.value = dataItem.value;
      }
    });
  }

  function reset() {
    article.title = articleTemplate.title;
    article.text = articleTemplate.text;
    article.category_id = articleTemplate.category_id;
    article.selectedTag = articleTemplate.selectedTag;
    article.fields = articleTemplate.fields;
  }

  return { article, setArticle, reset };
});
