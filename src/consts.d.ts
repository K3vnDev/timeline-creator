import type { Point, Timeline } from './types.d'
import { generateElementId } from './utils/generateElementId'

export const newPointTemplate: Point = {
  type: 'point',
  content: {
    title: '',
    image: '',
    desc: ''
  }
}

export const intialTimeline: Timeline = [
  {
    type: 'mark',
    id: generateElementId([]),
    content: { text: 'Gatos' }
  },
  {
    type: 'point',
    id: generateElementId([]),
    content: {
      title: 'My first time point',
      image: 'https://www.cdc.gov/healthy-pets/media/images/2024/04/Cat-on-couch.jpg',
      desc: 'hell yeah'
    }
  },
  {
    type: 'point',
    id: generateElementId([]),
    content: {
      title: 'My second time point',
      image:
        'https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg',
      desc: 'hell yeah'
    }
  },
  {
    type: 'point',
    id: generateElementId([]),
    content: {
      title: 'My third time point',
      image:
        'https://media.istockphoto.com/id/1361394182/photo/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg?s=612x612&w=0&k=20&c=6yvVxdufrNvkmc50nCLCd8OFGhoJd6vPTNotl90L-vo=',
      desc: 'hell yeah'
    }
  },
  {
    type: 'point',
    id: generateElementId([]),
    content: {
      title: 'My fourth time point',
      image:
        'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      desc: 'hell yeah'
    }
  },
  {
    type: 'point',
    id: generateElementId([]),
    content: {
      title: 'My fifth time point',
      image:
        'https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?w=1200',
      desc: 'hell yeah'
    }
  }
]
