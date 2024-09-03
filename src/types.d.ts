export type Timeline = Array<Point | Mark>

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
