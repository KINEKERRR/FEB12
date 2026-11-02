import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, updateCart } from "../store/cart/cartSlice";
import { getProductRequest } from "../services/api";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const { items, loading: cartLoading } = useSelector((state) => state.cart);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cartItem = items.find((item) => item.productId === Number(id));

  const quantity = cartItem?.quantity || 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductRequest(id);
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        token,
        productId: product.id,
        quantity: 1,
      }),
    );
  };

  const handleChangeQuantity = (newQuantity) => {
    dispatch(
      updateCart({
        token,
        productId: product.id,
        quantity: newQuantity,
      }),
    );
  };

  if (loading) {
    return <p>Загрузка товара...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Товар не найден</p>;
  }

  return (
    <section className="product-page">
      <button
        type="button"
        className="product-page__back"
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>

      <div className="product-page__content">
        <div className="product-page__image">
          <span>{product.name.charAt(0)}</span>
        </div>

        <div className="product-page__info">
          <h1>{product.name}</h1>

          <p className="product-page__description">{product.description}</p>

          <div className="product-page__price">{product.price} ₽</div>

          {!quantity ? (
            <button
              type="button"
              className="product-page__button"
              onClick={handleAddToCart}
              disabled={cartLoading}
            >
              {cartLoading ? "Добавление..." : "Добавить в корзину"}
            </button>
          ) : (
            <>
              <div className="product-page__counter">
                <button
                  type="button"
                  onClick={() => handleChangeQuantity(quantity - 1)}
                  disabled={cartLoading}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() => handleChangeQuantity(quantity + 1)}
                  disabled={cartLoading}
                >
                  +
                </button>
              </div>

              <div className="product-page__cart-info">
                В корзине: {quantity} шт.
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
