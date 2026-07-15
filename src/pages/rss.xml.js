import rss from '@astrojs/rss';
import { getPublishedArticles, withBase } from '../utils/articles';

export async function GET(context) {
  const articles = await getPublishedArticles();
  return rss({
    title: 'Cyber Shield — TUJ digital safety newsletter',
    description:
      'Monthly, plain-language security advice from TUJ’s Cyber Shield Club: phishing, passwords, scams, and privacy explained for everyday students.',
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      author: article.data.authors.join(', '),
      categories: article.data.tags,
      link: withBase(`/articles/${article.id}/`),
    })),
    customData: '<language>en</language>',
  });
}
