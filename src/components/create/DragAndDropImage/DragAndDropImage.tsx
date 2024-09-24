import { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../store/useStore'
import {
  ImageDelete as ImageDeleteIcon,
  ImageUpload as ImageUploadIcon,
  Upload as UploadIcon
} from '../../root/icons'
import './dragAndDropImage.css'
import imageCompression from 'browser-image-compression'
import { ACCEPTED_IMAGE_FORMATS } from '../../../consts.d'
import { getClassName } from '../../../utils/getClassName'
import { getElementRef } from '../../../utils/getElementRef'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows'

interface Props {
  url: string
}

export const DragAndDropImage = ({ url }: Props) => {
  const setPointImage = useStore(s => s.setPointImage)
  const [draggingOver, setDraggingOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const reader = useRef(new FileReader())
  const inputRef = useRef(null)
  const dragnDropRef = useRef(null)

  const stopUploading = () => setUploading(false)

  const className = getClassName(
    'drag-and-drop-image',
    [url, 'with-image'],
    [draggingOver, 'dragging-over']
  )

  useEffect(() => {
    const dragnDrop = getElementRef(dragnDropRef)
    dragnDrop.ondragenter = () => setDraggingOver(true)
    dragnDrop.ondragleave = () => setDraggingOver(false)
    dragnDrop.ondragover = e => e.preventDefault()

    dragnDrop.ondrop = e => {
      e.preventDefault()
      setDraggingOver(false)

      if (!e.dataTransfer?.files) return
      const [file] = e.dataTransfer.files
      if (file) compressImage(file)
    }
  }, [dragnDropRef.current])

  useEffect(() => () => reader.current.abort(), [])

  const handleBrowseFile = () => {
    if (!inputRef.current || uploading) return
    ;(inputRef.current as HTMLElement).click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const [file] = e.target.files
    e.target.value = ''

    if (ACCEPTED_IMAGE_FORMATS.includes(file.type)) {
      compressImage(file)
    }
  }

  const compressImage = (image: File) => {
    setUploading(true)

    const options = {
      maxSizeMB: 0.33,
      maxWidthOrHeight: 1080,
      useWebWorker: true
    }

    imageCompression(image, options)
      .then(compressedImage => {
        reader.current.readAsDataURL(compressedImage)

        reader.current.onload = e => {
          const result = e.target?.result
          if (!result) return

          setPointImage(result.toString())
          stopUploading()
        }
      })
      .catch(stopUploading)
  }

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setPointImage('')
  }

  return (
    <div className={className} onClick={handleBrowseFile} ref={dragnDropRef}>
      {uploading ? (
        <LoadingArrows />
      ) : draggingOver ? (
        <DraggingOver />
      ) : url ? (
        <HasImageMenu handleDeleteImage={handleDeleteImage} />
      ) : (
        <HasNotImageMenu />
      )}
      <input
        type='file'
        accept={ACCEPTED_IMAGE_FORMATS.join(', ')}
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  )
}

const DraggingOver = () => (
  <>
    <UploadIcon />
    <span>drop it here!</span>
  </>
)

interface HasImageMenuProps {
  handleDeleteImage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
const HasImageMenu = ({ handleDeleteImage }: HasImageMenuProps) => (
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
)

const HasNotImageMenu = () => (
  <>
    <ImageUploadIcon />
    Drag & Drop an image here
    <br />
    or choose one
  </>
)
