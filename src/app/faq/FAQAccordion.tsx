'use client';

import Accordion from '@/components/Accordion';
import type { FAQItem } from '@/services/faq';

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return <Accordion items={items} />;
}
