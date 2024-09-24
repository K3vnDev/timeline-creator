import { createContext, useRef } from 'react'
import { useStore } from '../../../store/useStore'
import { EditPoint } from '../EditPoint/EditPoint'
import { TLElement } from '../TLElement/TLElement'
import './point.css'
import { getClassName } from '../../../utils/getClassName'
import { getImageHeight } from '../../../utils/getImageHeight'

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

  if (!(title || image || desc || onEditMode)) {
    deleteElement(id)
    return
  }

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setEditingElement(id)
  }
  const handleDragEnter = () => setEditingElement(id)

  const imageHeight = getImageHeight(title, desc)
  const className = getClassName('point', [onBottom, 'on-bottom'], [onEditMode, 'editing'])

  const providerValue = { id, title, image, desc, imageHeight, onBottom, elementRef }

  return (
    <TLElement index={index}>
      <PointContext.Provider value={providerValue}>
        <article
          className={className}
          onDragEnter={handleDragEnter}
          onClick={handleClick}
          ref={elementRef}
        >
          {onEditMode ? (
            <EditPoint />
          ) : (
            <>
              {title && <h3 className='title'>{title}</h3>}
              {image && (
                <div className='image-wrapper'>
                  <img
                    className='image'
                    src={image}
                    style={{ height: imageHeight }}
                    draggable={false}
                  />
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
  imageHeight: '',
  onBottom: false,
  elementRef: { current: null } as React.MutableRefObject<null>
})
