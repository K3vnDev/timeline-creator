import { useCharacterLimit } from './useCharacterLimit'

type SetValue = (value: string) => void
type ChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

export const useTextInput = (setValue: SetValue, maxCharacters: number) => {
  const { animation, validateText } = useCharacterLimit(maxCharacters)

  const handleChange = (e: ChangeEvent) => {
    const value = e.target.value.trimStart()
    if (validateText(value)) setValue(value)
  }

  const handleClear = () => setValue('')

  return { animation, handleChange, handleClear }
}
