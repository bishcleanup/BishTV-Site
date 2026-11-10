# Resume site: resume.bishcleanup.com

Styled to match the Bish Cleanup app at bishcleanup.com: Bricolage Grotesque + Figtree, emerald #047857 with lime #ccff00, star mark, light/dark toggle.

- `public/index.html`: the interactive resume website.
- `public/one-page.html`: the 1-page print layout used for the PDF.
- `build-pdf.js`: builds `public/Bob_Bishop_Resume.pdf` from `one-page.html` (`node build-pdf.js`, needs Playwright). Fails if the content no longer fits on one page.
- `worker.js` + `wrangler.jsonc`: Cloudflare Worker `bishcleanup-resume` serving the files on resume.bishcleanup.com.

To update: edit the HTML, run `node build-pdf.js`, then `npx wrangler deploy` from this folder.
