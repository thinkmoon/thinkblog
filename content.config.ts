import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    content: defineCollection(
      // adds the sitemap frontmatter key to the collection
      asSitemapCollection({
        type: 'page',
        source: '**/*.md',
        schema: z.object({
          title: z.string(),
          date: z.string(),
          modified: z.string().optional(),
          category: z.string().optional(),
          tags: z.array(z.string()),
          description: z.string().optional(),
          fields: z.record(z.any()).optional()
        })
      })
    )
  }
})
