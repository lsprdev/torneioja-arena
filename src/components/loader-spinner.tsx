import { cn } from "@/lib/utils"

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    color?: 'primary' | 'secondary' | 'accent'
}

export default function LoaderSpinner({ size = 'md', color = 'primary' }: SpinnerProps) {
    return (
        <div
            className={cn(
                "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
                {
                    'h-6 w-6': size === 'sm',
                    'h-10 w-10': size === 'md',
                    'h-16 w-16': size === 'lg',
                    'text-primary': color === 'primary',
                    'text-secondary': color === 'secondary',
                    'text-accent': color === 'accent',
                }
            )}
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    )
}