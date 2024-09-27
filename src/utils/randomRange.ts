export const randomRange = (minInclusive: number, maxExclusive: number, whole = true) => {
  const diff = maxExclusive - minInclusive
  let random = Math.random() * diff + minInclusive
  if (whole) random = Math.floor(random)
  return random
}
