import { useContext, useEffect, useRef } from 'react'
import { useEditPoint } from '../../../hooks/useEditPoint'
import { useFocusOnKey } from '../../../hooks/useFocusOnKey'
import { useTextInput } from '../../../hooks/useTextInput'
import { useStore } from '../../../store/useStore'
import { ClearInputButton } from '../ClearInputButton/ClearInputButton'
import { DeleteButton } from '../DeleteButton/DeleteButton'
import { DragAndDropImage } from '../DragAndDropImage/DragAndDropImage'
import { DuplicateButton } from '../DuplicateButton/DuplicateButton'
import { MoveArrows } from '../MoveArrows/MoveArrows'
import { PointContext } from '../Point/Point'
import './editPoint.css'

export const EditPoint = () => {
  const { id } = useContext(PointContext)
  const { checkElement } = useEditPoint()

  return (
    <>
      <Title checkElement={checkElement} />
      <Image />
      <Desc checkElement={checkElement} />

      <div className='btns-wrapper'>
        <DeleteButton id={id} />
        <DuplicateButton />
        <MoveArrows id={id} />
      </div>
    </>
  )
}

const Title = ({
  checkElement
}: { checkElement: (element: React.MutableRefObject<null>) => void }) => {
  const { title: text, onBottom } = useContext(PointContext)
  const setPointTitle = useStore(s => s.setPointTitle)
  const elementRef = useRef(null)
  useFocusOnKey(elementRef, onBottom, 0)

  useEffect(() => checkElement(elementRef), [elementRef.current])

  // biome-ignore format: <>
  const { animation, handleChange, trimText, handleClear } = 
    useTextInput(text, setPointTitle, 20)

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
      <ClearInputButton onClick={handleClear} text={text} />
    </div>
  )
}

const Image = () => {
  const { image: url } = useContext(PointContext)

  return (
    <div className='image-wrapper'>
      {url && <img className='image' src={url} draggable={false} />}
      <DragAndDropImage url={url} />
    </div>
  )
}

const Desc = ({
  checkElement
}: { checkElement: (element: React.MutableRefObject<null>) => void }) => {
  const { desc: text, onBottom } = useContext(PointContext)
  const setPointDesc = useStore(s => s.setPointDesc)
  const elementRef = useRef(null)
  useFocusOnKey(elementRef, onBottom, 1)

  useEffect(() => checkElement(elementRef), [elementRef.current])

  // biome-ignore format: <>
  const { animation, handleChange, trimText, handleClear } = 
    useTextInput(text, setPointDesc, 120)

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
      <ClearInputButton onClick={handleClear} text={text} />
    </div>
  )
}
