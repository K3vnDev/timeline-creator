import { useCantScrollPage } from '../../../hooks/useCantScrollPage'
import { useStore } from '../../../store/useStore'
import { Back as BackIcon, Menu as MenuIcon } from '../../root/icons'
import './toggleMenuButton.css'

export const ToggleMenuButton = () => {
  const { elementRef } = useCantScrollPage()

  // biome-ignore format: <>
  const [showingMenu, setShowingMenu, pointerEvents] = 
    useStore(s => [s.showingMenu, s.setShowingMenu, s.pointerEvents])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setShowingMenu(!showingMenu)
  }
  const className = showingMenu ? 'toggle-menu-btn  with-menu' : 'toggle-menu-btn'

  // biome-ignore format: <>
  return (
    <button
      className={className}
      onClick={handleClick}
      ref={elementRef}
      style={{ pointerEvents }}
    >
      {!showingMenu 
        ? <MenuIcon /> 
        : <BackIcon />}
    </button>
  )
}
