import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { TLName } from '../TLName/TLName'
import { Timeline } from '../Timeline/Timeline'
import './createPage.css'

export const CreatePage = () => {
  useRouteClassName('create')

  return (
    <>
      <TLName />
      <Timeline />
    </>
  )
}
