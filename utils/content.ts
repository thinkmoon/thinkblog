import { useAsyncData } from '#imports'

export interface ContentData {
  title: string
  content: string
  updatedAt: string
  description?: string
  icon?: string
}


interface WhereQuery {
  where: (query: any) => ContentQuery
  findOne: () => Promise<Content | null>
  find: () => Promise<Content[]>
}

interface ContentQuery extends WhereQuery {}

declare const createContent: (path: string, data: any) => Promise<void>
declare const updateContent: (path: string, data: any) => Promise<void>

export async function createNewContent(path: string, data: ContentData) {
  try {
    await createContent(path, {
      ...data,
      _path: path,
      _type: 'markdown',
      _extension: 'md'
    })
    return true
  } catch (error) {
    console.error('Failed to create content:', error)
    return false
  }
}

export async function updateExistingContent(path: string, data: ContentData) {
  try {
    await updateContent(path, {
      ...data,
      _path: path,
      _type: 'markdown',
      _extension: 'md'
    })
    return true
  } catch (error) {
    console.error('Failed to update content:', error)
    return false
  }
}

export async function getContent(path: string): Promise<Content | null> {
  try {
    const { data } = await useAsyncData('content', () => 
      queryCollection('content').where({ _path: path }).findOne()
    )
    return data.value as Content
  } catch (error) {
    console.error('Failed to get content:', error)
    return null
  }
}

export async function listContent(path: string = '/content') {
  try {
    const { data } = await useAsyncData('content-list', () => 
      queryCollection('content').where({ _path: { $contains: path } }).find()
    )
    return data.value as Content[]
  } catch (error) {
    console.error('Failed to list content:', error)
    return []
  }
}

interface Content {
  title?: string
  description?: string
  text?: string
  tag?: Array<{ name: string }>
  fields?: {
    desc?: string
    [key: string]: any
  }
  path?: string
  [key: string]: any
}

export const getContentUrl = (path: string) => {
  return `/post${path}`
}

export const getContentByPath = async (path: string) => {
  try {
    // 在静态模式下，直接使用queryContent
    const content = await queryContent('content', path)
    return content
  } catch (error) {
    console.error('Failed to get content by path:', error)
    return null
  }
}

export const getContentById = async (id: string) => {
  try {
    // 在静态模式下，直接使用queryContent
    const content = await queryContent('content', id)
    return content
  } catch (error) {
    console.error('Failed to get content by id:', error)
    return null
  }
}
export type { Content } 
