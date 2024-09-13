import { usePersistState } from '../../../hooks/usePersistState'
import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { NoTLSign } from '../NoTLSign/NoTLSign'
import { TLMenu } from '../TLMenu/TLMenu'
import { TLName } from '../TLName/TLName'
import { Timeline } from '../Timeline/Timeline'
import './createPage.css'

export const CreatePage = () => {
  const { timeline } = usePersistState()
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
