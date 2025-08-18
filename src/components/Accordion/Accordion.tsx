import { useState } from 'react';
import styles from './Accordion.module.css';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

interface AccordionProps {
  items: {
    id: number;
    question: string;
    answer: string;
  }[];
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.header} 
        onClick={onToggle}
        type="button"
        aria-expanded={isOpen}
      >
        <h3 className={styles.question}>{question}</h3>
        <svg 
          className={styles.icon} 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
      <div className={styles.content}>
        <div className={styles.answer}>{answer}</div>
      </div>
    </div>
  );
}

export default function Accordion({ items }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}
