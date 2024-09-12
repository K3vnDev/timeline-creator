import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { useStore } from '../../../store/useStore'
import { NoTLSign } from '../NoTLSign/NoTLSign'
import { TLMenu } from '../TLMenu/TLMenu'
import { TLName } from '../TLName/TLName'
import { Timeline } from '../Timeline/Timeline'
import './createPage.css'

export const CreatePage = () => {
  const timeline = useStore(s => s.timeline)
  useRouteClassName('create')

  return (
    <>
      <TLMenu />
      {timeline ? (
        <>
          <TLName />
          <Timeline />
        </>
      ) : (
        <NoTLSign />
      )}
    </>
  )
}
