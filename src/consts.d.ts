import type { Mark, Point, Timeline } from './types.d'
import { generateId } from './utils/generateId'

export const newPointTemplate: Point = {
  type: 'point',
  content: {
    title: '',
    image: '',
    desc: ''
  }
}

export const newMarkTemplate: Mark = {
  type: 'mark',
  content: {
    text: ''
  }
}

export const TIMELINE_DEFAULT_NAME = 'My New Timeline'

export const intialTimeline: Timeline = {
  name: TIMELINE_DEFAULT_NAME,
  id: generateId([]),
  color: '#2633e0',
  elements: [
    {
      type: 'mark',
      id: generateId([]),
      content: { text: 'My mark' }
    },
    {
      type: 'point',
      id: generateId([]),
      content: {
        title: 'My first title',
        image: 'https://www.cdc.gov/healthy-pets/media/images/2024/04/Cat-on-couch.jpg',
        desc: 'My first description'
      }
    },
    {
      type: 'point',
      id: generateId([]),
      content: {
        title: '',
        image:
          'https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg',
        desc: ''
      }
    },
    {
      type: 'point',
      id: generateId([]),
      content: {
        title: '',
        image:
          'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        desc: 'My second description'
      }
    },
    {
      type: 'point',
      id: generateId([]),
      content: {
        title: 'My second title',
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim, autem.'
      }
    }
  ]
}
