import { Github as GithubIcon } from '../../root/icons'
import { TLSList } from '../TLSList/TLSList'
import { ToggleMenuButton } from '../ToggleMenuButton/ToggleMenuButton'
import './tlMenu.css'
import { useCantScrollPage } from '../../../hooks/useCantScrollPage'
import { useMenu } from '../../../hooks/useMenu'
import { useStore } from '../../../store/useStore'
import { AppButton } from '../../root/AppButton/AppButton'
import { TLSymbol } from '../../root/TLSymbol/TLSymbol'

export const TLMenu = () => {
  const { elementRef } = useCantScrollPage()
  const { style, className } = useMenu()

  return (
    <>
      <ToggleMenuButton />

      <aside className={className} style={style} ref={elementRef}>
        <h3>MY TIMELINES</h3>
        <CreateNewButton />
        <TLSymbol color='#666' length={200} steps={3} size={26} width={18} />
        <TLSList />
        <GithubButton />
      </aside>
    </>
  )
}

const CreateNewButton = () => {
  const createTimeline = useStore(s => s.createTimeline)

  return (
    <AppButton onClick={createTimeline} color='blue'>
      Create new...
    </AppButton>
  )
}

const GithubButton = () => {
  return (
    <a className='github-btn' href='https://github.com/K3vnDev/timeline-creator' target='blank_'>
      <GithubIcon />
    </a>
  )
}
