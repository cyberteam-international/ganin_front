'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
    const [currentProgress, setCurrentProgress] = useState(0);
    const [isHidden, setIsHidden] = useState(false);
    const currentProgressRef = useRef(0);
    
    // Обновляем ref при изменении state
    useEffect(() => {
        currentProgressRef.current = currentProgress;
    }, [currentProgress]);

    useEffect(() => {
        // Более простая и надежная логика загрузки
        let currentStep = 0;
        let animationId: number | null = null;
        
        const steps = [0, 15, 35, 55, 75, 90, 100];
        const delays = [300, 400, 350, 300, 250, 200];
        
        const animate = (targetProgress: number) => {
            const startProgress = currentProgressRef.current;
            const startTime = Date.now();
            const duration = 200; // Фиксированная длительность анимации
            
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            const animateFrame = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out кубик
                
                const currentValue = startProgress + (targetProgress - startProgress) * easeProgress;
                setCurrentProgress(currentValue);
                
                if (progress < 1) {
                    animationId = requestAnimationFrame(animateFrame);
                } else {
                    animationId = null;
                    if (targetProgress >= 100) {
                        setTimeout(completeLoading, 300);
                    }
                }
            };
            
            animationId = requestAnimationFrame(animateFrame);
        };
        
        const completeLoading = () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            
            setIsHidden(true);
            document.body.classList.add('loaded');
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                console.log('🎯 Прелоадер завершен!');
            }, 500);
        };
        
        const nextStep = () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                animate(steps[currentStep]);
                
                if (currentStep < steps.length - 1) {
                    setTimeout(nextStep, delays[currentStep - 1] || 300);
                }
            }
        };
        
        // Добавляем класс для скрытия контента
        document.body.style.overflow = 'hidden';
        
        // Начинаем анимацию
        const startTimeout = setTimeout(() => {
            animate(steps[0]);
            setTimeout(nextStep, 200);
        }, 100);
        
        // Аварийное завершение
        const emergencyTimeout = setTimeout(() => {
            console.warn('⚠️ Прелоудер принудительно завершен');
            completeLoading();
        }, 4000);
        
        return () => {
            clearTimeout(startTimeout);
            clearTimeout(emergencyTimeout);
            if (animationId) cancelAnimationFrame(animationId);
            document.body.style.overflow = 'auto';
        };
    }, []);

    if (isHidden) {
        return null;
    }

    return (
        <div className={`${styles.preloader} ${isHidden ? styles.hidden : ''}`}>
            <div className={styles.preloaderContent}>
                <div className={styles.progressText}>
                    <span className={styles.progressPercent}>
                        {Math.round(currentProgress)}%
                    </span>
                </div>
            </div>
        </div>
    );
}
