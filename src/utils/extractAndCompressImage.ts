import imageCompression from 'browser-image-compression'
import { ACCEPTED_IMAGE_FORMATS } from '../consts.d'
import type { UploadedFiles } from '../types.d'

const options = {
  maxSizeMB: 0.3,
  maxWidthOrHeight: 480,
  useWebWorker: true
}

export const extractAndCompressImage = async (
  uploadedFiles: UploadedFiles,
  reader = new FileReader()
): Promise<string | undefined> => {
  if (!uploadedFiles) return
  const [file] = uploadedFiles

  if (!ACCEPTED_IMAGE_FORMATS.includes(file.type)) return

  try {
    const compressedImage = await imageCompression(file, options)

    const imageUrl = await new Promise<string>((res, rej) => {
      reader.readAsDataURL(compressedImage)

      reader.onload = e => {
        const result = e.target?.result
        if (result) res(result.toString())
        else rej()
      }
      reader.onerror = rej
      reader.onabort = rej
    })

    return imageUrl
  } catch {}
}
