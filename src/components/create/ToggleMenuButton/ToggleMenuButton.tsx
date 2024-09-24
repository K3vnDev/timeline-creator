import { useCantScrollPage } from '../../../hooks/useCantScrollPage'
import { useStore } from '../../../store/useStore'
import { getClassName } from '../../../utils/getClassName'
import { Back as BackIcon, Menu as MenuIcon } from '../../root/icons'
import './toggleMenuButton.css'

export const ToggleMenuButton = () => {
  const { elementRef } = useCantScrollPage()

  // biome-ignore format: <>
  const [showingMenu, setShowingMenu, pointerEvents] = 
    useStore(s => [s.showingMenu, s.setShowingMenu, s.pointerEvents])

  const handleClick = () => setShowingMenu(!showingMenu)
  const className = getClassName('toggle-menu-btn', [showingMenu, 'with-menu'])

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
