import localforage from 'localforage'
import { useEffect, useState } from 'react'
import useStorePlayer from 'store/store-player'
import useStorePreguntas from 'store/store-preguntas'
import preguntas from 'trivia-programacion.json'

export default function useExistPlayer() {
    const player = useStorePlayer(state => state.player)
    const setPlayer = useStorePlayer(state => state.setPlayer)
    const [exist, setExist] = useState(false)
    const [loading, setLoading] = useState(true)

    const setPreguntas = useStorePreguntas(state => state.setPreguntas)

    useEffect(() => {
        const preguntasRandom: Pregunta[] = preguntas
            .sort(() => 0.5 - Math.random())
            .slice(0, 10)
        setPreguntas(preguntasRandom)
        async function setExistPlayer() {
            const existPlayer: Player | null = await localforage.getItem(
                'player'
            )
            if (existPlayer) {
                if (!player) setPlayer(existPlayer)
                setExist(true)
            }
            setLoading(false)
        }
        setExistPlayer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setPlayer, setPreguntas])

    return { exist, loading }
}
