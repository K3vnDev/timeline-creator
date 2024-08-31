import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CreatePage } from './components/create/CreatePage/CreatePage'
import { LandingPage } from './components/landing/LandingPage/LandingPage'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/create', element: <CreatePage /> }
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
