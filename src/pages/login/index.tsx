import Button from 'components/buttons/button'
import Loading from 'components/loaders/loading'
import useExistPlayer from 'hooks/use-exist-player'
import localforage from 'localforage'
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useStorePlayer from 'store/store-player'

export default function PaginaLogin() {
    const { exist, loading } = useExistPlayer()
    const [data, setData] = useState<Player[]>([])
    const [loadingData, setLoadingData] = useState(true)
    const setPlayer = useStorePlayer(state => state.setPlayer)
    const navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            const players: Player[] =
                (await localforage.getItem('players')) ?? []
            setData(players)
            setLoadingData(false)
        }
        getData()
    }, [])

    if (!loadingData && data.length === 0) return <Navigate to='/register' />
    if (exist) return <Navigate to='/preguntas/1' />

    return loading ? (
        <Loading />
    ) : (
        <div className='flex flex-col gap-8 items-center justify-center'>
            <span className='font-bold text-6xl'>Selecciona tu Nombre</span>
            <div className='grid grid-cols-2 gap-6'>
                {data.map(player => (
                    <Button
                        onClick={async () => {
                            const newPlayer = { ...player, score: 0 }
                            await localforage.setItem('player', newPlayer)
                            setPlayer(newPlayer)
                            navigate('/preguntas/1')
                        }}
                        key={player.name}
                        text={player.name}
                        variant='success'
                    />
                ))}
            </div>

            <Link to={`/`}>
                <Button text='Volver' variant='danger' />
            </Link>
        </div>
    )
}
