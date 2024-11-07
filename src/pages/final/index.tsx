import Loading from 'components/loaders/loading'
import useExistPlayer from 'hooks/use-exist-player'
import { Navigate, useNavigate } from 'react-router-dom'
import useStorePlayer from 'store/store-player'
import TablaScore from './components/tabla-score'
import Button from 'components/buttons/button'
import localforage from 'localforage'

export default function PaginaFinal() {
    const { loading } = useExistPlayer()
    const player = useStorePlayer(state => state.player)!
    const setPlayer = useStorePlayer(state => state.setPlayer)
    const navigate = useNavigate()

    if (!player && !loading) return <Navigate to='/' />

    return loading ? (
        <Loading />
    ) : (
        <div className='flex flex-col gap-4 items-center justify-center'>
            <span className='text-6xl font-bold'>
                ¡Felicidades {player.name}!
            </span>
            <span className='text-5xl font-bold'>
                Tu Score es:{' '}
                <span className='text-lime-500'>{player.score}</span>
            </span>
            <TablaScore />
            <Button
                onClick={async () => {
                    await localforage.removeItem('player')
                    setPlayer(null)
                    navigate('/')
                }}
                text='Volver al Inicio'
                variant='danger'
            />
        </div>
    )
}
