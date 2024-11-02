import { createBrowserRouter } from 'react-router-dom'
import LayoutGenerico from 'components/layouts/layout-generico'
import PaginaInicio from 'pages/inicio'
import PaginaRegister from 'pages/register'
import PaginaPreguntas from 'pages/preguntas'
import PaginaFinal from 'pages/final'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutGenerico />,
        children: [
            {
                path: '',
                element: <PaginaInicio />,
            },
            {
                path: 'register',
                element: <PaginaRegister />,
            },
            {
                path: 'preguntas',
                element: <PaginaPreguntas />,
            },
            {
                path: '/final',
                element: <PaginaFinal />,
            },
        ],
    },
])
