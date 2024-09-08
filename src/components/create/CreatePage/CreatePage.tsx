import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { Timeline } from '../Timeline/Timeline'
import './createPage.css'

export const CreatePage = () => {
  useRouteClassName('create')

  return <Timeline />
}
