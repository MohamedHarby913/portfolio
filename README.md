# Mohamed Harby — Portfolio

Static site for Firebase Hosting. No build step.

## Deploy to Firebase

1. Install the CLI once: `npm install -g firebase-tools`, then `firebase login`.
2. In this folder, link your project: `firebase use --add` and pick your Firebase project.
3. Deploy: `firebase deploy --only hosting`.

The site lives in `public/`. `firebase.json` turns on clean URLs, so `project.html?p=cybee-plus` is served as `/project?p=cybee-plus`.

## Files (inside public/)

- `index.html` — home page
- `project.html` + `project.js` — one template that renders every project page from `content.js`
- `content.js` — ALL content: projects, Cybee+, experience, certificates, skills, awards
- `app.js` — home page behaviour (filters, pop-ups, animations)
- `art.js` — project artwork shared by both pages
- `styles.css` — all styles
- `assets/images/` — photos (hackathon)
- `assets/certificates/` — certificate images for the pop-ups

## Common edits (all in content.js)

**GitHub links:** each project has a `"repos"` list, for example
`"repos": [{ "url": "https://github.com/MohamedHarby913/OscarsDatabase", "label": "" }]`.
Add more than one for multi-repo projects (Process Controller has two). A project with no `repos` shows no source-code section.

**Cybee+ video:** in `featured`, set `"video": "https://youtu.be/XXXXXXXXXXX"`. Any YouTube link format works. Until then the page shows a "coming soon" frame.

**Self-hosted videos:** set `"localVideo"` (and optionally `"videoPoster"`) to files in `public/assets/videos/`, like the WHO project.

**Project figures:** add `"figures": [{ "src": "assets/images/....png", "caption": "..." }]` to show diagrams on a project page, like Network Build.

**Certificates:** images live in `public/assets/certificates/`. Each entry has `"file"` (or a list of files, like Red Hat I & II) and an optional `"verify"` link shown as "Verify with issuer".

**Add a project:** copy any entry in `projects`, give it a new unique `slug`, and edit the text. Its page appears automatically at `project.html?p=<slug>`.

## After your first deploy: finish the link preview

LinkedIn, WhatsApp and X need the preview image as a full URL. Once you know your site address (for example `https://mohamed-harby.web.app` or your own domain), replace `assets/images/og-image.jpg` with the full URL in the `og:image` and `twitter:image` tags of `public/index.html` and `public/project.html`:

    sed -i 's#content="assets/images/og-image.jpg"#content="https://YOUR-SITE/assets/images/og-image.jpg"#' public/index.html public/project.html

Then paste your link into https://www.linkedin.com/post-inspector/ to refresh LinkedIn's cached preview.

## Swapping your CV

Replace `public/assets/cv/Mohamed-Harby-CV.pdf` with a new PDF of the same name. Every CV button opens it in a new tab.

## Fonts

Fonts are bundled in `public/assets/fonts/` (SIL Open Font License, licence files included), so the site never depends on Google Fonts.
