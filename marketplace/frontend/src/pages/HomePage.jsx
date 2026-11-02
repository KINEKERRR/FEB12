import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../store/products/productsSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const filteredProducts = useMemo(() => {
    const result = items.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (sort === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sort === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [items, search, sort]);

  if (loading) {
    return <p>Загрузка товаров...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="products-page">
      <div className="products-page__header">
        <div>
          <h1>Товары</h1>
          <p>Выберите подходящий товар</p>
        </div>

        <div className="products-page__controls">
          <input
            className="input"
            type="text"
            placeholder="Поиск товара..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="select"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="default">Сортировка</option>
            <option value="name-asc">Название: А-Я</option>
            <option value="name-desc">Название: Я-А</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
          </select>
        </div>
      </div>

      {!filteredProducts.length ? (
        <div className="products-page__empty">Товары не найдены</div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default HomePage;
