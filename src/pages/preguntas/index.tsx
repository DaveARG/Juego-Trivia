import useStorePlayer from 'store/store-player'

export default function PaginaPreguntas() {
    const player = useStorePlayer(state => state.player)
    return (
        <>
            <h1 className='text-5xl font-bold'>¡Tú puedes {player?.name}!</h1>
            {/* <div>Preguntas</div> */}
        </>
    )
}
