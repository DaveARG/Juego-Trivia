import Button from 'components/buttons/button'
import Loading from 'components/loaders/loading'
import useExistPlayer from 'hooks/use-exist-player'
import localforage from 'localforage'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import useStorePlayer from 'store/store-player'

export default function PaginaPreguntas() {
    const navigate = useNavigate()
    const player = useStorePlayer(state => state.player)
    const setPlayer = useStorePlayer(state => state.setPlayer)

    const { loading } = useExistPlayer()

    if (!player && !loading) return <Navigate to='/' />

    return loading ? (
        <Loading />
    ) : (
        <div className='flex flex-col gap-14 items-center justify-center'>
            <h1 className='text-5xl font-bold'>¡Tú puedes {player?.name}!</h1>
            <Outlet />

            <Button
                onClick={async () => {
                    await localforage.removeItem('player')
                    setPlayer(null)
                    navigate('/')
                }}
                text='Cerrar Sesión'
                variant='danger'
            />
        </div>
    )
}
