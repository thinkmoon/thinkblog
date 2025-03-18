import { defineContentConfig, defineCollection,z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        modified: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        description: z.string().optional(),
      })
    })
  }
})
