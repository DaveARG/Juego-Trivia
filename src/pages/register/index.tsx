import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import localforage from 'localforage'
import useStorePlayer from 'store/store-player'
import Button from 'components/buttons/button'
import savePlayer from './functions/save-player'

export default function PaginaRegister() {
    const [hasError, setHasError] = useState(false)
    const inputName = useRef<HTMLInputElement>(null)
    const setPlayer = useStorePlayer(state => state.setPlayer)
    const navigate = useNavigate()

    return (
        <div className='flex flex-col gap-6 items-center justify-center'>
            <h1 className='text-7xl font-bold'>¡Bienvenido!</h1>
            {hasError && (
                <span className='text-rose-600'>
                    Te olvidaste de poner tu Nombre!
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
                    const isSuccess = savePlayer({
                        name,
                    })
                    const player: Player = {
                        name,
                        score: 0,
                    }
                    if (isSuccess) {
                        setPlayer(player)
                        const players: Player[] =
                            (await localforage.getItem('players')) ?? []
                        await localforage.setItem('players', [
                            ...players,
                            player,
                        ])
                        navigate('/preguntas')
                    } else setHasError(true)
                }}
                text='Continuar'
                variant='warning'
            />
        </div>
    )
}
