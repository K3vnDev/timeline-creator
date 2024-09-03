import { useStore } from '../../../store/useStore'
import { Plus as PlusIcon } from '../../root/icons'
import { TLElement } from '../TLElement/TLElement'
import './addElement.css'

interface Props {
  index: number
}

export const AddElement = ({ index }: Props) => {
  const { createPoint, createMark } = useStore(s => s)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.shiftKey) createMark(index)
    else createPoint(index)
  }

  return (
    <TLElement>
      <button className='add-element' onClick={handleClick}>
        <PlusIcon />
      </button>
    </TLElement>
  )
}
