import { create } from 'zustand'
import { intialTimeline, newMarkTemplate, newPointTemplate } from '../consts.d'
import type { Mark, Timeline } from '../types.d'
import { generateElementId } from '../utils/generateElementId'
import { createElement } from './createElement'
import { setPointContent } from './setPointContent'

interface Store {
  timeline: Timeline

  setPointTitle: (id: string, value: string) => void
  setPointImage: (id: string, value: string) => void
  setPointDesc: (id: string, value: string) => void

  setMarkText: (id: string, value: string) => void

  createPoint: (index: number) => void
  createMark: (index: number) => void
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

  setMarkText: (id, value) =>
    set(({ timeline }) => {
      const newTimeline = structuredClone(timeline)
      const index = newTimeline.findIndex(el => el.id === id)
      const newMark = newTimeline[index] as Mark
      newMark.content.text = value
      newTimeline.splice(index, 1, newMark)
      return { timeline: newTimeline }
    }),

  createPoint: index =>
    set(({ timeline, setEditingElement }) =>
      createElement(index, timeline, setEditingElement, newPointTemplate)
    ),

  createMark: index =>
    set(({ timeline, setEditingElement }) =>
      createElement(index, timeline, setEditingElement, newMarkTemplate)
    ),

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
