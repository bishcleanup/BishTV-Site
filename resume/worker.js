// Serves the resume site. Files are bundled into the Worker as modules.
import html from './public/index.html';
import pdf from './public/Bob_Bishop_Resume.pdf';
import mark from './public/bish-mark.png';
import logoLight from './public/bish-logo-light.png';
import vcf from './public/bob-bishop.vcf';
import robots from './public/robots.txt';

const FILES = {
  '/': [html, 'text/html; charset=utf-8'],
  '/index.html': [html, 'text/html; charset=utf-8'],
  '/Bob_Bishop_Resume.pdf': [pdf, 'application/pdf', 'inline; filename="Bob_Bishop_Resume.pdf"'],
  '/bish-mark.png': [mark, 'image/png'],
  '/bish-logo-light.png': [logoLight, 'image/png'],
  '/bob-bishop.vcf': [vcf, 'text/vcard; charset=utf-8', 'attachment; filename="bob-bishop.vcf"'],
  '/robots.txt': [robots, 'text/plain; charset=utf-8'],
};

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (pathname === '/Bob_Bishop_Resume_1page.pdf') return Response.redirect(new URL('/Bob_Bishop_Resume.pdf', request.url).toString(), 301);
    const f = FILES[pathname];
    if (!f) return Response.redirect(new URL('/', request.url).toString(), 302);
    const headers = { 'content-type': f[1], 'cache-control': 'public, max-age=300', 'x-content-type-options': 'nosniff' };
    if (f[2]) headers['content-disposition'] = f[2];
    return new Response(f[0], { headers });
  },
};
