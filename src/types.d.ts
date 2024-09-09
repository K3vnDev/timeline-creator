export type Element = Point | Mark
export type PointerEvents = 'auto' | 'none'

export type Timeline = {
  name: string
  id: string
  color: `#${string}`
  elements: Array<Element>
}

export interface Point {
  type: 'point'
  id: string
  content: {
    title: string
    image: string
    desc: string
  }
}

export interface Mark {
  type: 'mark'
  id: string
  content: {
    text: string
  }
}
