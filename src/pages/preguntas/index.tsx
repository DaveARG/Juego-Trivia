import { useParams } from 'react-router-dom'
import Pregunta from './components/pregunta'
import useStorePreguntas from 'store/store-preguntas'

export default function PaginaPregunta() {
    const { id } = useParams()

    const preguntas: Pregunta[] | null = useStorePreguntas(
        state => state.preguntas
    )
    if (!id) return 'error por id'

    const idNumber = parseInt(id) - 1
    if (!preguntas) return 'error por preguntas'

    return (
        <Pregunta
            id={parseInt(id)}
            titulo={preguntas[idNumber].pregunta}
            opciones={preguntas[idNumber].opciones}
            respuesta={preguntas[idNumber].respuesta_correcta}
        />
    )
}
