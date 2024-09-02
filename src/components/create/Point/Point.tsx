import { useStore } from '../../../store/useStore'
import { EditPoint } from '../EditPoint/EditPoint'
import { TLElement } from '../TLElement/TLElement'
import './point.css'

interface Props {
  content: {
    title?: string
    image?: string
    desc?: string
  }
  index: number
  onBottom: boolean
}

export const Point = ({ content, onBottom, index }: Props) => {
  const { editingIndex, setEditingIndex, deletePoint } = useStore(s => s)
  const { title, image, desc } = content
  const onEditMode = index === editingIndex

  if (!title && !image && !desc && !onEditMode) {
    deletePoint(index)
    return
  }
  const handleClick = () => setEditingIndex(index)
  const className = onBottom ? 'point on-bottom' : 'point'

  if (onEditMode) {
    return <EditPoint className={className} title={title} image={image} desc={desc} index={index} />
  }

  return (
    <TLElement>
      <article className={className} onClick={handleClick}>
        {title && <Title txt={title} />}
        {image && <Image url={image} />}
        {desc && <Desc txt={desc} />}
      </article>
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
      <img className='image' src={url} />
    </div>
  )
}
