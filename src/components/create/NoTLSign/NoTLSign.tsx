import { useStore } from '../../../store/useStore'
import { BlueButton } from '../../root/BlueButton/BlueButton'
import './notlSign.css'

export const NoTLSign = () => {
  const createTimeline = useStore(s => s.createTimeline)

  return (
    <div className='not-tl-sign-wrapper'>
      <h2>
        Whoops, looks like
        <br />
        someone ran out of timelines
      </h2>
      <BlueButton onClick={createTimeline}>Create a new one</BlueButton>
    </div>
  )
}
