import { create } from 'zustand'
import { intialTimeline, newPointTemplate } from '../consts.d'
import type { Timeline } from '../types.d'
import { generateElementId } from '../utils/generateElementId'
import { setPointContent } from './setPointContent'

interface Store {
  timeline: Timeline

  setPointTitle: (index: string, value: string) => void
  setPointImage: (index: string, value: string) => void
  setPointDesc: (index: string, value: string) => void

  createPoint: (index: number) => void
  deleteElement: (id: string) => void

  editingElement: string
  setEditingElement: (id: string) => void

  onAddingElementCooldown: boolean
  setOnAddingElementCooldown: (value: boolean) => void
}

export const useStore = create<Store>()(set => ({
  timeline: intialTimeline,

  setPointTitle: (id, value) =>
    set(({ timeline }) => setPointContent({ title: value }, timeline, id)),
  setPointImage: (id, value) =>
    set(({ timeline }) => setPointContent({ image: value }, timeline, id)),
  setPointDesc: (id, value) =>
    set(({ timeline }) => setPointContent({ desc: value }, timeline, id)),

  createPoint: index =>
    set(({ timeline, setEditingElement }) => {
      const newTimeline = structuredClone(timeline)
      const newPoint = { ...newPointTemplate, id: generateElementId(timeline) }
      setEditingElement(newPoint.id)
      newTimeline.splice(index, 0, newPoint)
      return { timeline: newTimeline }
    }),

  deleteElement: id =>
    set(({ timeline }) => {
      const newTimeline = structuredClone(timeline)
      const index = timeline.findIndex(el => el.id === id)
      newTimeline.splice(index, 1)
      return { timeline: newTimeline }
    }),

  editingElement: '',
  setEditingElement: id => set(() => ({ editingElement: id })),

  onAddingElementCooldown: false,
  setOnAddingElementCooldown: (value: boolean) => set(() => ({ onAddingElementCooldown: value }))
}))
