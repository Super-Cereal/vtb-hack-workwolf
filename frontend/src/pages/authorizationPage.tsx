import React, { useState } from "react";

import { PageTemplate } from "@/components/page-template";

import styles from "./authorization.module.css";
const AuthorizationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(""); // Для общего уведомления
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка на незаполненные поля
    const hasErrors = Object.values(formData).some((value) => value.trim() === "");

    if (hasErrors) {
      setFormError("Не все поля заполнены");
    } else {
      setFormError(""); // Убираем ошибку, если все поля заполнены
    }
  };

  return (
    <PageTemplate>
      <form className={styles.registrationForm} onSubmit={handleSubmit}>
        <div className={styles.topStrip}></div> {/* Полоска сверху */}
        <h2>Добро пожаловать!</h2>
        <p>Введите свои данные для регистрации</p>
        {/* Общее уведомление о незаполненных полях */}
        {formError && <span className={styles.generalError}>{formError}</span>}
        <input type="text" name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} />
        <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} />
        <button type="submit">Зарегистрироваться</button>
        <p className={styles.policyText}>
          Нажимая кнопку «Зарегистрироваться», вы соглашаетесь с{" "}
          <a href="/privacy-policy">Политикой конфиденциальности</a>
        </p>
        <p className={styles.loginText}>
          Уже зарегистрированы? <a href="/login">Войти</a>
        </p>
      </form>
    </PageTemplate>
  );
};

export default AuthorizationPage;
