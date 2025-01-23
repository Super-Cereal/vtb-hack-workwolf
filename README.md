# vtb-hack-workwolf

Проект команды workwolf на VTB API hackathon 2024. 

Геймифицированный сервис, который в обмен на выполнение заданий и обучение финансовой грамотности предоставляет кешбеки, скидки и акции. 

<img width="1424" alt="Screenshot 2025-01-23 at 13 04 40" src="https://github.com/user-attachments/assets/5ba26886-97aa-46b0-86d2-045ae0c46edc" />


## Как запустить

Нужна установленная Node.js v20

- Установить зависимости **из корня репозитория** (устанавливаем из корня, чтобы активировать и пользоваться всей мощью pre-commit хука)
  ```bash
  npm run deps
  ```
- Создать базу данные и заполнить файлик `.env` в `/backend`:
  ```txt
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=postgres
  DB_PASSWORD=password
  DB_NAME=vtbhackaton
  FRONTEND_DOMAIN=http://localhost:8080
  ```
- Запускаем микросервис с openApi, бэкенд и фронтенд
  ```bash
  npm run start
  ```

## О проекте

### Части приложения:

- [frontend](./frontend)
- [backend](./backend)

### Инфраструктура:

- `webpack` – для сборки файлов приложений
- `babel` – для транспиляции jsx в js и ts в js
- `eslint` – для проверки кода и единого стиля
- `typescript checks` – для проверки типов
- `prettier` – для форматирования кода
- `husky` – для работы с хуками гита:
  - `pre-commit` – используем, чтобы отформатировать и проверить весь код перед тем, как залить в репозиторий
  - `commit-msg` – используем, чтобы придерживаться соглашения наименования коммитов
- `lint-staged` – для запуска prettier только на измененных файлах
