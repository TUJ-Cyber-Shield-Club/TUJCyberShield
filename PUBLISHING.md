# How to publish an article (no coding required)

This guide walks you through publishing a Cyber Shield article using **only the GitHub website**. No terminal, no software to install. Total time: about 10 minutes. The site updates itself roughly **2 minutes** after you finish.

> Ask a club officer to add your GitHub account to the club organization first — you need write access to this repository.

## Step 1 — Open the articles folder

1. Go to this repository on github.com.
2. Click through the folders: **`src` → `content` → `articles`**.

You'll see one `.md` file per article, named like `2026-07-qr-code-scams-on-campus.md`.

## Step 2 — Copy the template

1. In that folder, click **`_TEMPLATE.md`**.
2. Click the **copy icon** (two overlapping squares, top-right of the file view) to copy the whole file's contents.

## Step 3 — Create your article file

1. Go **back to the `articles` folder**.
2. Click **Add file → Create new file** (top right).
3. Name the file: `YYYY-MM-a-short-slug.md`
   - `YYYY-MM` = the issue month, e.g. `2026-09`
   - the slug = 3–6 lowercase words joined by hyphens, e.g. `2026-09-fake-shopping-apps.md`
   - the name becomes the article's web address, so keep it short and readable
4. Paste the template into the big text box.

## Step 4 — Fill in the frontmatter

The "frontmatter" is everything between the two `---` lines at the top. It's the article's ID card. Every field explained:

| Field | What it is | Example |
|-------|-----------|---------|
| `title` | The headline readers see. Keep under ~70 characters. | `"That QR code might be a trap"` |
| `description` | One-sentence summary, **160 characters max**. Appears on article cards, Google results, and link previews. | `"QR scams are hitting campuses. Here's how to scan safely."` |
| `pubDate` | Publication date, `YYYY-MM-DD`. No quotes. | `2026-09-01` |
| `authors` | Everyone who wrote it. Names in quotes, inside square brackets. | `["Aiko Tanaka", "Marcus Bell"]` |
| `tags` | Lowercase topic labels. Reuse existing ones when possible: `phishing`, `passwords`, `scams`, `privacy`, `social-media`, `email`, `phones`, `wifi`, `accounts`, `qr-codes`. | `["scams", "phones"]` |
| `issue` | The monthly issue it belongs to, `"YYYY-MM"` in quotes. Articles with the same issue are grouped together on the site. | `"2026-09"` |
| `coverImage` | *(optional)* A cover picture — see "Adding a cover image" below. | `../../assets/my-cover.jpg` |
| `coverAlt` | A one-line description of the cover image for blind and low-vision readers. **Required if you use `coverImage`.** | `"A hand scanning a QR code on a flyer"` |
| `draft` | `true` = hidden from the live site. `false` = published. Start with `true` if you're still writing. | `false` |

Then delete all the lines starting with `#` (those are instructions, not content) and write your article below the second `---` using the formatting examples the template shows (headings, lists, bold, quotes).

**Don't worry about breaking the site.** If a required field is missing or wrong (say, a description that's 200 characters), the build simply refuses to publish and the live site stays as it was. Fixing the field fixes everything.

## Step 5 — Commit (publish!)

1. Click the green **Commit changes...** button (top right).
2. In "Commit message," write something like `Add September article on fake shopping apps`.
3. Keep **"Commit directly to the `main` branch"** selected.
4. Click **Commit changes**.

That's it. GitHub Actions now builds and deploys the site automatically. After ~2 minutes, refresh the live site and your article is up — on the home page, the articles list, its issue page, its tags, the RSS feed, and in search.

You can watch the progress under the repository's **Actions** tab: a yellow dot means building, a green check means live. A red X means the build rejected something — click into it, read the error (it names the file and field), edit your file on GitHub, and commit again.

## Adding a cover image

1. Prepare a JPG or PNG, ideally at least 1400 px wide and under ~1 MB.
2. In the repository, go to **`src` → `assets`**.
3. Click **Add file → Upload files**, drag your image in, and commit it (e.g. `fake-apps-cover.jpg`).
4. In your article's frontmatter, add:

```yaml
coverImage: ../../assets/fake-apps-cover.jpg
coverAlt: "Describe what's in the picture in one sentence"
```

The site automatically resizes and optimizes it for every screen.

## Working on drafts

Set `draft: true` and commit as often as you like — the article stays completely off the live site (no page, no search result, no RSS entry). When the editorial team gives the OK, edit the file on GitHub, flip it to `draft: false`, and commit. That single change publishes it.

## Fixing a typo in a published article

1. Navigate to the article's `.md` file in `src/content/articles/`.
2. Click the **pencil icon** (top right of the file view).
3. Make your edit, then **Commit changes** to `main`.

The corrected version is live about 2 minutes later.
