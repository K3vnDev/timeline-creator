import { useStore } from '../../../store/useStore'
import { Trash as TrashIcon } from '../../root/icons'
import './deleteButton.css'

interface Props {
  id: string
}

export const DeleteButton = ({ id }: Props) => {
  const deleteElement = useStore(s => s.deleteElement)
  const handleClick = () => deleteElement(id)

  return (
    <button className='delete-btn' onClick={handleClick}>
      <TrashIcon />
    </button>
  )
}
