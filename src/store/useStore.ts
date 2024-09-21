import { create } from 'zustand'
import { DEFAULT_TIMELINE, newMarkTemplate, newPointTemplate } from '../consts.d'
import type { HexColor, Mark, PointerEvents, Timeline } from '../types.d'
import { generateColor } from '../utils/generateColor'
import { generateId } from '../utils/generateId'
import { createElement } from './createElement'
import demoTimeline from './demoTimeline.json'
import { getIndex } from './getIndex'
import { initialSavedTimelines, initialTimeline } from './initialState.d'
import { modifyElements } from './modifyElements'
import { modifyTimelines } from './modifyTimelines'
import { setPointContent } from './setPointContent'

interface Store {
  timeline: Timeline
  setTimeline: (value: Timeline) => void
  savedTimelines: Array<Timeline>

  setEditingTimeline: (id: string | null) => void
  createTimeline: () => void
  saveTimeline: () => void
  setTimelineName: (value: string) => void
  setTimelineColor: (value: HexColor) => void
  duplicateTimeline: () => void
  deleteTimeline: (id: string) => void
  loadDemoTimeline: () => void

  setPointTitle: (value: string) => void
  setPointImage: (value: string) => void
  setPointDesc: (value: string) => void

  setMarkText: (value: string) => void

  createPoint: (index: number) => void
  createMark: (index: number) => void
  duplicateElement: () => void
  moveElement: (direction: 1 | -1) => void
  deleteElement: (id: string) => void

  editingElement: string
  setEditingElement: (id: string) => void

  pointerEvents: PointerEvents
  setPointerEvents: (value: PointerEvents) => void

  showingMenu: boolean
  setShowingMenu: (value: boolean) => void
}

export const useStore = create<Store>()(set => ({
  timeline: initialTimeline,
  setTimeline: value => set(() => ({ timeline: value })),
  savedTimelines: initialSavedTimelines,

  setEditingTimeline: id =>
    set(({ savedTimelines }) => {
      if (!id) return { timeline: undefined }
      const index = getIndex(savedTimelines, id)
      return { timeline: savedTimelines[index] }
    }),

  createTimeline: () =>
    set(({ savedTimelines }) => {
      const newTimeline: Timeline = {
        ...structuredClone(DEFAULT_TIMELINE),
        id: generateId(savedTimelines),
        color: generateColor()
      }
      const newSavedTimelines = [...savedTimelines, newTimeline]
      return { savedTimelines: newSavedTimelines, timeline: newTimeline }
    }),

  saveTimeline: () =>
    set(({ timeline, savedTimelines }) =>
      modifyTimelines(savedTimelines, timeline.id, (newTimelines, index) => {
        const savingTimeline = structuredClone(timeline)
        newTimelines.splice(index, 1, savingTimeline)
        return newTimelines
      })
    ),

  setTimelineName: value =>
    set(({ timeline }) => {
      const newTimeline = structuredClone(timeline)
      newTimeline.name = value
      return { timeline: newTimeline }
    }),

  setTimelineColor: value =>
    set(({ timeline }) => {
      const newTimeline = structuredClone(timeline)
      newTimeline.color = value
      return { timeline: newTimeline }
    }),

  duplicateTimeline: () =>
    set(({ timeline, savedTimelines }) =>
      modifyTimelines(savedTimelines, timeline.id, (newTimelines, index) => {
        const duplicatedTimeline = { ...structuredClone(timeline), id: generateId(savedTimelines) }
        newTimelines.splice(index + 1, 0, duplicatedTimeline)
        return newTimelines
      })
    ),

  deleteTimeline: id =>
    set(({ savedTimelines, setEditingTimeline }) =>
      modifyTimelines(savedTimelines, id, (newTimelines, index) => {
        newTimelines.splice(index, 1)

        if (newTimelines.length !== 0) {
          const newEditingTimelineIndex = index < newTimelines.length ? index : index - 1
          setEditingTimeline(newTimelines[newEditingTimelineIndex].id)
        } else {
          setEditingTimeline(null)
        }
        return newTimelines
      })
    ),

  loadDemoTimeline: () =>
    set(({ savedTimelines }) => {
      const newDemoTimeline = { ...(demoTimeline as Timeline), id: generateId(savedTimelines) }
      const newSavedTimelines = [...savedTimelines, newDemoTimeline]
      return { savedTimelines: newSavedTimelines, timeline: newDemoTimeline }
    }),

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

  moveElement: direction =>
    set(({ timeline, editingElement }) =>
      modifyElements(timeline, editingElement, (newElements, index) => {
        const replacingIndex = index + direction
        if (replacingIndex < 0 || replacingIndex >= newElements.length) return

        const movingElement = newElements[index]
        const replacingElement = newElements[replacingIndex]

        newElements.splice(index, 1, replacingElement)
        newElements.splice(replacingIndex, 1, movingElement)
        return newElements
      })
    ),

  duplicateElement: () =>
    set(({ timeline, editingElement }) =>
      modifyElements(timeline, editingElement, (newElements, index) => {
        const newId = generateId(newElements)
        const elementCopy = { ...structuredClone(newElements[index]), id: newId }
        newElements.splice(index, 0, elementCopy)
        return newElements
      })
    ),

  pointerEvents: 'auto' as PointerEvents,
  setPointerEvents: value => set(() => ({ pointerEvents: value })),

  showingMenu: false,
  setShowingMenu: value => set(() => ({ showingMenu: value }))
}))
