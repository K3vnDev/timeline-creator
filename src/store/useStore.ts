import { create } from 'zustand'
import { intialTimeline, newMarkTemplate, newPointTemplate } from '../consts.d'
import type { Mark, PointerEvents, Timeline } from '../types.d'
import { generateElementId } from '../utils/generateElementId'
import { createElement } from './createElement'
import { getIndex } from './getIndex'
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

  moveElement: (id: string, direction: 1 | -1) => void

  duplicateElement: (id: string) => void

  onAddingElementCooldown: boolean
  setOnAddingElementCooldown: (value: boolean) => void

  pointerEvents: PointerEvents
  setPointerEvents: (value: PointerEvents) => void
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
      const index = getIndex(newTimeline, id)
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
      const index = getIndex(newTimeline, id)
      newTimeline.splice(index, 1)
      return { timeline: newTimeline }
    }),

  editingElement: '',
  setEditingElement: id => set(() => ({ editingElement: id })),

  moveElement: (id, direction) =>
    set(({ timeline }) => {
      const newTimeline = structuredClone(timeline)
      const index = getIndex(newTimeline, id)

      const replacingIndex = index + direction
      if (replacingIndex < 0 || replacingIndex >= newTimeline.length) return {}

      const movingElement = newTimeline[index]
      const replacingElement = newTimeline[replacingIndex]

      newTimeline.splice(index, 1, replacingElement)
      newTimeline.splice(replacingIndex, 1, movingElement)

      return { timeline: newTimeline }
    }),

  duplicateElement: id =>
    set(({ timeline }) => {
      const newTimeline = structuredClone(timeline)
      const index = getIndex(newTimeline, id)
      const newId = generateElementId(newTimeline)
      const elementCopy = { ...newTimeline[index], id: newId }
      newTimeline.splice(index, 0, elementCopy)
      return { timeline: newTimeline }
    }),

  onAddingElementCooldown: false,
  setOnAddingElementCooldown: (value: boolean) => set(() => ({ onAddingElementCooldown: value })),

  pointerEvents: 'auto',
  setPointerEvents: value => set(() => ({ pointerEvents: value }))
}))
