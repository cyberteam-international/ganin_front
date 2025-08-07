import Link from "next/dist/client/link";

export default function Page() {
  return (
    <div>
      <h1>Страница не найдена</h1>
      <p>К сожалению, запрашиваемая страница не существует.</p>
      <p>
        Вернуться на <Link href="/">главную страницу</Link>.
      </p>
    </div>
  );
}