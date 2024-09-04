import { useCharacterLimit } from '../../../hooks/useCharacterLimit'
import { useInputExit } from '../../../hooks/useInputExit'
import { useStore } from '../../../store/useStore'
import { Cross as CrossIcon } from '../../root/icons'
import { DeleteButton } from '../DeleteButton/DeleteButton'
import { DragAndDropImage } from '../DragAndDropImage/DragAndDropImage'
import './editPoint.css'

interface Props {
  title?: string
  image?: string
  desc?: string
  className: string
  id: string
}

export const EditPoint = ({ title = '', image = '', desc = '', className, id }: Props) => {
  useInputExit({ disabledOnShiftKey: false })

  return (
    <article className={`${className} editing`}>
      <Title txt={title} id={id} />
      <Image url={image} id={id} />
      <Desc txt={desc} id={id} />
      <DeleteButton id={id} />
    </article>
  )
}

const Title = ({ txt, id }: { txt: string; id: string }) => {
  const setPointTitle = useStore(s => s.setPointTitle)
  const { animation, validateText } = useCharacterLimit(20)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trimStart()
    if (validateText(value)) setPointTitle(id, value)
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
      <ClearButton onClick={() => setPointTitle(id, '')} />
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
  const { animation, validateText } = useCharacterLimit(120)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trimStart()
    if (validateText(value)) setPointDesc(id, value)
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
      <ClearButton onClick={() => setPointDesc(id, '')} />
    </div>
  )
}

const ClearButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className='clear-btn-container'>
      <button className='clear-btn' onClick={onClick}>
        <CrossIcon />
      </button>
    </div>
  )
}
