import { create } from 'zustand'

type useStorePlayerProps = {
    player: Player | null
    setPlayer: (player: Player) => void
}
const useStorePlayer = create<useStorePlayerProps>(set => ({
    player: null,
    setPlayer: (player: Player) => set({ player }),
}))

export default useStorePlayer