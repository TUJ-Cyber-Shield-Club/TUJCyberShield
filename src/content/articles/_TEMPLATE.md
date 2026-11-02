---
# ── Cyber Shield article template ─────────────────────────────────────────────
# 1. Copy this whole file.
# 2. Create a new file named:  YYYY-MM-a-short-slug.md   (e.g. 2026-09-fake-apps.md)
# 3. Paste, fill in every field, delete the comment lines (starting with #).
# The site build checks these fields and will refuse to publish if one is wrong.

# The headline. Keep it under ~70 characters. (required)
title: "Your headline here"

# One or two sentences, MAX 160 characters. Shows up on article cards,
# search engines, and social previews. (required)
description: "One-sentence summary of the article, 160 characters or fewer."

# The description is also shown under the headline on the article page.
# If it isn't the author's own words (say, a card summary written by an
# editor), set this to false and it will only appear on cards and in search.
# (optional, defaults to true)
# showDescription: false

# Publication date, YYYY-MM-DD. (required)
pubDate: 2026-09-01

# Who wrote it. One or more names, in quotes, inside the brackets. (required)
authors: ["Your Name", "Co-Author Name"]

# Topic tags, lowercase. Reuse existing tags when possible:
# phishing, passwords, scams, privacy, social-engineering, networking, email,
# phones, wifi, accounts, qr-codes
tags: ["phishing", "email"]

# Which monthly issue this belongs to, as "YYYY-MM". (required)
issue: "2026-09"

# OPTIONAL cover image. Without one, the site draws a cover from your tags and
# issue automatically. To use your own, put the file in  src/assets/  first,
# point to it with a relative path (three ../ from articles/en/), and describe
# it in coverAlt (required if you use coverImage).
# coverImage: ../../../assets/my-cover.jpg
# coverAlt: "A student scanning a QR code on a flyer"

# OPTIONAL: true makes this the issue's cover story on the home page and the
# issue page. Use it on one article per issue; otherwise the newest one leads.
# featured: true

# OPTIONAL: this article's position within its issue (1 = first) on the home
# page, article list and issue page. Unnumbered articles follow, newest first.
# order: 2

# Keep true while writing; the article stays off the live site.
# Change to false when it's ready to publish.
draft: true
---

Your opening paragraph goes here. Write like you're explaining to a smart
friend who doesn't study computers: short sentences, concrete examples,
no unexplained jargon.

## Section headings look like this

Regular paragraphs are just text with a blank line between them. **Bold**
for emphasis, *italics* for titles or light stress.

- Bullet lists use hyphens
- Keep each point to one or two lines

1. Numbered lists work too
2. Great for step-by-step instructions

> Indented quotes look like this. Good for "here's what the scam email said."

End with something actionable: what should the reader do today?

## Sources

1. A heading named "Sources" or "References" turns everything below it into
   the article's reference list, styled smaller at the end of the page.
2. Paste full links (https://...) and they become clickable, shown as just the
   site's name (e.g. cisa.gov).
