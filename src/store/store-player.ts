import { create } from 'zustand'

type useStorePlayerProps = {
    player: Player | null
    setPlayer: (player: Player | null) => void
}
const useStorePlayer = create<useStorePlayerProps>(set => ({
    player: null,
    setPlayer: player => set({ player }),
}))

export default useStorePlayer
