import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/orders/ordersSlice";

const OrdersPage = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { items, loading, error } = useSelector((state) => state.orders);

  const [sort, setSort] = useState("date-desc");

  useEffect(() => {
    dispatch(fetchOrders(token));
  }, [dispatch, token]);

  const sortedOrders = useMemo(() => {
    const result = [...items];

    if (sort === "date-desc") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sort === "date-asc") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (sort === "price-desc") {
      result.sort((a, b) => Number(b.totalPrice) - Number(a.totalPrice));
    }

    if (sort === "price-asc") {
      result.sort((a, b) => Number(a.totalPrice) - Number(b.totalPrice));
    }

    return result;
  }, [items, sort]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <p>Загрузка заказов...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="orders-page">
      <div className="orders-page__header">
        <div>
          <h1>Мои заказы</h1>
          <p>История ваших заказов</p>
        </div>

        <select
          className="select"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="date-desc">Сначала новые</option>

          <option value="date-asc">Сначала старые</option>

          <option value="price-desc">Цена: по убыванию</option>

          <option value="price-asc">Цена: по возрастанию</option>
        </select>
      </div>

      {!sortedOrders.length ? (
        <div className="orders-empty">
          <h2>Заказов пока нет</h2>
          <p>Оформите заказ, и он появится здесь.</p>
        </div>
      ) : (
        <div className="orders-list">
          {sortedOrders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card__header">
                <div>
                  <h2>Заказ #{order.id}</h2>

                  <span>{formatDate(order.createdAt)}</span>
                </div>

                <strong>{Number(order.totalPrice).toFixed(0)} ₽</strong>
              </div>

              <div className="order-card__items">
                {order.items.map((item) => (
                  <div className="order-item" key={item.id}>
                    <div className="order-item__info">
                      <h3>{item.product.name}</h3>

                      <span>
                        {item.quantity} шт. × {Number(item.price).toFixed(0)} ₽
                      </span>
                    </div>

                    <strong>
                      {(Number(item.price) * item.quantity).toFixed(0)} ₽
                    </strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrdersPage;
