import { useEffect, useRef } from 'react'
import { useStore } from '../../../store/useStore'
import { Cross as CrossIcon } from '../../root/icons'
import { DeleteButton } from '../DeleteButton/DeleteButton'
import { DragAndDropImage } from '../DragAndDropImage/DragAndDropImage'
import { MoveArrows } from '../MoveArrows/MoveArrows'
import './editPoint.css'
import { useEditPoint } from '../../../hooks/useEditPoint'
import { useTextInput } from '../../../hooks/useTextInput'

interface Props {
  title?: string
  image?: string
  desc?: string
  id: string
}

export const EditPoint = ({ title = '', image = '', desc = '', id }: Props) => {
  const { checkFocusingElement } = useEditPoint()

  return (
    <>
      <Title text={title} id={id} checkFocusingElement={checkFocusingElement} />
      <Image url={image} id={id} />
      <Desc text={desc} id={id} checkFocusingElement={checkFocusingElement} />
      <div className='btns-wrapper'>
        <DeleteButton id={id} />
        <MoveArrows id={id} />
      </div>
    </>
  )
}

interface TitleProps {
  text: string
  id: string
  checkFocusingElement: (element: React.MutableRefObject<null>) => void
}

const Title = ({ text, id, checkFocusingElement }: TitleProps) => {
  const setPointTitle = useStore(s => s.setPointTitle)
  const elementRef = useRef(null)
  useEffect(() => checkFocusingElement(elementRef), [elementRef.current])

  // biome-ignore format: <>
  const { animation, handleChange, trimText, handleClear } = 
    useTextInput(text, setPointTitle, id, 20)

  return (
    <div className='title-wrapper'>
      <input
        ref={elementRef}
        onBlur={trimText}
        className='title'
        value={text}
        onChange={handleChange}
        placeholder='Add a title...'
        style={{ animation }}
      />
      <ClearButton onClick={handleClear} text={text} />
    </div>
  )
}

interface ImageProps {
  url: string
  id: string
}

const Image = ({ url, id }: ImageProps) => {
  return (
    <div className='image-wrapper'>
      {url && <img className='image' src={url} draggable={false} />}
      <DragAndDropImage url={url} id={id} />
    </div>
  )
}

interface DescProps {
  text: string
  id: string
  checkFocusingElement: (element: React.MutableRefObject<null>) => void
}

const Desc = ({ text, id, checkFocusingElement }: DescProps) => {
  const setPointDesc = useStore(s => s.setPointDesc)
  const elementRef = useRef(null)
  useEffect(() => checkFocusingElement(elementRef), [elementRef.current])

  // biome-ignore format: <>
  const { animation, handleChange, trimText, handleClear } = 
    useTextInput(text, setPointDesc, id, 120)

  return (
    <div className='desc-wrapper'>
      <textarea
        ref={elementRef}
        onBlur={trimText}
        className='desc'
        value={text}
        onChange={handleChange}
        placeholder='Add a description...'
        style={{ animation }}
      />
      <ClearButton onClick={handleClear} text={text} />
    </div>
  )
}

const ClearButton = ({ onClick, text }: { onClick: () => void; text: string }) => {
  const disabled = text === ''
  const buttonClassName = disabled ? 'clear-btn hidden' : 'clear-btn'

  return (
    <div className='clear-btn-container'>
      <button className={buttonClassName} onClick={onClick} disabled={disabled}>
        <CrossIcon />
      </button>
    </div>
  )
}
