import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../store/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
        BestMarketPlace
      </Link>

      {isAuthenticated ? (
        <nav className="navbar__links">
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Мои заказы
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Корзина
          </NavLink>

          <span className="navbar__user">{user?.name}</span>

          <button
            type="button"
            className="navbar__logout"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </nav>
      ) : (
        <nav className="navbar__links">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Войти
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Регистрация
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
