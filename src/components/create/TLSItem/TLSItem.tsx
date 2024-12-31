import { useEffect, useRef, useState } from 'react'
import { UseTLSItem } from '../../../hooks/useTLSItem'
import { useStore } from '../../../store/useStore'
import type { Timeline } from '../../../types.d'
import {
  Cancel as CancelIcon,
  Download as DownloadIcon,
  Duplicate as DuplicateIcon,
  Palette as PaletteIcon,
  Settings as SettingsIcon,
  Trash as TrashIcon
} from '../../root/icons'
import './tlsItem.css'
import { useDebounce } from '../../../hooks/useDebounce'
import { getIndex } from '../../../store/utils/getIndex'
import { getElementRef } from '../../../utils/getElementRef'

interface TLSItemProps {
  timeline: Timeline
}

export const TLSItem = ({ timeline: { id, name, color } }: TLSItemProps) => {
  // biome-ignore format: <>
  const { 
    className, style, handleClick, showingSettings, 
    toggleShowingSetting, elementRef, deleting, setDeleting 
  } = UseTLSItem(id, color)

  // biome-ignore format: <>
  return (
    <li className={className} onClick={handleClick} style={style} ref={elementRef}>
      <div className='name-wrapper'>
        {deleting && <span>To delete:</span>}
        <h5>{name}</h5>
      </div>
      {deleting 
        ? <CancelButton setDeleting={setDeleting} />
        : <SettingsButton onClick={toggleShowingSetting} />
      }
      <section className='settings-wrapper' >
        <ChangeColorButton color={color} showingSettings={showingSettings} />
        <DeleteButton setDeleting={setDeleting} />
        <DuplicateButton />
        <DownloadButton timelineId={id} />
      </section>
    </li>
  )
}

// ---

interface SettingButtonProps {
  onClick: () => void
}

const SettingsButton = ({ onClick }: SettingButtonProps) => (
  <button className='settings-btn' onClick={onClick}>
    <SettingsIcon />
  </button>
)

interface DeleteButtonProps {
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteButton = ({ setDeleting }: DeleteButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setDeleting(true)
  }
  return (
    <button className='settings-delete-btn' onClick={handleClick}>
      <TrashIcon />
    </button>
  )
}

const DuplicateButton = () => {
  const duplicateTimeline = useStore(s => s.duplicateTimeline)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    duplicateTimeline()
  }

  return (
    <button className='settings-duplicate-btn' onClick={handleClick}>
      <DuplicateIcon />
    </button>
  )
}

interface ChangeColorButtonProps {
  color: string
  showingSettings: boolean
}

const ChangeColorButton = ({ color: initialColor, showingSettings }: ChangeColorButtonProps) => {
  const setTimelineColor = useStore(s => s.setTimelineColor)
  const inputRef = useRef(null)

  const [inputColor, setInputColor] = useState<string>(initialColor)
  const debouncedColor = useDebounce(inputColor, 100)

  useEffect(() => setTimelineColor(debouncedColor), [debouncedColor])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setInputColor(e.target.value)
  }

  const handleClick = () => {
    const element = getElementRef<HTMLInputElement>(inputRef)

    element.value = initialColor
    element.click()
  }

  const style = {
    '--color': inputColor
  } as React.CSSProperties

  return (
    <button className='settings-color-btn' style={style} onClick={handleClick}>
      <PaletteIcon />
      {showingSettings && <input type='color' onChange={handleChange} ref={inputRef} />}
    </button>
  )
}

interface CancelButtonProps {
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>
}

const CancelButton = ({ setDeleting }: CancelButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setDeleting(false)
  }

  return (
    <button className='cancel-btn' onClick={handleClick}>
      <CancelIcon />
    </button>
  )
}

interface DownloadButtonProps {
  timelineId: string
}

const DownloadButton = ({ timelineId }: DownloadButtonProps) => {
  const timelines = useStore(s => s.savedTimelines)

  const downloadTimeline = (timeline: Timeline) => {
    const content = JSON.stringify([timeline])
    const { name } = timeline
    const fileName = `${name.trim() ?? 'my-timeline'}.json`

    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    const index = getIndex(timelines, timelineId)
    if (index === -1) return

    const timeline = timelines[index]
    downloadTimeline(timeline)
  }

  return (
    <button className='settings-download-btn' onClick={handleClick}>
      <DownloadIcon />
    </button>
  )
}
