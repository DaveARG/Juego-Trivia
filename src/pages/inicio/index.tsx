import Button from 'components/buttons/button'
import { Link } from 'react-router-dom'

export default function PaginaInicio() {
    return (
        <section className='flex flex-col items-center justify-center gap-4'>
            <h1 className='text-3xl font-bold'>Trivia de Programación</h1>
            <Link to={`/register`}>
                <Button text='Jugar' />
            </Link>
        </section>
    )
}
