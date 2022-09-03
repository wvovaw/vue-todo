# Todo notes app

## Дерево проекта

```
├── App.vue               - Корневой компонент
├── assets                - Стили, применяемые глобально
│   ├── checkbox.scss
│   ├── colors.scss
│   └── main.scss
├── components
│   ├── ControlsBar.vue   - Стилистический компонент панели инструментов
│   ├── ModalDialog.vue   - Компонент модального диалогового окна
│   ├── NoteEntity.vue    - Компонент, представляющий собой записку с сокращенным todo-списком
│   ├── NotesList.vue     - Компонент - контейнер записок
│   └── TodoItem.vue      - Компонент, представляющий собой один пункт todo-списка
├── main.js               - Основной скрипт, где создаётся экземпляр vue
├── router
│   └── index.            - Экземпляр vue-router
├── store
│   └── index.js          - Экземпляр vuex
└── views
    ├── EditView.vue      - View маршрутов /edit/new и /edit/:id. Страница редактирования заметки
    └── HomeView.vue      - View маршрута /. Страница списка заметок
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
### Deploy on gh-pages
```
yarn deploy
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
