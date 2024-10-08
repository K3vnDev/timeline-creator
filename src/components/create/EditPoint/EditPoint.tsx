import { useContext, useEffect, useRef } from 'react'
import { TIMELINE_MAX_LENGTHS } from '../../../consts.d'
import { useCantScrollPage } from '../../../hooks/useCantScrollPage'
import { useEditPoint } from '../../../hooks/useEditPoint'
import { useFocusOnKey } from '../../../hooks/useFocusOnKey'
import { useTextInput } from '../../../hooks/useTextInput'
import { useStore } from '../../../store/useStore'
import { getElementRef } from '../../../utils/getElementRef'
import { ClearInputButton } from '../ClearInputButton/ClearInputButton'
import { DragAndDropImage } from '../DragAndDropImage/DragAndDropImage'
import { ElementOptionsButtons } from '../ElementOptionsButtons/ElementOptionsButtons'
import { PointContext } from '../Point/Point'
import './editPoint.css'

export const EditPoint = () => {
  const { id } = useContext(PointContext)
  useEditPoint()

  return (
    <>
      <Title />
      <Image />
      <Desc />
      <ElementOptionsButtons id={id} />
    </>
  )
}

const Title = () => {
  const { title: text, onBottom } = useContext(PointContext)
  const setPointTitle = useStore(s => s.setPointTitle)
  const elementRef = useRef(null)
  useFocusOnKey(elementRef, onBottom, 0)

  // biome-ignore format: <>
  const { animation, handleChange, handleClear } = 
    useTextInput(setPointTitle, TIMELINE_MAX_LENGTHS.TITLE,elementRef)

  return (
    <div className='title-wrapper'>
      <input
        ref={elementRef}
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

const Desc = () => {
  const { desc: text, onBottom } = useContext(PointContext)
  const setPointDesc = useStore(s => s.setPointDesc)

  const { elementRef } = useCantScrollPage(() => {
    if (!elementRef.current) return false
    const { scrollHeight, clientHeight }: HTMLElement = elementRef.current
    return scrollHeight > clientHeight
  })

  useFocusOnKey(elementRef, onBottom, 1)

  // biome-ignore format: <>
  const { animation, handleChange, handleClear } = 
    useTextInput(setPointDesc, TIMELINE_MAX_LENGTHS.DESC, elementRef)

  const recalculateWidth = () => {
    const input = getElementRef(elementRef)
    input.style.height = '0px'
    const { scrollHeight } = input
    input.style.height = `${scrollHeight}px`
  }

  useEffect(recalculateWidth, [text])

  return (
    <div className='desc-wrapper'>
      <textarea
        ref={elementRef}
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
