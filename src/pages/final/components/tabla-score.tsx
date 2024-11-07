import localforage from 'localforage'
import { useEffect, useState } from 'react'

export default function TablaScore() {
    const [data, setData] = useState<Player[]>([])

    useEffect(() => {
        async function getData() {
            const players: Player[] =
                (await localforage.getItem('players')) ?? []
            setData(players)
        }
        getData()
    }, [])

    return (
        <div className='flex flex-col gap-4 border rounded-2xl shadow-xl p-6 max-h-[50dvh] overflow-y-auto'>
            {data.map(player => (
                <div
                    key={player.name}
                    className='flex gap-6 items-center justify-between bg-sky-500 text-white rounded-2xl px-8 py-4'
                >
                    <div>{player.name}</div>
                    <div>{player.maxScore}</div>
                </div>
            ))}
        </div>
    )
}
