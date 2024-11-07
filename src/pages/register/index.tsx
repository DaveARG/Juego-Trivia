import { Navigate, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import localforage from 'localforage'
import useStorePlayer from 'store/store-player'
import Button from 'components/buttons/button'
import useExistPlayer from 'hooks/use-exist-player'
import Loading from 'components/loaders/loading'
import validatePlayer from './functions/save-player'

export default function PaginaRegister() {
    const [hasError, setHasError] = useState(false)
    const [existPlayer, setExistPlayer] = useState(false)
    const inputName = useRef<HTMLInputElement>(null)
    const setPlayer = useStorePlayer(state => state.setPlayer)
    const navigate = useNavigate()

    const { exist, loading } = useExistPlayer()
    if (exist) return <Navigate to='/preguntas/1' />

    return loading ? (
        <Loading />
    ) : (
        <div className='flex flex-col gap-6 items-center justify-center'>
            <h1 className='text-7xl font-bold'>¡Bienvenido!</h1>
            {hasError && (
                <span className='text-rose-600 -mb-5 font-bold'>
                    Te olvidaste de poner tu Nombre!
                </span>
            )}
            {existPlayer && (
                <span className='text-rose-600 -mb-5 font-bold'>
                    ¡Ya existe un Usuario con ese Nombre!
                </span>
            )}
            <input
                ref={inputName}
                className='px-8 py-4 bg-slate-300 rounded-2xl shadow-xl'
                type='text'
                placeholder='Ingresa tu nombre'
            />
            <Button
                onClick={async () => {
                    const name = inputName.current?.value ?? ''
                    const players: Player[] =
                        (await localforage.getItem('players')) ?? []
                    const isSuccess = validatePlayer({
                        name,
                    })
                    if (players.some(p => p.name === name)) {
                        setExistPlayer(true)
                        return
                    }
                    const player: Player = {
                        name,
                        score: 0,
                        maxScore: 0,
                    }
                    if (isSuccess) {
                        setPlayer(player)
                        await localforage.setItem('player', player)
                        await localforage.setItem('players', [
                            ...players,
                            player,
                        ])
                        navigate('/preguntas/1')
                    } else setHasError(true)
                }}
                text='Continuar'
                variant='warning'
            />
        </div>
    )
}
