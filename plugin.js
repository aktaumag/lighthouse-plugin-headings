module.exports = {
    // 1. Подключаем наши аудиты:
    audits: [
      { path: 'lighthouse-plugin-headings/audits/h1-initial.js' },
      { path: 'lighthouse-plugin-headings/audits/h1-multiple-initial.js' },
      { path: 'lighthouse-plugin-headings/audits/first-heading-level.js' }
      // Добавьте сюда остальные аудиты, которые реализуете.
    ],
  
    // 2. Определяем новую категорию для отчёта Lighthouse
    category: {
      title: 'wSEO.pw: Headings',  // Название категории в отчёте
      description: 'Custom heading checks on page',
      auditRefs: [
        // Перечисляем все аудиты плагина с их идентификаторами и весами
        { id: 'h1-initial', weight: 10 },
        { id: 'h1-multiple-initial', weight: 3 },
        { id: 'first-heading-level', weight: 3 }
        // Например, вес 1 для каждого, чтобы каждый аудит равномерно влиял на итоговый балл категории
      ]
    }
  };
  