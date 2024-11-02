type ButtonProps = {
    text: string
    variant?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'light'
        | 'dark'
    onClick?: () => void
}

export default function Button({
    text,
    variant = 'success',
    onClick,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${
                variant === 'success' && 'bg-lime-500 hover:bg-lime-700'
            } ${variant === 'warning' && 'bg-yellow-500 hover:bg-yellow-700'} ${
                variant === 'info' && 'bg-sky-500 hover:bg-sky-700'
            } text-white font-bold px-8 rounded-xl py-4 hover:scale-125 transition-all shadow-xl`}
        >
            {text}
        </button>
    )
}
