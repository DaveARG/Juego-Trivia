import Button, { VariantColor } from 'components/buttons/button'
import globals from 'lib/constantes-globales'
import localforage from 'localforage'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStorePlayer from 'store/store-player'

type useSelectOpcionProps = {
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
    setOpcionesColor: React.Dispatch<
        React.SetStateAction<
            {
                alternativa: string
                color: VariantColor
            }[]
        >
    >
    id: number
}
function useSelectOpcion({
    setDisabled,
    setOpcionesColor,
    id,
}: useSelectOpcionProps) {
    const player = useStorePlayer(state => state.player)!
    const setPlayer = useStorePlayer(state => state.setPlayer)

    const navigate = useNavigate()

    type selectOpcionProps = {
        respuesta: string
        opcion: string
        j: number
    }
    function selectOpcion({ respuesta, opcion, j }: selectOpcionProps) {
        const newScore =
            opcion === respuesta
                ? player.score + globals.pregunta_correcta
                : player.score
        setPlayer({
            ...player,
            score: newScore,
            maxScore: newScore > player.maxScore ? newScore : player.maxScore,
        })
        setDisabled(true)
        setOpcionesColor(prev =>
            prev.map((p, i) => {
                if (i == j)
                    return opcion === respuesta
                        ? {
                              alternativa: opcion,
                              color: 'success',
                          }
                        : {
                              alternativa: opcion,
                              color: 'danger',
                          }
                if (p.alternativa === respuesta)
                    return {
                        alternativa: p.alternativa,
                        color: 'success',
                    }
                return {
                    alternativa: p.alternativa,
                    color: 'info',
                }
            })
        )
        setTimeout(async () => {
            if (id >= 10) {
                const players: Player[] =
                    (await localforage.getItem('players')) ?? []
                const index = players.findIndex(p => p.name === player.name)
                if (index !== -1) {
                    players[index] = player
                    await localforage.setItem('players', players)
                } else
                    await localforage.setItem('players', [player, ...players])

                navigate(`/final`)
                return
            }
            navigate(`/preguntas/${id + 1}`)
        }, 3000)
    }

    return { selectOpcion }
}

type PreguntaProps = {
    id: number
    titulo: string
    opciones: string[]
    respuesta: string
}
export default function Pregunta({
    id,
    titulo,
    opciones,
    respuesta,
}: PreguntaProps) {
    const [opcionesColor, setOpcionesColor] = useState<
        { alternativa: string; color: VariantColor }[]
    >([])
    const [disabled, setDisabled] = useState(false)
    const { selectOpcion } = useSelectOpcion({
        setDisabled,
        setOpcionesColor,
        id,
    })

    const [contador, setContador] = useState(3)
    const [showContador, setShowContador] = useState(false)

    useEffect(() => {
        setOpcionesColor(
            opciones.map(opcion => ({
                alternativa: opcion,
                color: 'warning',
            }))
        )
        setDisabled(false)
        setContador(3)
        setShowContador(false)
    }, [opciones])

    return (
        <>
            <span
                className={`text-6xl font-bold text-rose-500 ${
                    showContador || 'hidden'
                }`}
            >
                {contador}
            </span>
            <section className='flex flex-col gap-6'>
                <div className='flex items-center justify-center'>
                    <span className='font-bold text-4xl'>{id}.</span>
                    <h2 className='text-3xl font-bold'>{titulo}</h2>
                </div>
                <div className='grid grid-cols-2 gap-8'>
                    {opciones.map((opcion, j) => (
                        <Button
                            key={j}
                            onClick={() => {
                                setShowContador(true)
                                selectOpcion({
                                    respuesta,
                                    opcion,
                                    j,
                                })
                                const interval = setInterval(
                                    () => setContador(prev => prev - 1),
                                    1000
                                )
                                setTimeout(() => clearInterval(interval), 3000)
                            }}
                            disabled={disabled}
                            text={opcion}
                            variant={opcionesColor[j]?.color ?? 'warning'}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}
