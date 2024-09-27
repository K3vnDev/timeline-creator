import { useMemo } from 'react'
import { DEFAULT_TIMELINE_COLOR } from '../../../consts.d'
import type { HexColor } from '../../../types.d'
import { repeat } from '../../../utils/repeat'
import './background.css'
import { randomRange } from '../../../utils/randomRange'

interface Props {
  colors: HexColor[]
  min: number
  max: number
  n: number
}

export const Background = ({ colors, min, max, n }: Props) => {
  const getRandomProperties = () => {
    const size = randomRange(min, max)

    const getRandomOffset = () => Math.random() * 100
    const [x, y] = repeat(2, getRandomOffset)

    return { offset: { x, y }, size }
  }
  const getRandomColor = () => {
    return colors[randomRange(0, colors.length)]
  }
  const getRandomAnimationValues = () => {
    const getRandomValue = (target: number, range: number) => {
      const randomAdd = Math.random() * range - range / 2
      return target + randomAdd
    }
    return {
      maxScale: getRandomValue(1.25, 0.15),
      time: getRandomValue(1.5, 0.5)
    }
  }

  // biome-ignore format: <>
  const properties = useMemo(() => 
    repeat(n, () => ({
      ...getRandomProperties(),
      color: getRandomColor(),
      animationValues: getRandomAnimationValues()
    })),[])

  return (
    <div className='app-background'>
      {properties.map((property, i) => (
        <BlurredCircle key={i} properties={property} />
      ))}
    </div>
  )
}

const BlurredCircle = ({ properties }: BlurredCircleProps) => {
  const { animationValues, offset, size, color } = properties

  const style = {
    '--off-x': `${offset.x}vw`,
    '--off-y': `${offset.y}vh`,
    '--size': `${size}px`,
    '--color': color ?? DEFAULT_TIMELINE_COLOR,
    '--max-scale': animationValues.maxScale,
    '--time': `${animationValues.time}s`
  } as React.CSSProperties

  return <div className='blurred-circle' style={style} />
}

interface BlurredCircleProps {
  properties: {
    animationValues: {
      maxScale: number
      time: number
    }
    offset: {
      x: number
      y: number
    }
    size: number
    color: HexColor
  }
}
