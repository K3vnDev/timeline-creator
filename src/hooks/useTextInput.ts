import { useValidateText } from './useValidateText'

type SetValue = (value: string) => void
type ChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

export const useTextInput = (
  setValue: SetValue,
  maxCharacters: number,
  inputRef: React.MutableRefObject<null>
) => {
  const { animation, validateText } = useValidateText(maxCharacters, inputRef)

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target
    if (validateText(value)) setValue(value)
  }

  const handleClear = () => setValue('')

  return { animation, handleChange, handleClear }
}
