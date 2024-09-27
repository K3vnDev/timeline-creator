import type { Element, Timeline } from '../types.d'

const ID_LENGTH = 5
const LOWERCASE_CHANCE = 0.5
const LETTER_CHANCE = 0.7

export const generateId = (array: Timeline[] | Element[]): string => {
  let id = ''
  for (let i = 0; i < ID_LENGTH; i++) {
    id += Math.random() < LETTER_CHANCE ? getRandomLetter() : getRandomDigit()
  }
  const alreadyContainsId = array.some(val => val?.id === id)
  return alreadyContainsId ? generateId(array) : id
}

const getRandomLetter = () => {
  const charCode = Math.random() * 25 + 65
  let randomLetter = String.fromCharCode(charCode)
  const lowercase = Math.random() < LOWERCASE_CHANCE
  if (lowercase) randomLetter = randomLetter.toLowerCase()
  return randomLetter
}

const getRandomDigit = () => Math.floor(Math.random() * 10)
