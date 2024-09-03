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
}

export const Point = ({ id, content, onBottom }: Props) => {
  const { editingElement, setEditingElement, deleteElement } = useStore(s => s)
  const { title, image, desc } = content
  const onEditMode = id === editingElement

  if (!(title || image || desc || onEditMode)) {
    deleteElement(id)
  }

  const handleClick = () => setEditingElement(id)
  const className = onBottom ? 'point on-bottom' : 'point'

  return (
    <TLElement>
      {onEditMode ? (
        <EditPoint className={className} title={title} image={image} desc={desc} id={id} />
      ) : (
        <article className={className} onClick={handleClick}>
          {title && <Title txt={title} />}
          {image && <Image url={image} />}
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

const Image = ({ url }: { url: string }) => {
  return (
    <div className='image-wrapper'>
      <img className='image' src={url} draggable={false} />
    </div>
  )
}
