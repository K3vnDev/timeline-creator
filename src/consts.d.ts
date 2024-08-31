export type Timeline = Array<Point | Mark>

export interface Point {
  type: 'point'
  content: {
    title?: string
    image?: string
    desc?: string
  }
}

export interface Mark {
  type: 'mark'
  content: {
    text: string
  }
}
