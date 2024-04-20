
# Мессенджер "Чат"

Проект представляет собой мессенджер для общения, который сделан по оригинальным макетам и в соответствии с современными технологиями.

- **Скорость общения**. Чат позволит пользователям быстро обмениваться сообщениями с друзьями и близкими.
- **Простота использования**. Чат имеет простой и отзывчивый дизайн, что поможет пользователю интуитивно использовать мессенджер.

## Дизайн
Ссылка на прототипы: https://www.figma.com/file/lzKte5vqbmUBLbGjzFM31o/YANDEX?type=design&node-id=0%3A1&mode=design&t=ucsRgcESN2wqpHqy-1

## Установка
Установить зависимости проекта: `npm install`

Собрать проект: `npm run build`

Запустить проект на localhost: `npm run start`

Проверить качество кода: `npm run test`

## Ссылки:

### На веб-приложение:

Netlify: https://soft-daffodil-147528.netlify.app/

### На сверстанные макеты:

Страница авторизации: https://soft-daffodil-147528.netlify.app/

Страница регистрации: https://soft-daffodil-147528.netlify.app/sign-up

Страница чатов: https://soft-daffodil-147528.netlify.app/chat-panel

Страница профиля: https://soft-daffodil-147528.netlify.app/profile

Страница смены пароля: https://soft-daffodil-147528.netlify.app/change-password

Страница смены данных: https://soft-daffodil-147528.netlify.app/settings

Страница 500: https://soft-daffodil-147528.netlify.app/error-500

Страница 404: https://soft-daffodil-147528.netlify.app/error-4xx

## Примеры использования

В новой версии приложения теперь:
- можно валидировать поля при нажатии кнопки сохранения или отправке сообщения
- код разбит на компоненты и страницы, наследующие Block
- используется EventBus для отслеживания жизненного цикла компонента
- внедрен класс HTTPTransport для реализации API
- появился блок с сообщениями

### Gitflow

1. Вся разработка ведется в спринтовой ветке с именованием `sprint_i`, где i = номер текущего спринта.
2. В ветку `main` открывается Pull Request из спринтовой ветки.
3. В этом файле необходимо указать ссылку на PR в ветке `main`.

### Стиль кода

- Папки и файлы именуются в формате `kebab case` (folder-name);
- Переменные и функции в файлах именуются в `camel case` (functionName);
- Классы именуются в `pascal case` (ClassName);
- Внутри класса следует соблюдать логическую структуру: сначала переменные, потом конструктор (если есть), затем функции. Не порядочно будет объявлять переменные перед непосредственным использованием функции;
- 2 отступа вместо 4;
- Не следует мусорить в консоли и оставлять лишние console.log() за собой;
- Внутри функции поощряется делить логически блоки кода пустыми строками. Например, объявление переменной - пустая строка - работа с этой переменной - пустая строка - возврат полученного значения.

## Ссылка на pull-request Спринт 1

https://github.com/divnvp/middle.messenger.praktikum.yandex/pull/4

## Ссылка на pull-request Спринт 2

https://github.com/divnvp/middle.messenger.praktikum.yandex/pull/5

## Ссылка на pull-request Спринт 3

https://github.com/divnvp/middle.messenger.praktikum.yandex/pull/6

## Ссылка на pull-request Спринт 4

https://github.com/divnvp/middle.messenger.praktikum.yandex/pull/7
