import { useStore } from '../../../store/useStore'
import { TLElement } from '../TLElement/TLElement'
import './mark.css'

interface Props {
  id: string
  content: { text: string }
}
export const Mark = ({ id, content }: Props) => {
  const setEditingElement = useStore(s => s.setEditingElement)

  const handleClick = () => {
    setEditingElement(id)
  }

  return (
    <TLElement>
      <div className='mark' onClick={handleClick}>
        {content.text}
      </div>
    </TLElement>
  )
}
