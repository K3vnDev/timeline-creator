// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Conditions = Array<[any, string]>

export const getClassName = (initialName: string, ...posibleNames: Conditions) => {
  let className = initialName
  for (const [condition, name] of posibleNames) {
    if (condition) className += ` ${name}`
  }
  return className
}
