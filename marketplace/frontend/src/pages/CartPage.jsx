import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCart } from "../store/cart/cartSlice";
import { createOrder, deleteCartItem } from "../store/orders/ordersSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { items, loading, error } = useSelector((state) => state.cart);
  const ordersLoading = useSelector((state) => state.orders.loading);

  useEffect(() => {
    dispatch(fetchCart(token));
  }, [dispatch, token]);

  const changeQuantity = (productId, quantity) => {
    dispatch(
      updateCart({
        token,
        productId,
        quantity,
      }),
    );
  };

  const handleDeleteItem = (productId) => {
    dispatch(deleteCartItem({ token, productId }));
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      return total + Number(item.product.price) * item.quantity;
    }, 0);
  };

  const handleCreateOrder = async () => {
    const result = await dispatch(createOrder(token));

    if (createOrder.fulfilled.match(result)) {
      navigate("/orders");
    }
  };

  if (loading && !items.length) {
    return <p>Загрузка корзины...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="cart-page">
      <div className="cart-page__header">
        <h1>Корзина</h1>

        <span className="cart-page__count">
          {items.length} {items.length === 1 ? "товар" : "товара"}
        </span>
      </div>

      {!items.length ? (
        <div className="cart-empty">
          <h2>Корзина пуста</h2>

          <p>Добавьте товары, чтобы оформить заказ.</p>

          <button
            type="button"
            className="button"
            onClick={() => navigate("/")}
          >
            Перейти к товарам
          </button>
        </div>
      ) : (
        <div className="cart-page__content">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item__image">
                  <span>{item.product.name.charAt(0)}</span>
                </div>

                <div className="cart-item__info">
                  <h2>{item.product.name}</h2>

                  <p>{item.product.description}</p>

                  <span className="cart-item__price">
                    {item.product.price} ₽
                  </span>
                </div>

                <div className="cart-item__controls">
                  <button
                    type="button"
                    onClick={() =>
                      changeQuantity(item.productId, item.quantity - 1)
                    }
                    disabled={loading}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      changeQuantity(item.productId, item.quantity + 1)
                    }
                    disabled={loading}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item__total">
                  {(Number(item.product.price) * item.quantity).toFixed(0)} ₽
                </div>

                <button
                  type="button"
                  className="cart-item__delete"
                  onClick={() => handleDeleteItem(item.productId)}
                  disabled={loading}
                >
                  ✕
                </button>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Итого</h2>

            <div className="cart-summary__row">
              <span>Товаров</span>
              <span>
                {items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>

            <div className="cart-summary__row cart-summary__total">
              <span>Сумма</span>
              <span>{getTotal().toFixed(0)} ₽</span>
            </div>

            <button
              type="button"
              className="button cart-summary__button"
              onClick={handleCreateOrder}
              disabled={ordersLoading || loading}
            >
              {ordersLoading ? "Оформление..." : "Оформить заказ"}
            </button>
          </aside>
        </div>
      )}
    </section>
  );
};

export default CartPage;
