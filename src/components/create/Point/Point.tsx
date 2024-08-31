import { TLElement } from '../TLElement/TLElement'
import './point.css'

interface Props {
  content: {
    title?: string
    image?: string
    desc?: string
  }
  onBottom: boolean
}

export const Point = ({ content, onBottom }: Props) => {
  const { title, image, desc } = content

  if (!title && !image && !desc) {
    //Delete point from timeline
    //Before doing that, check if is not on editmode
    return
  }

  const className = onBottom ? 'point on-bottom' : 'point'

  return (
    <TLElement>
      <article className={className}>
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
