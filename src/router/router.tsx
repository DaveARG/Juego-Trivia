import { createBrowserRouter } from 'react-router-dom'
import LayoutGenerico from 'components/layouts/layout-generico'
import PaginaInicio from 'pages/inicio'
import PaginaRegister from 'pages/register'
import PaginaPreguntas from 'pages/preguntas/components/layout'
import PaginaFinal from 'pages/final'
import PaginaPregunta from 'pages/preguntas'
import PaginaLogin from 'pages/login'

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
                path: '/login',
                element: <PaginaLogin />,
            },
            {
                path: 'register',
                element: <PaginaRegister />,
            },
            {
                path: 'preguntas',
                element: <PaginaPreguntas />,
                children: [
                    {
                        path: ':id',
                        element: <PaginaPregunta />,
                    },
                ],
            },
            {
                path: '/final',
                element: <PaginaFinal />,
            },
        ],
    },
])
