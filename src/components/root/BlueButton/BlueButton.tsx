import './blueButton.css'

interface Props {
  onClick: () => void
  children: string
}

export const BlueButton = ({ onClick, children }: Props) => {
  return (
    <button className='blue-button' onClick={onClick}>
      {children}
    </button>
  )
}
