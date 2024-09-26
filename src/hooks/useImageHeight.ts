import { useWindowSize } from './useWindowSize'

export const useImageHeight = (title: string, desc: string) => {
  const { onMinHeight } = useWindowSize({ minHeight: 900 })

  // biome-ignore format: <>
  const { initial, decrease } = onMinHeight
    ? { initial: 240, decrease: 40 }
    : { initial: 210, decrease: 35 }

  const getImageHeight = () => {
    let imageHeight = initial

    if (title) imageHeight -= decrease
    if (desc) imageHeight -= decrease
    return `${imageHeight}px`
  }
  const minImageHeight = `${initial - decrease * 2}px`

  return { imageHeight: getImageHeight(), minImageHeight }
}
