

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'hero' | 'story' | 'default';
}

export default function Button({ children, onClick, className = "", variant = 'default' }: ButtonProps) {
    const baseClass = variant === 'hero' ? 'hero-button' 
                    : variant === 'story' ? 'story-btn' 
                    : 'btn';
    
    if (variant === 'hero') {
        return (
            <button onClick={onClick} className={`${baseClass} ${className}`}>
                <span>{children}</span>
                <div className="arrow-circle">
                    <i className="fas fa-arrow-right"></i>
                </div>
            </button>
        );
    }

    if (variant === 'story') {
        return (
            <button onClick={onClick} className={`${baseClass} ${className}`}>
                <span>{children}</span>
                <i className="fas fa-arrow-right"></i>
            </button>
        );
    }

    return (
        <button onClick={onClick} className={`${baseClass} ${className}`}>
            {children}
        </button>
    );
}