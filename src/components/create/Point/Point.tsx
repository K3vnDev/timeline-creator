import { createContext, useRef } from 'react'
import { useStore } from '../../../store/useStore'
import { EditPoint } from '../EditPoint/EditPoint'
import { TLElement } from '../TLElement/TLElement'
import './point.css'
import { useImageHeight } from '../../../hooks/useImageHeight'
import { getClassName } from '../../../utils/getClassName'

interface Props {
  id: string
  content: {
    title: string
    image: string
    desc: string
  }
  onBottom: boolean
  index: number
}

export const Point = ({ id, content, onBottom, index }: Props) => {
  // biome-ignore format: <>
  const [editingElement, setEditingElement, deleteElement] =
    useStore(s => [s.editingElement, s.setEditingElement, s.deleteElement])

  const elementRef = useRef(null)

  const { title, image, desc } = content
  const onEditMode = id === editingElement

  const { imageHeight, minImageHeight } = useImageHeight(title, desc)

  if (!(title || image || desc || onEditMode)) {
    deleteElement(id)
    return
  }

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setEditingElement(id)
  }
  const handleDragEnter = () => setEditingElement(id)

  const className = getClassName('point', [onBottom, 'on-bottom'], [onEditMode, 'editing'])
  const providerValue = { id, title, image, desc, onBottom, elementRef }

  const style = {
    '--img-height': imageHeight,
    '--min-img-height': minImageHeight
  } as React.CSSProperties

  return (
    <TLElement index={index}>
      <PointContext.Provider value={providerValue}>
        <article
          className={className}
          onDragEnter={handleDragEnter}
          onClick={handleClick}
          ref={elementRef}
          style={style}
        >
          {onEditMode ? (
            <EditPoint />
          ) : (
            <>
              {title && (
                <h3 className='title'>
                  <span>{title}</span>
                </h3>
              )}
              {image && (
                <div className='image-wrapper'>
                  <img className='image' src={image} draggable={false} />
                </div>
              )}
              {desc && <p className='desc'>{desc}</p>}
            </>
          )}
        </article>
      </PointContext.Provider>
    </TLElement>
  )
}

export const PointContext = createContext({
  id: '',
  title: '',
  image: '',
  desc: '',
  onBottom: false,
  elementRef: { current: null } as React.MutableRefObject<null>
})
