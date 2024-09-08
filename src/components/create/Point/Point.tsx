import { createContext } from 'react'
import { useStore } from '../../../store/useStore'
import { EditPoint } from '../EditPoint/EditPoint'
import { TLElement } from '../TLElement/TLElement'
import './point.css'

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

  const { title, image, desc } = content
  const onEditMode = id === editingElement

  if (!(title || image || desc || onEditMode)) {
    deleteElement(id)
    return
  }

  const imageHeight = (() => {
    let value = 230
    if (title) value -= 35
    if (desc) value -= 35
    return `${value}px`
  })()

  const className = (() => {
    let c = 'point'
    if (onBottom) c += ' on-bottom'
    if (onEditMode) c += ' editing'
    return c
  })()

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setEditingElement(id)
  }
  const handleDragEnter = () => setEditingElement(id)

  const providerValue = { id, title, image, desc, imageHeight, onBottom }

  return (
    <TLElement index={index}>
      <PointContext.Provider value={providerValue}>
        <article className={className} onClick={handleClick} onDragEnter={handleDragEnter}>
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
  onBottom: false
})
