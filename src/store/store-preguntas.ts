import { create } from 'zustand'

type useStorePreguntasProps = {
    preguntas: Pregunta[] | null
    setPreguntas: (preguntas: Pregunta[] | null) => void
}
const useStorePreguntas = create<useStorePreguntasProps>(set => ({
    preguntas: null,
    setPreguntas: preguntas => set({ preguntas }),
}))

export default useStorePreguntas
