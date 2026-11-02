import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="not-found-page">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/" className="button">
        На главную
      </Link>
    </section>
  );
};

export default NotFoundPage;
