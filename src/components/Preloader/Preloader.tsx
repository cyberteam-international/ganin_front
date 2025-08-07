'use client';

import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
    const [currentProgress, setCurrentProgress] = useState(0);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // Симуляция загрузки с реалистичными этапами
        const loadingSteps = [
            { progress: 15, delay: 300 },   // Инициализация
            { progress: 35, delay: 400 },   // Загрузка ресурсов
            { progress: 55, delay: 350 },   // Обработка данных
            { progress: 75, delay: 300 },   // Подготовка интерфейса
            { progress: 90, delay: 250 },   // Финализация
            { progress: 100, delay: 200 }   // Завершение
        ];

        let stepIndex = 0;
        
        const executeStep = () => {
            if (stepIndex < loadingSteps.length) {
                const step = loadingSteps[stepIndex];
                updateProgress(step.progress);
                
                setTimeout(() => {
                    stepIndex++;
                    executeStep();
                }, step.delay);
            }
        };

        const updateProgress = (targetProgress: number) => {
            // Плавная анимация прогресса
            let animationId: number;
            
            const animateProgress = () => {
                setCurrentProgress(prev => {
                    const diff = targetProgress - prev;
                    if (Math.abs(diff) > 0.1) {
                        const newProgress = prev + diff * 0.1;
                        animationId = requestAnimationFrame(animateProgress);
                        return newProgress;
                    } else {
                        if (targetProgress >= 100) {
                            // Запускаем скрытие прелоадера при достижении 100%
                            setTimeout(() => {
                                onProgressComplete();
                            }, 300);
                        }
                        return targetProgress;
                    }
                });
            };
            
            animateProgress();
        };

        const onProgressComplete = () => {
            setIsHidden(true);
            document.body.classList.add('loaded');
            
            // Удаляем прелоадер из DOM через время анимации
            setTimeout(() => {
                // Здесь можно добавить дополнительную логику инициализации
                console.log('🎯 Прелоадер завершен, анимации инициализированы!');
            }, 500);
        };

        // Начинаем загрузку через небольшую задержку
        setTimeout(executeStep, 200);

        // Добавляем класс для скрытия контента во время загрузки
        document.body.style.overflow = 'hidden';

        return () => {
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
