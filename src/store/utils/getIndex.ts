import type { Element, Timeline } from '../../types'

export const getIndex = (array: Element[] | Timeline[], id: string) => {
  return array.findIndex(el => el.id === id)
}
