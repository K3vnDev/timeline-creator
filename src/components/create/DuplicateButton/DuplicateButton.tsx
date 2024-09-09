import { useStore } from '../../../store/useStore'
import { Duplicate as DuplicateIcon } from '../../root/icons'
import './duplicateButton.css'

interface Props {
  id: string
}

export const DuplicateButton = ({ id }: Props) => {
  const duplicateElement = useStore(s => s.duplicateElement)
  const handleClick = () => duplicateElement(id)

  return (
    <button className='duplicate-btn' onClick={handleClick}>
      <DuplicateIcon />
    </button>
  )
}
