'use client';

import { useState } from 'react';
import BookingModal from '@/components/BookingModal';

interface ConsultationButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function ConsultationButton({ className, children }: ConsultationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={className} onClick={handleClick}>
        {children}
      </button>
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
}
