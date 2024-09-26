import { useStore } from '../../../store/useStore'
import { Duplicate as DuplicateIcon, Trash as TrashIcon } from '../../root/icons'
import { MoveArrows } from '../MoveArrows/MoveArrows'
import './elementOptionsButtons.css'

interface Props {
  id: string
}

export const ElementOptionsButtons = ({ id }: Props) => {
  return (
    <div className='element-optns-btns'>
      <DeleteButton id={id} />
      <DuplicateButton />
      <MoveArrows id={id} />
    </div>
  )
}

const DeleteButton = ({ id }: Props) => {
  const deleteElement = useStore(s => s.deleteElement)
  const handleClick = () => deleteElement(id)

  return (
    <button className='delete-btn' onClick={handleClick}>
      <TrashIcon />
    </button>
  )
}

const DuplicateButton = () => {
  const duplicateElement = useStore(s => s.duplicateElement)
  const handleClick = () => duplicateElement()

  return (
    <button className='duplicate-btn' onClick={handleClick}>
      <DuplicateIcon />
    </button>
  )
}
