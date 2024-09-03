import type { Timeline } from '../types.d'

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

export const generateElementId = (timeline: Timeline): string => {
  let id = ''
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length)
    id += Math.random() > 0.6 ? letters[randomIndex] : String(Math.floor(Math.random() * 10))
  }
  return timeline.some(el => el?.id === id) ? generateElementId(timeline) : id
}
