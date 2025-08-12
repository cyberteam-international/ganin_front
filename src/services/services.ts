export interface ServiceItem {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  publishedAt?: string;
}

// Статичные данные для демонстрации
const staticServices: ServiceItem[] = [
  {
    id: 1,
    title: "Кодирование от алкоголизма действенными методами",
    slug: "kodirovanie-ot-alkogolizma",
    excerpt: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit.",
    content: `
      <h2>Профессиональное кодирование от алкоголизма</h2>
      <p>Кодирование от алкоголизма — это эффективный метод лечения алкогольной зависимости, который помогает человеку прекратить употребление алкоголя на определенный период времени.</p>
      
      <h3>Методы кодирования</h3>
      <ul>
        <li>Медикаментозное кодирование</li>
        <li>Психотерапевтическое воздействие</li>
        <li>Гипнотическое кодирование</li>
        <li>Комбинированные методы</li>
      </ul>
      
      <h3>Преимущества метода</h3>
      <p>Кодирование позволяет быстро достичь трезвости и дает возможность человеку восстановить контроль над своей жизнью. Это первый важный шаг на пути к полному выздоровлению.</p>
    `,
    image: "/images/general.png",
    publishedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Психотерапия зависимостей",
    slug: "psikhoterapiya-zavisimostey",
    excerpt: "Комплексная работа с психологическими причинами зависимости. Индивидуальный подход к каждому клиенту с использованием современных методов психотерапии.",
    content: `
      <h2>Психотерапия зависимостей</h2>
      <p>Психотерапевтическая работа с зависимостями направлена на выявление и проработку глубинных причин аддиктивного поведения.</p>
      
      <h3>Направления работы</h3>
      <ul>
        <li>Когнитивно-поведенческая терапия</li>
        <li>Психоаналитический подход</li>
        <li>Семейная терапия</li>
        <li>Групповая психотерапия</li>
      </ul>
    `,
    image: "/images/whyme.png",
    publishedAt: "2024-01-10"
  },
  {
    id: 3,
    title: "Консультирование созависимых",
    slug: "konsultirovanie-sozavisimykh",
    excerpt: "Помощь родственникам и близким людей с зависимостью. Работа с созависимостью, восстановление здоровых отношений в семье.",
    content: `
      <h2>Работа с созависимостью</h2>
      <p>Созависимость — это болезненное состояние, которое развивается у близких людей зависимого человека.</p>
      
      <h3>Признаки созависимости</h3>
      <ul>
        <li>Чрезмерная забота о зависимом</li>
        <li>Потеря собственной идентичности</li>
        <li>Постоянное чувство вины</li>
        <li>Попытки контролировать поведение зависимого</li>
      </ul>
    `,
    image: "/images/default-article.svg",
    publishedAt: "2024-01-05"
  }
];

export async function getServices(): Promise<ServiceItem[]> {
  // Возвращаем статичные данные для демонстрации
  return staticServices;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  // Ищем в статичных данных
  const service = staticServices.find(s => s.slug === slug);
  return service || null;
}

export function serviceImageUrl(image: ServiceItem['image'] | string) {
  if (typeof image === 'string') {
    return image;
  }
  return '/images/default-article.svg';
}
