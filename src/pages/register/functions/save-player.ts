type validatePlayerProps = {
    name: string
}
export default function validatePlayer({ name }: validatePlayerProps) {
    if (!name || !name.trim()) return false
    return true
}
