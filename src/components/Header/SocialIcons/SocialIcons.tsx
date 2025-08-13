import Link from "next/link";
import styles from './SocialIcons.module.css';

interface SocialIconsProps {
    className?: string;
    variant?: 'desktop' | 'mobile';
}

export default function SocialIcons({ className = "", variant = 'desktop' }: SocialIconsProps) {
    const containerClass = variant === 'mobile' ? styles.mobileSocialIcons : styles.socialIcons;
    
    return (
        <div className={`${containerClass} ${className}`}>
            <Link href="https://dzen.ru/profile/editor/ganin" className={`${styles.socialLink} ${styles.dzen}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-yandex"></i>
            </Link>
            <Link href="https://t.me/slavamsupsy" className={`${styles.socialLink} ${styles.telegram}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-telegram"></i>
            </Link>
            <Link href="https://wa.me/qr/LEBURMMQ5WUCP1" className={`${styles.socialLink} ${styles.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
            </Link>
        </div>
    );
}
