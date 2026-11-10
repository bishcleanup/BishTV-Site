# Resume site: resume.bishcleanup.com

- `public/index.html`: the resume. It's interactive on screen, and its print styles produce the PDF.
- `public/one-page.html`: condensed 1-page print layout.
- `build-pdf.js`: regenerates both PDFs, `Bob_Bishop_Resume.pdf` (2 pages) and `Bob_Bishop_Resume_1page.pdf` (`node build-pdf.js`, needs Playwright). It warns if the 1-page version overflows.
- `worker.js` + `wrangler.jsonc`: Cloudflare Worker `bishcleanup-resume` serving the files on resume.bishcleanup.com.

To update: edit `public/index.html` and/or `public/one-page.html`, run `node build-pdf.js`, then `npx wrangler deploy` from this folder.
