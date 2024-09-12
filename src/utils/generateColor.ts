import type { HexColor } from '../types.d'

const colors: HexColor[] = [
  '#598a15', // light green
  '#24a17d', // aqua green
  '#0f808a', // aqua blue
  '#0f3c8a', // dark blue
  '#5414af', // purple
  '#b517ab', // pink
  '#af154b', // red
  '#b05625' // orange
]

export const generateColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}
