import React, {useContext, useEffect, useState} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError ]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offser-s3">
        <h1>Изменение ссылок</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите ваш email"
                  id="email"
                  type="email"
                  name="email"
                  className="validate"
                  value={form.email}
                  onChange={ changeHandler }
                />
                <label htmlFor="email">Введите ваш email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите ваш пароль"
                  id="password"
                  type="password"
                  name="password"
                  minLength="6"
                  className="validate"
                  value={form.password}
                  onChange={ changeHandler }
                />
                <label htmlFor="password">Введите ваш пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4 mr-1"
              onClick={ loginHandler }
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={ registerHandler }
              disabled={ loading }
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
