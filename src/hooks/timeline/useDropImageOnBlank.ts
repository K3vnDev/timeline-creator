import { useEffect } from 'react'
import { useStore } from '../../store/useStore'

export const useDropImageOnBlank = () => {
  const [setSettingImageOnNextPoint, createPoint] = useStore(s => [
    s.setSettingImageOnNextPoint,
    s.createPoint
  ])

  useEffect(() => {
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()

      const addElements = document.querySelectorAll('.add-element')
      const { clientX: dropPositionX } = e

      const distances = [...addElements].map(el => {
        const { x, width } = el.getBoundingClientRect()
        const addElementPositionX = x + width / 2
        return Math.abs(dropPositionX - addElementPositionX)
      })
      const minDistance = Math.min(...distances)
      const index = distances.indexOf(minDistance)

      setSettingImageOnNextPoint(e.dataTransfer?.files)
      createPoint(index)
    }
    const handleDragOver = (e: DragEvent) => e.preventDefault()

    document.addEventListener('drop', handleDrop)
    document.addEventListener('dragover', handleDragOver)
    return () => {
      document.removeEventListener('drop', handleDrop)
      document.removeEventListener('dragover', handleDragOver)
    }
  }, [])
}
