type savePlayerProps = {
    name: string
}
export default function savePlayer({ name }: savePlayerProps) {
    if (!name) return false
    return true
}
