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
  index: number
}

export const EditPoint = ({ title = '', image = '', desc = '', className, index }: Props) => {
  return (
    <TLElement>
      <article className={`${className} editing`}>
        <Title txt={title} index={index} />
        <Image url={image} index={index} />
        <Desc txt={desc} index={index} />
      </article>
    </TLElement>
  )
}

const Title = ({ txt, index }: { txt: string; index: number }) => {
  const setPointTitle = useStore(s => s.setPointTitle)
  const { animation, validateValue } = useCharacterLimit(20)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trimStart()
    if (validateValue(value)) setPointTitle(index, value)
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

const Image = ({ url, index }: { url: string; index: number }) => {
  const setPointImage = useStore(s => s.setPointImage)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointImage(index, e.target.value)
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

const Desc = ({ txt, index }: { txt: string; index: number }) => {
  const setPointDesc = useStore(s => s.setPointDesc)
  const { animation, validateValue } = useCharacterLimit(120)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trimStart()
    if (validateValue(value)) setPointDesc(index, value)
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
