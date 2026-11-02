import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../store/auth/authSlice";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(
      signup({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    );

    if (signup.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Регистрация</h1>

        <label>
          Имя
          <input
            type="text"
            {...register("name", {
              required: "Введите имя",
            })}
          />
        </label>

        {errors.name && <span>{errors.name.message}</span>}

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

        <label>
          Повторите пароль
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Повторите пароль",
              validate: (value) =>
                value === watch("password") || "Пароли не совпадают",
            })}
          />
        </label>

        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}

        {error && <span>{error}</span>}

        <button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>

        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
