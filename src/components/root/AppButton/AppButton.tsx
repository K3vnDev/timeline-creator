import './appButton.css'

interface Props {
  color: 'blue' | 'gray'
  onClick: () => void
  children: string
}

export const AppButton = ({ color, onClick, children }: Props) => {
  const className = `app-button ${color}`

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
