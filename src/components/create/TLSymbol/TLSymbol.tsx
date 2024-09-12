import './tlSymbol.css'

interface Props {
  steps: number
  size: number
  width: number
  length: number
}

export const TLSymbol = ({ steps, size, width, length }: Props) => {
  const style = {
    '--size': `${size}px`,
    '--width': `${width}px`,
    '--length': `${length}px`
  } as React.CSSProperties

  return (
    <div style={style} className='tl-symbol'>
      {Array(steps)
        .fill('')
        .map((_, index) => (
          <span key={index} />
        ))}
    </div>
  )
}
