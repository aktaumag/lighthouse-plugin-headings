# lighthouse-plugin-headings

Плагин для [Lighthouse](https://github.com/GoogleChrome/lighthouse), добавляющий пользовательскую категорию **Headings** с аудитами структуры заголовков:

- **H1 missing** — проверка наличия `<h1>` в исходном HTML  
- **H1 multiple** — обнаружение более одного `<h1>`  
- **H1 added by JS** — (будет) выявление добавления `<h1>` скриптом  
- **H1 updated by JS** — (будет) проверка изменения/удаления `<h1>` после рендеринга  
- **H1 not first header** — первый заголовок должен быть `<h1>`  
- **HN minus 2 after hN** — проверка перепрыгивания уровней заголовков  
- **Heading is empty** — поиск пустых тегов заголовков  
- **H2 missing** — проверка наличия `<h2>` в исходном HTML  

---

## Установка

Через npm:

```bash
npm install -g lighthouse-plugin-headings
# или в проект
npm install --save-dev lighthouse-plugin-headings
```

---

## Запуск

```bash
lighthouse <URL> \
  --plugins=lighthouse-plugin-headings \
  --view
```

- `--view` — автоматически откроет HTML-отчёт в браузере.  
- По умолчанию в отчёте появится категория **Headings** с вашими аудитами.

Для запуска только вашей категории:

```bash
lighthouse <URL> \
  --plugins=lighthouse-plugin-headings \
  --only-categories=headings \
  --view
```

---

## Использование в CI / автоматизация

Варианты:
- **Lighthouse CI**  
  Добавьте в `lighthouserc.js` плагин:
  ```js
  module.exports = {
    ci: {
      collect: {
        url: ['https://example.com'],
        numberOfRuns: 1,
        settings: {
          plugins: ['lighthouse-plugin-headings']
        }
      }
    }
  };
  ```
- **Программный запуск**  
  ```js
  const lighthouse = require('lighthouse');
  const chromeLauncher = require('chrome-launcher');

  (async () => {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {port: chrome.port, plugins: ['lighthouse-plugin-headings']};
    const runnerResult = await lighthouse('https://example.com', options);
    console.log('Score:', runnerResult.lhr.categories.headings.score);
    await chrome.kill();
  })();
  ```

---

## Contributing

1. Сделайте форк репозитория  
2. Создайте новую ветку `feat-my-audit`  
3. Добавьте файл вашего аудита в папку `audits/`  
4. Зарегистрируйте его в `plugin-headings.js` (в секциях `audits` и `category.auditRefs`)  
5. Откройте PR

---

## Лицензия

[MIT](LICENSE) © Michael Kozhevnikov
