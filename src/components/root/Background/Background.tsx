import { useMemo } from 'react'
import { DEFAULT_TIMELINE_COLOR } from '../../../consts.d'
import type { HexColor } from '../../../types.d'
import { repeat } from '../../../utils/repeat'
import './background.css'

type Properties = { x: number; y: number; size: number; color: HexColor }

interface Props {
  colors: HexColor[]
  min: number
  max: number
  n: number
}

export const Background = ({ colors, min, max, n }: Props) => {
  const getRandomProperties = () => {
    const { innerWidth, innerHeight } = window
    const [rawX, rawY] = [Math.random() * innerWidth, Math.random() * innerHeight]

    const sizeDiff = max - min
    const size = Math.random() * sizeDiff + min

    const [x, y] = [rawX - size / 2, rawY - size / 2]
    return { x, y, size }
  }
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // biome-ignore format: <>
  const properties = useMemo(() => 
    repeat(n, () => ({
      ...getRandomProperties(),
      color: getRandomColor() 
    })),[])

  return (
    <div className='app-background'>
      {repeat(n, i => (
        <BlurredCircle key={i} properties={properties[i]} />
      ))}
    </div>
  )
}

const BlurredCircle = ({ properties }: { properties: Properties }) => {
  const { x, y, size, color } = properties

  const style = {
    '--off-x': `${x}px`,
    '--off-y': `${y}px`,
    '--size': `${size}px`,
    '--color': color ?? DEFAULT_TIMELINE_COLOR
  } as React.CSSProperties

  return <div className='blurred-circle' style={style} />
}
