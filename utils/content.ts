import { useAsyncData } from '#imports'

export interface ContentData {
  title: string
  content: string
  updatedAt: string
  description?: string
  icon?: string
}

export interface Content extends ContentData {
  _path: string
  _dir: string
  _draft: boolean
  _locale: string
  _type: string
  _file: string
  _extension: string
}

interface WhereQuery {
  where: (query: any) => ContentQuery
  findOne: () => Promise<Content | null>
  find: () => Promise<Content[]>
}

interface ContentQuery extends WhereQuery {}

declare const queryCollection: (collection: string) => ContentQuery
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