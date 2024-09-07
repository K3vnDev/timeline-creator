import { Cross as CrossIcon } from '../../root/icons'
import './clearInputButton.css'

interface Props {
  onClick: () => void
  text: string
}

export const ClearInputButton = ({ onClick, text }: Props) => {
  const disabled = text === ''
  const buttonClassName = disabled ? 'clear-btn hidden' : 'clear-btn'

  return (
    <div className='clear-input-btn-wrapper'>
      <button className={buttonClassName} onClick={onClick} disabled={disabled}>
        <CrossIcon />
      </button>
    </div>
  )
}
