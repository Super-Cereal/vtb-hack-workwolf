# vtb-hack-workwolf-backend

## Описание

Этот проект представляет собой backend для приложения, разработанного в рамках хакатона VTB. Проект создан с использованием NestJS, который является прогрессивным фреймворком для построения эффективных и масштабируемых серверных приложений на Node.js.

## Установка

Для установки зависимостей проекта выполните следующую команду:

```bash
npm install
```

## Скрипты

### Сборка

Для сборки проекта выполните команду:

```bash
npm run build
```

### Форматирование кода

Для автоматического форматирования кода выполните команду:

```bash
npm run format
```

### Запуск приложения

#### Разработка

Для запуска приложения в режиме разработки с автоматическим перезапуском при изменении файлов выполните команду:

```bash
npm run start:dev
```

#### Отладка

Для запуска приложения в режиме отладки выполните команду:

```bash
npm run start:debug
```

#### Продакшн

Для запуска приложения в продакшн режиме выполните команду:

```bash
npm run start:prod
```

### Линтинг

Для проверки и исправления кода с помощью ESLint выполните команду:

```bash
npm run lint
```

### Тестирование

#### Запуск тестов

Для запуска всех тестов выполните команду:

```bash
npm run test
```

#### Запуск тестов с отслеживанием изменений

Для запуска тестов с отслеживанием изменений выполните команду:

```bash
npm run test:watch
```

#### Покрытие кода тестами

Для запуска тестов с генерацией отчета о покрытии кода выполните команду:

```bash
npm run test:cov
```

#### Отладка тестов

Для запуска тестов в режиме отладки выполните команду:

```bash
npm run test:debug
```

#### End-to-End тестирование

Для запуска End-to-End тестов выполните команду:

```bash
npm run test:e2e
```

## Зависимости

### Основные зависимости

- `@nestjs/common`: ^10.0.0
- `@nestjs/core`: ^10.0.0
- `@nestjs/platform-express`: ^10.0.0
- `@nestjs/swagger`: ^7.4.2
- `class-transformer`: ^0.5.1
- `class-validator`: ^0.14.1
- `reflect-metadata`: ^0.2.0
- `rxjs`: ^7.8.1
- `swagger-ui-express`: ^5.0.1

### Зависимости для разработки

- `@nestjs/cli`: ^10.0.0
- `@nestjs/schematics`: ^10.0.0
- `@nestjs/testing`: ^10.0.0
- `@types/express`: ^4.17.17
- `@types/jest`: ^29.5.2
- `@types/node`: ^20.3.1
- `@types/supertest`: ^6.0.0
- `@typescript-eslint/eslint-plugin`: ^8.0.0
- `@typescript-eslint/parser`: ^8.0.0
- `eslint`: ^8.57.1
- `eslint-config-prettier`: ^9.1.0
- `eslint-plugin-prettier`: ^5.2.1
- `husky`: ^9.1.6
- `jest`: ^29.5.0
- `lint-staged`: ^15.2.10
- `prettier`: ^3.3.3
- `source-map-support`: ^0.5.21
- `supertest`: ^7.0.0
- `ts-jest`: ^29.1.0
- `ts-loader`: ^9.4.3
- `ts-node`: ^10.9.1
- `tsconfig-paths`: ^4.2.0
- `typescript`: ^5.1.3

## Настройки Jest

- `moduleFileExtensions`: ["js", "json", "ts"]
- `rootDir`: "src"
- `testRegex`: ".*\\.spec\\.ts$"
- `transform`: {"^.+\\.(t|j)s$": "ts-jest"}
- `collectCoverageFrom`: ["**/*.(t|j)s"]
- `coverageDirectory`: "../coverage"
- `testEnvironment`: "node"

## Настройки Husky

- `hooks`: {"pre-commit": "lint-staged"}

## Настройки lint-staged

- `*.{js,ts,json,yml}`: ["eslint --fix", "prettier --write"]

## Лицензия

UNLICENSED

## Версия

1.0.0