import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { staticUrls } from "@/shared/lib/routes";
import { type IRegisterFormData, useRegisterUserMutation } from "@/shared/model/user";
import { Button } from "@/shared/ui/button";

import { adapter_registerFormDataToRegisterUserDTO } from "../lib/adapters";

import styles from "./authorizationForm.module.css";

export const AuthorizationForm = () => {
  const { mutate: registerUser, isPending, isSuccess: isUserRegistrated } = useRegisterUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserRegistrated) {
      navigate(staticUrls.main);
    }
  }, [isUserRegistrated, navigate]);

  const [formData, setFormData] = useState<IRegisterFormData>({
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
    const submitData = { ...formData };

    Object.keys(submitData).forEach((key) => {
      submitData[key] = submitData[key].trim();
    });

    const allFilled = Object.values(submitData).every((v) => Boolean(v));

    if (!allFilled) {
      setFormError("Не все поля заполнены");

      return;
    }

    setFormError(""); // Убираем ошибку, если все поля заполнены
    registerUser(adapter_registerFormDataToRegisterUserDTO(submitData));
  };

  return (
    <form className={styles.registrationForm} onSubmit={handleSubmit}>
      <div className={styles.topStrip} /> {/* Полоска сверху */}
      <h2>Добро пожаловать!</h2>
      <p className={styles.subtitle}>Введите свои данные для регистрации</p>
      {/* Общее уведомление о незаполненных полях */}
      {formError && <span className={styles.generalError}>{formError}</span>}
      <input type="text" name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} />
      <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} />
      <Button type="submit" disabled={isPending}>
        Зарегистрироваться
      </Button>
      <p className={styles.policyText}>
        Нажимая кнопку «Зарегистрироваться», вы соглашаетесь с{" "}
        <a href="/privacy-policy">Политикой конфиденциальности</a>
      </p>
      <p className={styles.loginText}>
        Уже зарегистрированы?{" "}
        <a className={styles.loginLink} href={staticUrls.authorization}>
          Войти
        </a>
      </p>
    </form>
  );
};
