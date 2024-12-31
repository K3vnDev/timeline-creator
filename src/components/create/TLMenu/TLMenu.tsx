import { Github as GithubIcon, Upload as UploadIcon } from '../../root/icons'
import { TLSList } from '../TLSList/TLSList'
import { ToggleMenuButton } from '../ToggleMenuButton/ToggleMenuButton'
import './tlMenu.css'
import { useCantScrollPage } from '../../../hooks/useCantScrollPage'
import { useMenu } from '../../../hooks/useMenu'
import { useStore } from '../../../store/useStore'
import { parseTimelines } from '../../../store/utils/parseTimelines'
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

        <div className='bts-wrapper'>
          <GithubButton />
          <UploadTimelinesButton />
        </div>
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
    <a className='btn' href='https://github.com/K3vnDev/timeline-creator' target='blank_'>
      <GithubIcon />
    </a>
  )
}

const UploadTimelinesButton = () => {
  const savedTimelines = useStore(s => s.savedTimelines)
  const setSavedTimelines = useStore(s => s.setSavedTimelines)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files === null || files.length === 0) return
    const [file] = files

    const reader = new FileReader()
    reader.readAsText(file)

    reader.onload = async e => {
      const result = e.target?.result?.toString() ?? ''
      console.log({ result: JSON.parse(result) })

      const parsedTimelines = await parseTimelines(result)
      if (parsedTimelines === null) return

      setSavedTimelines([...savedTimelines, ...parsedTimelines])
    }
  }

  return (
    <button className='btn' title='Upload timelines'>
      <input type='file' accept='.json' onChange={handleChange} />
      <UploadIcon />
    </button>
  )
}
