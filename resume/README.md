# Resume site: resume.bishcleanup.com

- `public/index.html`: the resume. It's interactive on screen, and its print styles produce the PDF.
- `build-pdf.js`: regenerates `public/Bob_Bishop_Resume.pdf` (`node build-pdf.js`, needs Playwright).
- `worker.js` + `wrangler.jsonc`: Cloudflare Worker `bishcleanup-resume` serving the files on resume.bishcleanup.com.

To update: edit `public/index.html`, run `node build-pdf.js`, then `npx wrangler deploy` from this folder.
