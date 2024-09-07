import { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../store/useStore'
import {
  ImageDelete as ImageDeleteIcon,
  ImageUpload as ImageUploadIcon,
  Upload as UploadIcon
} from '../../root/icons'
import './dragAndDropImage.css'

interface Props {
  url: string
  id: string
}

export const DragAndDropImage = ({ url, id }: Props) => {
  const setPointImage = useStore(s => s.setPointImage)
  const [draggingOver, setDraggingOver] = useState(false)
  const inputRef = useRef(null)
  const dragnDropRef = useRef(null)

  const className = (() => {
    let c = 'drag-and-drop-image'
    if (url) c += ' with-image'
    if (draggingOver) c += ' dragging-over'
    return c
  })()

  useEffect(() => {
    if (!dragnDropRef.current) return
    const dragnDrop: HTMLElement = dragnDropRef.current

    dragnDrop.ondragenter = () => setDraggingOver(true)
    dragnDrop.ondragleave = () => setDraggingOver(false)
    dragnDrop.ondragover = e => e.preventDefault()

    dragnDrop.ondrop = e => {
      e.preventDefault()
      setDraggingOver(false)

      if (!e.dataTransfer?.files) return
      const [file] = e.dataTransfer.files
      if (file) setImage(file)
    }
  }, [dragnDropRef.current])

  const handleBrowseFile = () => {
    if (!inputRef.current) return
    ;(inputRef.current as HTMLElement).click()
  }

  const acceptedFormats = ['image/png', 'image/jpeg', 'image/webp']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const [file] = e.target.files
    e.target.value = ''
    setImage(file)
  }

  const setImage = (image: File) => {
    if (!acceptedFormats.includes(image.type)) return
    const url = URL.createObjectURL(image)
    setPointImage(id, url)
  }

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setPointImage(id, '')
  }

  return (
    <div className={className} onClick={handleBrowseFile} ref={dragnDropRef}>
      {draggingOver ? (
        <>
          <UploadIcon />
          <span>drop it here!</span>
        </>
      ) : url ? (
        <>
          <span>
            <button onClick={handleDeleteImage}>
              <ImageDeleteIcon />
            </button>
            <button>
              <ImageUploadIcon />
            </button>
          </span>
          or drop an image here
        </>
      ) : (
        <>
          <ImageUploadIcon />
          Drag & Drop an image here
          <br />
          or choose one
        </>
      )}
      <input
        type='file'
        accept={acceptedFormats.join(', ')}
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  )
}
