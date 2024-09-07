import { useCharacterLimit } from './useCharacterLimit'

type SetValue = (id: string, value: string) => void
type ChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

export const useTextInput = (
  value: string,
  setValue: SetValue,
  id: string,
  maxCharacters: number
) => {
  const { animation, validateText } = useCharacterLimit(maxCharacters)

  const handleChange = (e: ChangeEvent) => {
    const value = e.target.value.trimStart()
    if (validateText(value)) setValue(id, value)
  }

  const trimText = () => setValue(id, value.trim())
  const handleClear = () => setValue(id, '')

  return { animation, handleChange, trimText, handleClear }
}
