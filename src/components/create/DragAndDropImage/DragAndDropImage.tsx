import { ImageDelete as ImageDeleteIcon, ImageUpload as ImageUploadIcon } from '../../root/icons'

interface Props {
  url: string
}

export const DragAndDropImage = ({ url }: Props) => {
  if (url) {
    return (
      <div className='drag-and-drop-image with-image'>
        <span>
          <ImageDeleteIcon />
          <ImageUploadIcon />
        </span>
        or drop an image here
      </div>
    )
  }

  return (
    <div className='drag-and-drop-image without-image'>
      <ImageUploadIcon />
      Drag & Drop an image here
      <br />
      or choose one
    </div>
  )
}
