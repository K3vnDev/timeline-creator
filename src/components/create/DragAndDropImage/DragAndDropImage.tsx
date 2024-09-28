import { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../store/useStore'
import {
  ImageDelete as ImageDeleteIcon,
  ImageUpload as ImageUploadIcon,
  Upload as UploadIcon
} from '../../root/icons'
import './dragAndDropImage.css'
import { ACCEPTED_IMAGE_FORMATS } from '../../../consts.d'
import type { UploadedFiles } from '../../../types.d'
import { extractAndCompressImage } from '../../../utils/extractAndCompressImage'
import { getClassName } from '../../../utils/getClassName'
import { getElementRef } from '../../../utils/getElementRef'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows'

interface Props {
  url: string
}

export const DragAndDropImage = ({ url }: Props) => {
  // biome-ignore format: <>
  const [setPointImage, settingImageOnNextPoint, setSettingImageOnNextPoint] = 
    useStore(s => [s.setPointImage, s.settingImageOnNextPoint, s.setSettingImageOnNextPoint])

  const [draggingOver, setDraggingOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const reader = useRef(new FileReader())
  const inputRef = useRef(null)
  const dragnDropRef = useRef(null)

  // Handle image drop
  useEffect(() => {
    const dragnDrop = getElementRef(dragnDropRef)
    dragnDrop.ondragenter = () => setDraggingOver(true)
    dragnDrop.ondragleave = () => setDraggingOver(false)
    dragnDrop.ondragover = e => e.preventDefault()

    dragnDrop.ondrop = e => {
      e.preventDefault()
      e.stopPropagation()

      handleImageUpload(e.dataTransfer?.files)
      setDraggingOver(false)
    }
  }, [dragnDropRef.current])

  // Abort reader process on unload
  useEffect(() => () => reader.current.abort(), [])

  // Handle set image from drop on blank
  useEffect(() => {
    if (settingImageOnNextPoint) {
      handleImageUpload(settingImageOnNextPoint)
      setSettingImageOnNextPoint(null)
    }
  }, [])

  const handleImageUpload = async (files: UploadedFiles) => {
    setUploading(true)
    const imageUrl = await extractAndCompressImage(files, reader.current)

    if (imageUrl) setPointImage(imageUrl)
    setUploading(false)
  }

  const handleBrowseFile = () => {
    if (!inputRef.current || uploading) return
    ;(inputRef.current as HTMLElement).click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e.target.files)
    e.target.value = ''
  }

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setPointImage('')
  }

  const className = getClassName(
    'drag-and-drop-image',
    [url, 'with-image'],
    [draggingOver, 'dragging-over']
  )

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
