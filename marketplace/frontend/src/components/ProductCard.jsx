import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, updateCart } from "../store/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const { items, loading } = useSelector((state) => state.cart);

  const cartItem = items.find((item) => item.productId === product.id);

  const quantity = cartItem?.quantity || 0;

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

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <article className="product-card">
      <div className="product-card__link" onClick={handleProductClick}>
        <div className="product-card__image">
          <span>{product.name.charAt(0)}</span>
        </div>

        <div className="product-card__content">
          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <span className="product-card__price">{product.price} ₽</span>
        </div>
      </div>

      <div className="product-card__actions">
        {!quantity ? (
          <button
            type="button"
            className="product-card__button"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? "Добавление..." : "Добавить в корзину"}
          </button>
        ) : (
          <div className="product-card__counter">
            <button
              type="button"
              onClick={() => handleChangeQuantity(quantity - 1)}
              disabled={loading}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() => handleChangeQuantity(quantity + 1)}
              disabled={loading}
            >
              +
            </button>
          </div>
        )}

        {quantity > 0 && (
          <div className="product-card__cart-info">
            В корзине: {quantity} шт.
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
