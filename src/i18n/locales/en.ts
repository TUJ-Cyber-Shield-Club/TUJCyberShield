// ─────────────────────────────────────────────────────────────────────────────
// UI string dictionary.
//
// `en` below is the source of truth: its shape defines the `UIKey` type, so a
// locale that omits a key is flagged in the editor as a type error.
//
// Note this is an editor-time guarantee only — the project has no `typescript`
// or `@astrojs/check` dependency, so `npm run build` will not catch it. At
// runtime `t()` falls back to English for any missing key, so the worst case is
// an untranslated string rather than a broken page. Run
// `npm i -D typescript @astrojs/check && npx astro check` to make it enforced.
//
// Conventions:
//   · {name}, {count}, {issue}, {year} are placeholders — see t() in utils.ts.
//   · "Cyber Shield", "TUJ" and member names are proper nouns; they stay in
//     Latin script everywhere rather than being transliterated.
//   · Plurals use separate _one/_other keys rather than embedded logic, since
//     several of these languages don't inflect for number at all.
// ─────────────────────────────────────────────────────────────────────────────

export const en = {
  // ── chrome ──────────────────────────────────────────────────────────────
  'skip.content': 'Skip to content',
  'brand.sub': 'TUJ student publication',
  'brand.logoAlt': 'TUJ Cyber Shield club logo: an owl holding a padlock on a teal shield',
  'header.signal.left': 'TUJ Cyber Shield Club — student-run, open to all',
  'header.signal.right': 'Digital safety briefing · published monthly',
  'header.join': 'Join the club',
  'header.joinShort': 'Join',
  'nav.aria.site': 'Site',
  'nav.home': 'Home',
  'nav.articles': 'Articles',
  'nav.issues': 'Issues',
  'nav.team': 'Team',
  'nav.about': 'About',
  'nav.menu': 'Menu',
  'lang.label': 'Language',
  'lang.choose': 'Choose a language',

  // ── machine-translation notice ──────────────────────────────────────────
  'mt.notice':
    'This page was translated automatically. The English original is the definitive version.',
  'mt.viewEnglish': 'Read in English',

  // ── footer ──────────────────────────────────────────────────────────────
  'footer.aria': 'Footer',
  'footer.blurb':
    'A student publication from the TUJ Cyber Shield Club: plain-language digital safety for everyday students, one issue a month.',
  'footer.explore': 'Explore',
  'footer.getInvolved': 'Get involved',
  'footer.meetTeam': 'Meet the team',
  'footer.aboutClub': 'About the club',
  'footer.copyright': '© {year} TUJ Cyber Shield Club',
  'footer.byStudents': 'Written by students, for students',
  'footer.end': 'End of transmission',

  // ── home ────────────────────────────────────────────────────────────────
  'home.title': 'Cyber Shield: digital safety, in plain language',
  'home.description':
    "Monthly, plain-language security advice from TUJ's Cyber Shield Club: phishing, passwords, scams, and privacy explained for everyday students.",
  'home.kick': 'A TUJ student publication',
  'home.h1.a': 'Digital safety,',
  'home.h1.b': 'in plain language.',
  'home.lede':
    'Every month, Cyber Shield students research the scams, leaks, and tricks aimed at people like us, then explain exactly what to do about them. No jargon, no fear, no tech degree required.',
  'home.cta.latest': 'Read the latest issue',
  'home.cta.about': 'About the club',
  'home.crest.monthly': 'Monthly',
  'home.crest.plain': 'Plain language',
  'home.crest.student': 'Student run',
  'home.ledger.briefings': 'briefings filed',
  'home.ledger.issues_one': 'issue published',
  'home.ledger.issues_other': 'issues published',
  'home.ledger.topics': 'topics covered',
  'home.ledger.cadence': 'issue a month',
  'home.latestIssue': 'The {issue} issue',
  'home.everything': 'Everything in this issue',
  'home.archive': 'From the archive',
  'home.closing.h': 'Browse the archive',
  'home.closing.body': 'Every briefing is filed by topic. Pick the one that worries you most and start there.',
  'home.browseAll': 'Browse all articles',
  'home.issueArchive': 'Issue archive',

  // ── article list / search / filters ─────────────────────────────────────
  'articles.title': 'All articles · Cyber Shield',
  'articles.description':
    'Every Cyber Shield article on staying safe online: phishing, passwords, scams, privacy and more, newest first.',
  'articles.kick': 'The archive · complete index',
  'articles.h1': 'All articles',
  'articles.count_one': 'briefing',
  'articles.count_other': 'briefings',
  'articles.newestFirst': 'Newest to oldest',
  'articles.filters': 'Search and filter articles',
  'articles.filterTopic': 'Filter by topic',
  'articles.filterTag.aria': 'Filter by tag',
  'articles.filterMonth': 'Filter by month',
  'articles.allDates': 'All dates',
  'articles.all': 'all',
  'articles.empty': 'No articles for that month yet.',
  'articles.status_one': '{count} article from {label}.',
  'articles.status_other': '{count} articles from {label}.',
  'search.kick': 'Search the archive',
  'search.placeholder': 'Search articles, e.g. “phishing” or “passwords”',

  // ── article card / article page ─────────────────────────────────────────
  'cover.issue': 'Issue {number}',
  'card.coverStory': 'Cover story',
  'card.vol': 'Vol. {issue}',
  'card.minRead': '{count} min read',
  'card.read': 'Read briefing',
  'card.draft': 'Draft preview',
  'article.tags': 'Topics',

  // ── issues ──────────────────────────────────────────────────────────────
  'article.issueLink': '{issue} issue',
  'theme.switch': 'Switch between dark and light theme',
  'issues.title': 'Issue archive · Cyber Shield',
  'issues.description':
    'Every monthly issue of Cyber Shield, newest first: the full archive of student-written digital safety briefings.',
  'issues.kick': 'Bound volumes',
  'issues.h1': 'Issue archive',
  'issues.issueTitle': '{issue} issue · Cyber Shield',

  // ── tags ────────────────────────────────────────────────────────────────
  'issues.intro': 'Cyber Shield publishes one issue a month. Here is every issue so far, newest first.',
  'issues.articles_one': 'article',
  'issues.articles_other': 'articles',
  'issues.issueDescription': "All {count} articles from the {label} issue of Cyber Shield, TUJ's plain-language digital safety newsletter.",
  'issues.issueLead': 'Cyber Shield · Issue {issue}',
  'issues.issueH1': 'The {label} issue',
  'issues.byMembers': 'Researched, written, and edited by club members',
  'issues.allIssues': 'All issues',
  'tags.title': 'Articles tagged “{tag}” · Cyber Shield',
  'tags.description':
    'All Cyber Shield articles about {tag}: practical, plain-language advice for students.',
  'tags.kick': 'Topic file',
  'tags.onTopic_one': 'article on this topic',
  'tags.onTopic_other': 'articles on this topic',

  // ── team ────────────────────────────────────────────────────────────────
  'team.title': 'Meet the team · Cyber Shield',
  'team.description':
    "The students behind Cyber Shield: the writers, editors, and organizers who research and publish TUJ's monthly digital-safety newsletter.",
  'team.kick': 'The people behind the publication',
  'team.h1': 'Meet the team',
  'team.lede':
    "Cyber Shield is written and edited entirely by students. Here's who researches the threats, writes the guides, and keeps each issue on schedule.",
  'team.more': 'Full bio',
  'team.readMore': 'Read more about {name}',
  'team.viewPhoto': 'View a larger photo of {name}',
  'team.close': 'Close',
  'team.seeArticles': 'See my articles',
  'team.photoOf': 'Photo of {name}',
  'social.links': 'Links',
  'team.links': "{name}'s links",
  'team.emailPerson': 'Email {name}',
  'team.personOn': '{name} on {platform}',

  // ── join panel (team + about) ───────────────────────────────────────────
  'join.kick': 'Want to join?',
  'join.h': "There's room for you on this team.",
  'join.body':
    'No experience needed, just curiosity and a willingness to help people stay safe online. Writers, researchers, editors, and organizers all welcome.',
  'join.cta': 'Join here',

  // ── about ───────────────────────────────────────────────────────────────
  'about.title': 'About the club · Cyber Shield',
  'about.description':
    "What the TUJ Cyber Shield Club does, who it's for, and how to join: research, writing, and plain-language digital safety for students.",
  'about.kick': 'About the club',
  'about.h1.a': 'Security research,',
  'about.h1.b': 'translated for everyone.',
  'about.crestLabel': 'Club crest',
  'about.crestName': 'TUJ Cyber Shield',
  'about.crestAlt':
    'The full TUJ Cyber Shield Club crest: an owl holding a padlock on a teal shield above the club wordmark',
  'about.safety': 'Digital safety',
  'about.noJargon': 'No jargon',
  'about.p1':
    'Cyber Shield aims to cultivate a community of students passionate about digital safety and cybersecurity awareness. We provide an inclusive space for researching modern threats, analyzing real-world vulnerabilities, and translating complex security topics into accessible, actionable advice. Through collaborative research, guest speakers, and our monthly publications, members help everyday students harden their digital lives without needing a technical background.',
  'about.p2':
    'Our activities welcome all skill levels and backgrounds, though we are always excited to connect with students who have a passion for deep technical research or a talent for writing and communication, fostering a culture of curiosity, critical thinking, and community-driven protection.',
  'about.doH': 'What members actually do',
  'about.do1L': 'Research:',
  'about.do1': 'track current scams, breaches, and threats affecting students.',
  'about.do2L': 'Write:',
  'about.do2': 'turn that research into short, jargon-free monthly articles.',
  'about.do3L': 'Edit:',
  'about.do3': 'every article is peer-reviewed for accuracy and readability.',
  'about.do4L': 'Learn:',
  'about.do4': 'guest speakers and workshops, open to every skill level.',
  'about.joinH': 'How to join',

  // ── 404 ─────────────────────────────────────────────────────────────────
  'about.joinP1a': "We'd love to have you. No application, no experience needed. Curiosity is the only requirement. Follow us on Instagram at ",
  'about.joinP1b': " for updates, and when you're ready to sign up, use the form below.",
  'about.readFirstA': 'Prefer to start by reading? ',
  'about.readFirstBrowse': 'Browse our articles',
  'about.readFirstOr': ' or ',
  'about.readFirstTeam': 'meet the team',
  'about.devKick': 'Behind the site',
  'about.devH2': 'The developer',
  'about.devPhotoAlt': 'Photo of Carl Masters',
  'about.devP1a': 'This site was designed and built by ',
  'about.devP1b':
    ', a cybersecurity student at TUJ and founder of the Cyber Shield Club. The site was built to be fast, accessible, and simple enough that any club member can publish an article without writing a line of code.',
  'about.devP2a': 'If you have any questions about the website or would like to report any issues, please reach out at ',
  'article.endTransmission': 'End of transmission',
  'article.moreFrom': 'More from the {issue} issue',
  'article.navAria': 'Article navigation',
  'article.older': 'Older',
  'article.newer': 'Newer',
  'notFound.title': 'Page not found · Cyber Shield',
  'notFound.description':
    "That page doesn't exist. Head back to the Cyber Shield home page or browse all articles.",
  'notFound.kick': '404 · signal lost',
  'notFound.h1': "This page doesn't exist.",
  'notFound.body':
    "The link may be old, or the address may have a typo. (If someone sent you here, that's worth a healthy dose of suspicion. We teach a whole article on that.)",
  'notFound.home': 'Back to the home page',
  'notFound.browse': 'Browse articles',

  // ── demo notice ─────────────────────────────────────────────────────────
  'demo.aria': 'Demo content notice',
  'search.noJs': 'Search needs JavaScript. No problem, every article is listed below.',
  'search.buildOnly': 'Search will be available on the published site (the index is generated at build time).',
  'tag.accounts': 'accounts',
  'tag.email': 'email',
  'tag.passkeys': 'passkeys',
  'tag.passwords': 'passwords',
  'tag.phishing': 'phishing',
  'tag.phones': 'phones',
  'tag.qr-codes': 'qr codes',
  'tag.scams': 'scams',
  'tag.wifi': 'wifi',
  'tag.privacy': 'privacy',
  'demo.badge': 'Demo',
  'demo.list': 'The articles shown here are demo templates, not real Cyber Shield publications yet.',
  'demo.article':
    'This is a demo article: a sample template that shows the layout and voice of the site, not a real Cyber Shield publication.',
  'demo.issue':
    'This is a demo issue: the articles below are sample templates, not real Cyber Shield publications.',
} satisfies Record<string, string>;

/** Every key the site can ask for. Derived from `en`, so it can't drift. */
export type UIKey = keyof typeof en;

/** A fully translated locale must supply every key, or the build fails. */
export type Dictionary = Record<UIKey, string>;
