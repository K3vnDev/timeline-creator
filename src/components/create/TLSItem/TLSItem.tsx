import { useEffect, useRef, useState } from 'react'
import { UseTLSItem } from '../../../hooks/useTLSItem'
import { useStore } from '../../../store/useStore'
import type { HexColor, Timeline } from '../../../types.d'
import {
  Duplicate as DuplicateIcon,
  Palette as PaletteIcon,
  Settings as SettingsIcon,
  Trash as TrashIcon
} from '../../root/icons'
import './tlsItem.css'
import { useDebounce } from '../../../hooks/useDebounce'

interface TLSItemProps {
  timeline: Timeline
}

export const TLSItem = ({ timeline: { id, name, color } }: TLSItemProps) => {
  const { className, style, setTimeline, showingSettings, toggleShowingSetting, elementRef } =
    UseTLSItem(id, color)

  return (
    <li className={className} onClick={setTimeline} style={style} ref={elementRef}>
      <span>{name}</span>
      <SettingsButton onClick={toggleShowingSetting} />
      <section className='settings-wrapper'>
        <ChangeColorButton color={color} showingSettings={showingSettings} />
        <DeleteButton />
        <DuplicateButton />
      </section>
    </li>
  )
}

const SettingsButton = ({ onClick }: { onClick: () => void }) => (
  <button className='settings-btn' onClick={onClick}>
    <SettingsIcon />
  </button>
)

const DeleteButton = () => {
  const deleteTimeline = useStore(s => s.deleteTimeline)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    deleteTimeline()
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
  color: HexColor
  showingSettings: boolean
}

const ChangeColorButton = ({ color: initialColor, showingSettings }: ChangeColorButtonProps) => {
  const setTimelineColor = useStore(s => s.setTimelineColor)
  const inputRef = useRef(null)

  const [inputColor, setInputColor] = useState<HexColor>(initialColor)
  const debouncedColor = useDebounce(inputColor, 100)

  useEffect(() => setTimelineColor(debouncedColor), [debouncedColor])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setInputColor(e.target.value as HexColor)
  }

  const handleClick = () => {
    if (!inputRef.current) return
    const element: HTMLInputElement = inputRef.current

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
