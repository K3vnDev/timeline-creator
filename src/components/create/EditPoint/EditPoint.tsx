import { useCharacterLimit } from '../../../hooks/useCharacterLimit'
import { useStore } from '../../../store/useStore'
import { DragAndDropImage } from '../DragAndDropImage/DragAndDropImage'
import { TLElement } from '../TLElement/TLElement'
import './editPoint.css'

interface Props {
  title?: string
  image?: string
  desc?: string
  className: string
  id: string
}

export const EditPoint = ({ title = '', image = '', desc = '', className, id }: Props) => {
  return (
    <TLElement>
      <article className={`${className} editing`}>
        <Title txt={title} id={id} />
        <Image url={image} id={id} />
        <Desc txt={desc} id={id} />
      </article>
    </TLElement>
  )
}

const Title = ({ txt, id }: { txt: string; id: string }) => {
  const setPointTitle = useStore(s => s.setPointTitle)
  const { animation, validateValue } = useCharacterLimit(20)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trimStart()
    if (validateValue(value)) setPointTitle(id, value)
  }

  return (
    <div className='title-wrapper'>
      <input
        className='title'
        type='text'
        value={txt}
        onChange={handleChange}
        placeholder='Add a title...'
        style={{ animation }}
      />
    </div>
  )
}

const Image = ({ url, id }: { url: string; id: string }) => {
  const setPointImage = useStore(s => s.setPointImage)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointImage(id, e.target.value)
  }

  return (
    <div className='image-wrapper'>
      {url && (
        <div
          style={{
            background: `url(${url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          className='image'
        />
      )}
      <DragAndDropImage url={url} />
    </div>
  )
}

const Desc = ({ txt, id }: { txt: string; id: string }) => {
  const setPointDesc = useStore(s => s.setPointDesc)
  const { animation, validateValue } = useCharacterLimit(120)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trimStart()
    if (validateValue(value)) setPointDesc(id, value)
  }

  return (
    <div className='desc-wrapper'>
      <textarea
        className='desc'
        value={txt}
        onChange={handleChange}
        placeholder='Add a description...'
        style={{ animation }}
      />
    </div>
  )
}
