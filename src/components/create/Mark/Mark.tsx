import { TLElement } from '../TLElement/TLElement'
import './mark.css'

interface Props {
  content: {
    text: string
  }
}
export const Sign = ({ content }: Props) => {
  return (
    <TLElement>
      <div className='mark'>{content.text}</div>
    </TLElement>
  )
}
