# Resume site: resume.bishcleanup.com

Styled to match bishcleanup.com (Archivo + Source Sans 3, forest green #1f7a4d, Bish Cleanup logo).

- `public/index.html`: the interactive resume website.
- `public/one-page.html`: the 1-page print layout used for the PDF.
- `build-pdf.js`: builds `public/Bob_Bishop_Resume.pdf` from `one-page.html` (`node build-pdf.js`, needs Playwright). Fails if the content no longer fits on one page.
- `worker.js` + `wrangler.jsonc`: Cloudflare Worker `bishcleanup-resume` serving the files on resume.bishcleanup.com.

To update: edit the HTML, run `node build-pdf.js`, then `npx wrangler deploy` from this folder.
