import { create } from 'zustand'
import type { Timeline } from '../consts.d'

interface Store {
  timeline: Timeline
}

export const useStore = create<Store>()(() => ({
  timeline: [
    {
      type: 'mark',
      content: {
        text: '2019'
      }
    },
    ...Array(5).fill({
      type: 'point',
      content: {
        title: 'My first time point',
        image: 'https://www.cdc.gov/healthy-pets/media/images/2024/04/Cat-on-couch.jpg',
        desc: 'hell yeah'
      }
    })
  ]
}))
