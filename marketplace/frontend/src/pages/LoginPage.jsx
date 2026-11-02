import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../store/auth/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (data) => {
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Авторизация</h1>

        <label>
          Email
          <input
            type="email"
            {...register("email", {
              required: "Введите email",
            })}
          />
        </label>

        {errors.email && <span>{errors.email.message}</span>}

        <label>
          Пароль
          <input
            type="password"
            {...register("password", {
              required: "Введите пароль",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            })}
          />
        </label>

        {errors.password && <span>{errors.password.message}</span>}

        {error && <span>{error}</span>}

        <button type="submit" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>

        <p>
          Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
