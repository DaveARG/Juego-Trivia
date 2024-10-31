import { useState } from 'react'
import Button from './components/buttons/button'
import { ETAPAS_DEL_JUEGO } from './lib/global'

export default function App() {
    const [etapaJuego, setEtapaJuego] = useState(ETAPAS_DEL_JUEGO.inicio)

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center gap-4'>
            {etapaJuego === ETAPAS_DEL_JUEGO.inicio && (
                <>
                    <h1 className='text-3xl font-bold'>
                        Trivia de Programación
                    </h1>
                    <Button
                        onClick={() => setEtapaJuego(ETAPAS_DEL_JUEGO.juego)}
                        text='Jugar'
                        variant='warning'
                    />
                </>
            )}
            {etapaJuego === ETAPAS_DEL_JUEGO.juego && (
                <>
                    <Button
                        onClick={() => setEtapaJuego(ETAPAS_DEL_JUEGO.inicio)}
                        text='Volver'
                        variant='warning'
                    />
                    <h2 className='font-bold text-2xl'>Preguntas</h2>
                </>
            )}
        </div>
    )
}
