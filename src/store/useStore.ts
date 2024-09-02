import { create } from 'zustand'
import type { Timeline } from '../types'
import { setPointContent } from './setPointContent'

interface Store {
  timeline: Timeline

  setPointTitle: (index: number, value: string) => void
  setPointImage: (index: number, value: string) => void
  setPointDesc: (index: number, value: string) => void

  deletePoint: (index: number) => void

  editingIndex: number
  setEditingIndex: (value: number) => void
}

export const useStore = create<Store>()(set => ({
  timeline: [
    {
      type: 'mark',
      content: {
        text: '2019'
      }
    },
    {
      type: 'point',
      content: {
        title: 'My first time point',
        image: '',
        desc: 'hell yeah'
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
  ],

  setPointTitle: (index, value) =>
    set(({ timeline }) => setPointContent({ title: value, timeline, index })),
  setPointImage: (index, value) =>
    set(({ timeline }) => setPointContent({ image: value, timeline, index })),
  setPointDesc: (index, value) =>
    set(({ timeline }) => setPointContent({ desc: value, timeline, index })),

  deletePoint: index =>
    set(({ timeline }) => {
      const newTimeline = structuredClone(timeline)
      newTimeline.splice(index, 1)
      return { timeline: newTimeline }
    }),

  editingIndex: -1,
  setEditingIndex: value => set(() => ({ editingIndex: value }))
}))
