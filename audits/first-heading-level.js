const Audit = require('lighthouse').Audit;

class FirstHeadingLevelAudit extends Audit {
  static get meta() {
    return {
      id: 'first-heading-level',
      title: 'Первым заголовком на странице является <h1>',
      failureTitle: 'Первый заголовок на странице не <h1>',
      description: 'Первым по порядку в HTML должен идти заголовок первого уровня (<code>&lt;h1&gt;</code>). Более высокий заголовок (например <h2> или ниже) перед <h1> нарушает иерархию структуры контента.',
      requiredArtifacts: ['MainDocumentContent']
    };
  }

  static audit(artifacts) {
    const html = artifacts.MainDocumentContent || '';
    // Найдём первый встреченный тег <h1> ... <h6>
    const headingMatch = html.match(/<(h[1-6])[^>]*>/i);
    if (!headingMatch) {
      // На странице вообще нет заголовков
      return {
        score: 0,  // Считаем, что формально нет нарушения (но можно и 0, если хотим требовать наличие хотя бы H2)
        displayValue: 'На странице вообще нет заголовков'
      };
    }
    const firstTag = headingMatch[1].toLowerCase(); // например, "h2"
    const isH1First = firstTag === 'h1';
    return {
      score: isH1First ? 1 : 0,
      displayValue: `Первый заголовок в HTML: <${firstTag}>`
    };
  }
}

module.exports = FirstHeadingLevelAudit;
