const Audit = require('lighthouse').Audit;

class H1InitialAudit extends Audit {
  static get meta() {
    return {
      id: 'h1-initial',
      title: 'Страница содержит <h1> (в исходном HTML)',
      failureTitle: 'В исходном HTML отсутствует <h1>',
      description: 'Статический HTML страницы должен содержать тег <code>&lt;h1&gt;</code> – главный заголовок страницы. Отсутствие <h1> может негативно сказаться на SEO.',
      requiredArtifacts: ['MainDocumentContent']
    };
  }

  static audit(artifacts) {
    const html = artifacts.MainDocumentContent || ''; 
    // Ищем в сыром HTML тег <h1> (нечувствительно к регистру)
    const hasH1 = /<h1[^>]*>/i.test(html);
    return {
      score: hasH1 ? 1 : 0,
      numericValue: hasH1 ? 1 : 0, // например, 1 если есть, 0 если нет
      displayValue: hasH1 ? 'H1 найден' : 'H1 не найден'
    };
  }
}

module.exports = H1InitialAudit;
