import Button from 'components/buttons/button'
import Loading from 'components/loaders/loading'
import useExistPlayer from 'hooks/use-exist-player'
import { Link, Navigate } from 'react-router-dom'

export default function PaginaInicio() {
    const { exist, loading } = useExistPlayer()
    if (exist) return <Navigate to='/preguntas/1' />

    return loading ? (
        <Loading />
    ) : (
        <section className='flex flex-col items-center justify-center gap-8'>
            <h1 className='text-7xl font-bold text-center'>
                Trivia de
                <br />
                Programación
            </h1>
            <div className='flex items-center gap-6'>
                <Link to={`/login`}>
                    <Button text='Iniciar Sesión' />
                </Link>
                <Link to={`/register`}>
                    <Button text='Registrarse' variant='warning' />
                </Link>
            </div>
        </section>
    )
}
