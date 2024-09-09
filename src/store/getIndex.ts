import type { Element } from '../types.d'

export const getIndex = (elements: Array<Element>, id: string) => {
  return elements.findIndex(el => el.id === id)
}
