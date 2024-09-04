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
  const { editingElement, setEditingElement, deleteElement } = useStore(s => s)
  const { title, image, desc } = content
  const onEditMode = id === editingElement

  if (!(title || image || desc || onEditMode)) {
    deleteElement(id)
  }

  const imageHeight = (() => {
    let value = 230
    if (title) value -= 35
    if (desc) value -= 35
    return `${value}px`
  })()

  const handleClick = () => setEditingElement(id)
  const className = onBottom ? 'point on-bottom' : 'point'

  return (
    <TLElement index={index}>
      {onEditMode ? (
        <EditPoint className={className} id={id} title={title} image={image} desc={desc} />
      ) : (
        <article className={className} onClick={handleClick}>
          {title && <Title txt={title} />}
          {image && <Image url={image} imageHeight={imageHeight} />}
          {desc && <Desc txt={desc} />}
        </article>
      )}
    </TLElement>
  )
}

const Title = ({ txt }: { txt: string }) => {
  return <h3 className='title'>{txt}</h3>
}

const Desc = ({ txt }: { txt: string }) => {
  return <p className='desc'>{txt}</p>
}

const Image = ({ url, imageHeight }: { url: string; imageHeight: string }) => {
  return (
    <div className='image-wrapper'>
      <img className='image' src={url} style={{ height: imageHeight }} draggable={false} />
    </div>
  )
}
