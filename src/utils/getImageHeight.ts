const decreasing = 35
const initialValue = 230

export const getImageHeight = (title: string, desc: string) => {
  let imageHeight = initialValue
  if (title) imageHeight -= decreasing
  if (desc) imageHeight -= decreasing
  return `${imageHeight}px`
}
