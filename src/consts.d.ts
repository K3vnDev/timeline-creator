import type { HexColor, Mark, Point, Timeline } from './types.d'
import { generateColor } from './utils/generateColor'
import { generateId } from './utils/generateId'

// templates

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

// accepted image formats

export const ACCEPTED_IMAGE_FORMATS = ['image/png', 'image/jpeg', 'image/webp']

// default timeline

export const DEFAULT_TIMELINE_NAME = 'My New Timeline'
export const DEFAULT_TIMELINE_COLOR: HexColor = '#2633e0'

export const DEFAULT_TIMELINE: Timeline = {
  name: DEFAULT_TIMELINE_NAME,
  id: generateId([]),
  color: DEFAULT_TIMELINE_COLOR,
  elements: [
    {
      type: 'mark',
      id: '0000',
      content: { text: 'My mark' }
    },
    {
      type: 'point',
      id: '0001',
      content: {
        title: 'My first title',
        image: 'https://www.cdc.gov/healthy-pets/media/images/2024/04/Cat-on-couch.jpg',
        desc: 'My first description'
      }
    },
    {
      type: 'point',
      id: '0010',
      content: {
        title: '',
        image:
          'https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg',
        desc: ''
      }
    },
    {
      type: 'point',
      id: '0011',
      content: {
        title: '',
        image:
          'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        desc: 'My second description'
      }
    },
    {
      type: 'point',
      id: '0100',
      content: {
        title: 'My second title',
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim, autem.'
      }
    }
  ]
}

// demo timeline

export const DEMO_TIMELINE: Timeline = {
  name: 'Example Demo Timeline',
  id: generateId([]),
  color: generateColor(),
  elements: [
    {
      type: 'mark',
      id: '0000',
      content: { text: 'Demo' }
    },
    {
      type: 'point',
      id: '0001',
      content: {
        title: 'This is the demo timeline',
        image: 'https://www.cdc.gov/healthy-pets/media/images/2024/04/Cat-on-couch.jpg'
      }
    },
    {
      type: 'point',
      id: '0010',
      content: {
        title: 'zzzzzzzzzzzzzzzzzzzz',
        desc: 'Please upgrape this later'
      }
    }
  ]
}
