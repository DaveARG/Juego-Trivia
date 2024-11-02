import { createRoot } from 'react-dom/client'
import './tailwind.css'
import { RouterProvider } from 'react-router-dom'
import { router } from 'router/router'

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
