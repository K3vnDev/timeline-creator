export type Element = Point | Mark
export type PointerEvents = 'auto' | 'none'
export type HexColor = `#${string}`

export interface Timeline {
  name: string
  id: string
  color: HexColor
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
