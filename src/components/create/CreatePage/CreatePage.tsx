import { useAppTitle } from '../../../hooks/useAppTitle'
import { usePersistState } from '../../../hooks/usePersistState'
import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { Tooltip } from '../../root/Tooltip/Tooltip'
import { NoTLSign } from '../NoTLSign/NoTLSign'
import { TLMenu } from '../TLMenu/TLMenu'
import { TLName } from '../TLName/TLName'
import { Timeline } from '../Timeline/Timeline'
import './createPage.css'

export const CreatePage = () => {
  const { timeline } = usePersistState()
  useRouteClassName('create')
  useAppTitle()

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
      <Tooltip />
    </>
  )
}
