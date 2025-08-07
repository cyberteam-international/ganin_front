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
            <Link href="#" className={`${styles.socialLink} ${styles.vk}`}>
                <i className="fab fa-vk"></i>
            </Link>
            <Link href="#" className={`${styles.socialLink} ${styles.telegram}`}>
                <i className="fab fa-telegram"></i>
            </Link>
            <Link href="#" className={`${styles.socialLink} ${styles.whatsapp}`}>
                <i className="fab fa-whatsapp"></i>
            </Link>
        </div>
    );
}
