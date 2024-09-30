import { useStore } from '../../../store/useStore'
import { AppButton } from '../../root/AppButton/AppButton'
import './notlSign.css'

export const NoTLSign = () => {
  const createTimeline = useStore(s => s.createTimeline)

  return (
    <div className='not-tl-sign-wrapper'>
      <h2>
        Whoops, looks like
        <br />
        someone ran out of timelines...
      </h2>
      <AppButton onClick={createTimeline} color='blue'>
        Create a new one
      </AppButton>
    </div>
  )
}
