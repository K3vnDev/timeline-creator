import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { Background } from '../../root/Background/Background'
import '../../../index.css'
import './landingPage.css'
import { useNavigate } from 'react-router-dom'
import { useWindowSize } from '../../../hooks/useWindowSize'
import { useStore } from '../../../store/useStore'
import { AppButton } from '../../root/AppButton/AppButton'
import { TLSymbol } from '../../root/TLSymbol/TLSymbol'

export const LandingPage = () => {
  // biome-ignore format: <>
  const [savedTimelines, loadDemoTimeline, createTimeline, ] = 
    useStore(s => [s.savedTimelines, s.loadDemoTimeline, s.createTimeline])

  const navigate = useNavigate()
  useRouteClassName('landing')

  const loadDemo = () => {
    loadDemoTimeline()
    navigate('/create')
  }

  const startCreating = () => {
    if (savedTimelines.length === 0) createTimeline()
    navigate('/create')
  }

  return (
    <>
      <h1>TIMELINE CREATOR</h1>
      <article className='slogan'>
        <TLSymbolRef />
        <h3>Creating timelines was never that easy</h3>
        <TLSymbolRef />
      </article>
      <section className='buttons'>
        <AppButton color='gray' onClick={loadDemo}>
          Demo
        </AppButton>
        <AppButton color='blue' onClick={startCreating}>
          Start creating
        </AppButton>
      </section>
      <Background colors={['#260E56', '#150E56', '#150E56']} min={250} max={400} n={10} />
    </>
  )
}

const TLSymbolRef = () => {
  const { onMinWidth } = useWindowSize({ minWidth: 1300 })
  const { length, steps } = onMinWidth ? { length: 200, steps: 3 } : { length: 650, steps: 7 }

  return <TLSymbol color='#D0D0D0' length={length} steps={steps} size={22} width={9} />
}
