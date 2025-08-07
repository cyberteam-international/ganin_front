import styles from './MobileOverlay.module.css';

interface MobileOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileOverlay({ isOpen, onClose }: MobileOverlayProps) {
    return (
        <div 
            className={`${styles.mobileOverlay} ${isOpen ? styles.active : ''}`}
            onClick={onClose}
        />
    );
}
