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
      <Title text={title} id={id} />
      <Image url={image} id={id} />
      <Desc text={desc} id={id} />
      <DeleteButton id={id} />
    </article>
  )
}

const Title = ({ text, id }: { text: string; id: string }) => {
  const setPointTitle = useStore(s => s.setPointTitle)
  const { animation, validateText } = useCharacterLimit(20)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trimStart()
    if (validateText(value)) setPointTitle(id, value)
  }
  const trimText = () => setPointTitle(id, text.trim())

  return (
    <div className='title-wrapper'>
      <input
        onBlur={trimText}
        className='title'
        type='text'
        value={text}
        onChange={handleChange}
        placeholder='Add a title...'
        style={{ animation }}
      />
      <ClearButton onClick={() => setPointTitle(id, '')} text={text} />
    </div>
  )
}

const Image = ({ url, id }: { url: string; id: string }) => {
  return (
    <div className='image-wrapper'>
      {url && <img className='image' src={url} draggable={false} />}
      <DragAndDropImage url={url} id={id} />
    </div>
  )
}

const Desc = ({ text, id }: { text: string; id: string }) => {
  const setPointDesc = useStore(s => s.setPointDesc)
  const { animation, validateText } = useCharacterLimit(120)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trimStart()
    if (validateText(value)) setPointDesc(id, value)
  }
  const trimText = () => setPointDesc(id, text.trim())

  return (
    <div className='desc-wrapper'>
      <textarea
        onBlur={trimText}
        className='desc'
        value={text}
        onChange={handleChange}
        placeholder='Add a description...'
        style={{ animation }}
      />
      <ClearButton onClick={() => setPointDesc(id, '')} text={text} />
    </div>
  )
}

const ClearButton = ({ onClick, text }: { onClick: () => void; text: string }) => {
  const disabled = text === ''
  const buttonClassName = disabled ? 'clear-btn hidden' : 'clear-btn'

  return (
    <div className='clear-btn-container'>
      <button className={buttonClassName} onClick={onClick} disabled={disabled}>
        <CrossIcon />
      </button>
    </div>
  )
}
