import { create } from 'zustand'
import { intialTimeline, newMarkTemplate, newPointTemplate } from '../consts.d'
import type { Mark, PointerEvents, Timeline } from '../types.d'
import { generateId } from '../utils/generateId'
import { createElement } from './createElement'
import { modifyElements } from './modifyElements'
import { setPointContent } from './setPointContent'

interface Store {
  timeline: Timeline

  setTimelineName: (value: string) => void

  savedTimelines: Array<Timeline>

  setPointTitle: (value: string) => void
  setPointImage: (value: string) => void
  setPointDesc: (value: string) => void

  setMarkText: (value: string) => void

  createPoint: (index: number) => void
  createMark: (index: number) => void
  deleteElement: (id: string) => void

  editingElement: string
  setEditingElement: (id: string) => void

  moveElement: (id: string, direction: 1 | -1) => void

  duplicateElement: (id: string) => void

  pointerEvents: PointerEvents
  setPointerEvents: (value: PointerEvents) => void

  showingMenu: boolean
  setShowingMenu: (value: boolean) => void
}

export const useStore = create<Store>()(set => ({
  timeline: intialTimeline,

  setTimelineName: value =>
    set(({ timeline }) => {
      const newTimeline = structuredClone(timeline)
      newTimeline.name = value
      return { timeline: newTimeline }
    }),

  savedTimelines: Array(5).fill(intialTimeline),

  setPointTitle: value =>
    set(({ timeline, editingElement }) =>
      setPointContent({ title: value }, timeline, editingElement)
    ),
  setPointImage: value =>
    set(({ timeline, editingElement }) =>
      setPointContent({ image: value }, timeline, editingElement)
    ),
  setPointDesc: value =>
    set(({ timeline, editingElement }) =>
      setPointContent({ desc: value }, timeline, editingElement)
    ),

  setMarkText: value =>
    set(({ timeline, editingElement }) =>
      modifyElements(timeline, editingElement, (newElements, index) => {
        const newMark = newElements[index] as Mark
        newMark.content.text = value
        newElements.splice(index, 1, newMark)
        return newElements
      })
    ),

  createPoint: index =>
    set(({ timeline, setEditingElement }) =>
      createElement(index, timeline, setEditingElement, newPointTemplate)
    ),

  createMark: index =>
    set(({ timeline, setEditingElement }) =>
      createElement(index, timeline, setEditingElement, newMarkTemplate)
    ),

  deleteElement: id =>
    set(({ timeline }) =>
      modifyElements(timeline, id, (newElements, index) => {
        newElements.splice(index, 1)
        return newElements
      })
    ),

  editingElement: '',
  setEditingElement: id => set(() => ({ editingElement: id })),

  moveElement: (id, direction) =>
    set(({ timeline }) =>
      modifyElements(timeline, id, (newElements, index) => {
        const replacingIndex = index + direction
        if (replacingIndex < 0 || replacingIndex >= newElements.length) return

        const movingElement = newElements[index]
        const replacingElement = newElements[replacingIndex]

        newElements.splice(index, 1, replacingElement)
        newElements.splice(replacingIndex, 1, movingElement)
        return newElements
      })
    ),

  duplicateElement: id =>
    set(({ timeline }) =>
      modifyElements(timeline, id, (newElements, index) => {
        const newId = generateId(newElements)
        const elementCopy = { ...structuredClone(newElements[index]), id: newId }
        newElements.splice(index, 0, elementCopy)
        return newElements
      })
    ),

  pointerEvents: 'auto',
  setPointerEvents: value => set(() => ({ pointerEvents: value })),

  showingMenu: false,
  setShowingMenu: value => set(() => ({ showingMenu: value }))
}))
