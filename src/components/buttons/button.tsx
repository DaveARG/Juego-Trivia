export type VariantColor =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'

type ButtonProps = {
    text: string
    variant?: VariantColor
    onClick?: () => void
    disabled?: boolean
}

export default function Button({
    text,
    variant = 'success',
    onClick,
    disabled,
}: ButtonProps) {
    let color = ''
    if (variant === 'success') color = 'bg-lime-500 hover:bg-lime-600'
    if (variant === 'warning') color = 'bg-yellow-500 hover:bg-yellow-600'
    if (variant === 'info') color = 'bg-sky-500 hover:bg-sky-600'
    if (variant === 'danger') color = 'bg-rose-500 hover:bg-rose-600'
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${color} text-white font-bold px-8 rounded-xl py-4 hover:scale-110 transition-all shadow-xl ${
                disabled && 'cursor-not-allowed'
            } `}
        >
            {text}
        </button>
    )
}
