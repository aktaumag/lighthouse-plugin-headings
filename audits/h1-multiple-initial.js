const Audit = require('lighthouse').Audit;

class H1MultipleInitialAudit extends Audit {
  static get meta() {
    return {
      id: 'h1-multiple-initial',
      title: 'Только один <h1> в исходном HTML',
      failureTitle: 'Найдено несколько <h1> в исходном HTML',
      description: 'На странице должен быть один основной заголовок <code>&lt;h1&gt;</code>. Несколько <h1> могут запутать поисковые системы и пользователей:contentReference[oaicite:15]{index=15}.',
      requiredArtifacts: ['MainDocumentContent']
    };
  }

  static audit(artifacts) {
    const html = artifacts.MainDocumentContent || '';
    // Находим все вхождения <h1 ...> в тексте
    const matches = html.match(/<h1\b/gi) || [];  // \b – чтобы <h1> внутри не захватить
    const count = matches.length;
    const hasMultiple = count > 1;

    // Собираем список всех <h1> с их текстом
    const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
    const items = [];
    let match;
    while ((match = h1Regex.exec(html)) !== null) {
      // Обрезаем пробелы и переводим HTML‑сущности в текст (упрощённо)
      const text = match[1]
        .replace(/<[^>]+>/g, '')  // убираем вложенные теги
        .replace(/\s+/g, ' ')     // схлопываем пробелы
        .trim();
      items.push({content: text || '(пустой)'});
    }

    return {
      score: hasMultiple ? 0 : 1,
      numericValue: count,
      displayValue: `Количество H1 (в HTML): ${count}`,
      details: {
        type: 'table',
        headings: [
          {key: 'content', itemType: 'text', text: 'Содержимое <h1>'}
        ],
        items
      }
    };
  }
}

module.exports = H1MultipleInitialAudit;
