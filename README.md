# Проект: Mesto

## Данный сайт был создан с целью показать красивые места

Здесь вы можете выкладывать свои фотографии красивых мест. Также можете
поделиться впечатлениями и мечтами.

## Адаптивный сайт

Данный сайт адаптируется под разные типы устройств с разным разрешением экрана,
что позволяет использовать его на разгых типах устройств.

## Инструменты кроссбраузерной вёрстки

В данном проекте вы может увидеть некоторые виды инструментов для адаптивного сайта. А именно такие технологии как
:white_check_mark: Grid layout:

```CSS
@media screen and (max-width: 1279px) {
   display: grid;
  grid-template-columns: repeat(2, fit-content(400px));
  grid-template-rows: repeat(2, fit-content(120px));
  grid-template-areas:
    "name button"
    "job job";
    gap: 16px 18px;
    align-items: end;
}
```

:white_check_mark: Также хдесь используются flex технологии:

```CSS
@media screen and (max-width: 1279px) {
    display: flex;
  align-items: center;
}
```

## О будущем проекта

В проекте будут добавлены скрипты для изменения данных профиля, а также добавления новых постов. Следите за обновлениями)

### Ссылка на сайт (gh-pages)

https://mrainur.github.io/mesto-project/
