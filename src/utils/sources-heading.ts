// Sätteri hast plugin for article Markdown: a top-level `## Sources` or
// `## References` heading gets class="sources-heading", and the stylesheet
// styles it and everything after it as the reference list (smaller type,
// hanging indents, long links that wrap; see .prose .sources-heading in
// src/styles/global.css). Writers only type the heading.

import type { HastNode, HastPluginDefinition } from 'satteri';

const SOURCES_HEADING = /^(sources|references|参考文献|出典)$/i;

export const sourcesHeading: HastPluginDefinition = {
  name: 'sources-heading',
  element: {
    filter: ['h2'],
    visit(node, ctx) {
      if (ctx.parent(node)?.type !== 'root') return;
      if (!SOURCES_HEADING.test(ctx.textContent(node).trim())) return;
      ctx.setProperty(node, 'className', ['sources-heading']);
    },
  },
};

// A full link pasted into the reference list shows as just its site name
// ("https://www.cisa.gov/..." reads "cisa.gov"), so long URLs don't swamp the
// citations. The link still goes to the full address. Links the writer already
// labelled themselves ([softbank.jp](https://...)) are left as written.
export const compactSourceLinks: HastPluginDefinition = {
  name: 'compact-source-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = String(node.properties?.href ?? '');
      if (!/^https?:\/\//.test(href) || ctx.textContent(node).trim() !== href) return;

      // Only inside the reference list: the link's top-level block must come
      // after the Sources / References heading.
      let block = node as Readonly<HastNode>;
      let parent = ctx.parent(block);
      while (parent && parent.type !== 'root') {
        block = parent;
        parent = ctx.parent(block);
      }
      const index = ctx.indexOf(block);
      if (!parent || index === undefined) return;
      const inSources = parent.children
        .slice(0, index)
        .some(
          (child) =>
            child.type === 'element' &&
            child.tagName === 'h2' &&
            SOURCES_HEADING.test(ctx.textContent(child).trim()),
        );
      if (!inSources) return;

      let site: string;
      try {
        site = new URL(href).hostname.replace(/^www\./, '');
      } catch {
        return;
      }
      for (let i = node.children.length - 1; i >= 0; i--) ctx.removeChildAt(node, i);
      ctx.appendChild(node, { type: 'text', value: site });
    },
  },
};

// Links to other sites (cited sources, mostly) open in a new tab, so a reader
// checking a citation doesn't lose their place in the article.
export const externalLinksNewTab: HastPluginDefinition = {
  name: 'external-links-new-tab',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      if (!/^https?:\/\//.test(String(node.properties?.href ?? ''))) return;
      ctx.setProperty(node, 'target', '_blank');
      ctx.setProperty(node, 'rel', 'noopener');
    },
  },
};
