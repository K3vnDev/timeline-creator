import { repeat } from '../../../utils/repeat'
import './tlSymbol.css'

interface Props {
  color: string
  steps: number
  size: number
  width: number
  length: number
}

export const TLSymbol = ({ color, steps, size, width, length }: Props) => {
  const style = {
    '--color': color,
    '--size': `${size}px`,
    '--width': `${width}px`,
    '--length': `${length}px`
  } as React.CSSProperties

  return (
    <div style={style} className='tl-symbol'>
      {repeat(steps, i => (
        <span key={i} />
      ))}
    </div>
  )
}
