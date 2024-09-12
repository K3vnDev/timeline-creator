import { useStore } from '../../../store/useStore'
import { Duplicate as DuplicateIcon } from '../../root/icons'
import './duplicateButton.css'

export const DuplicateButton = () => {
  const duplicateElement = useStore(s => s.duplicateElement)
  const handleClick = () => duplicateElement()

  return (
    <button className='duplicate-btn' onClick={handleClick}>
      <DuplicateIcon />
    </button>
  )
}
