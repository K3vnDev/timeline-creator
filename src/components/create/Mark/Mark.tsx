import { useStore } from '../../../store/useStore'
import { TLElement } from '../TLElement/TLElement'
import './mark.css'

interface Props {
  content: {
    text: string
  }
  index: number
}
export const Mark = ({ content, index }: Props) => {
  const setEditingIndex = useStore(s => s.setEditingIndex)

  const handleClick = () => {
    setEditingIndex(index)
  }

  return (
    <TLElement>
      <div className='mark' onClick={handleClick}>
        {content.text}
      </div>
    </TLElement>
  )
}
