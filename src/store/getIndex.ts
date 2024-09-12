import type { Element, Timeline } from '../types.d'

export const getIndex = (array: Element[] | Timeline[], id: string) => {
  return array.findIndex(el => el.id === id)
}
