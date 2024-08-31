import { useEffect } from 'react'

export function useRouteClassName(route: string) {
  useEffect(() => {
    document.body.classList.add(route)
    document.querySelector('#root')?.classList.add(route)

    return () => {
      document.body.classList.remove(route)
      document.querySelector('#root')?.classList.remove(route)
    }
  }, [route])
}
