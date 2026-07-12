import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD || 'changeme';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'homepage-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 30
  }
}));

app.get('/login', (req, res) => {
  if (req.session.authenticated) {
    return res.redirect('/');
  }

  res.type('html').send(`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Tim Bensberg | Login</title>
      <style>
        :root { color-scheme: light; }
        body { font-family: Inter, Arial, sans-serif; margin: 0; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); min-height: 100vh; display: grid; place-items: center; color: #0f172a; }
        .card { background: white; padding: 28px; border-radius: 24px; box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12); width: min(92vw, 430px); }
        .hero { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
        .avatar { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 3px solid #e2e8f0; }
        h2 { margin: 0 0 6px; font-size: 1.4rem; }
        p { margin: 0 0 12px; color: #475569; line-height: 1.5; }
        label { display: block; font-weight: 600; margin-bottom: 6px; }
        input { width: 100%; padding: 11px 12px; margin: 0 0 12px; border: 1px solid #cbd5e1; border-radius: 10px; box-sizing: border-box; }
        button { width: 100%; padding: 12px; border: none; border-radius: 999px; background: linear-gradient(90deg, #0f172a, #334155); color: white; cursor: pointer; font-weight: 600; }
        .hint { margin-top: 12px; font-size: 0.9rem; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="hero">
          <img class="avatar" src="1654151182770.jpg" alt="Tim Bensberg" />
          <div>
            <h2>Tim Bensberg</h2>
            <p>Die kleine Homepage von Tim Bensberg.</p>
          </div>
        </div>
        <p>Alle Inhalte erscheinen erst nach erfolgreicher Anmeldung.</p>
        <form method="post" action="/login">
          <label for="password">Passwort</label>
          <input id="password" name="password" type="password" required autocomplete="current-password" />
          <button type="submit">Anmelden</button>
        </form>
        <div class="hint">Die Sitzung läuft nach 30 Minuten Inaktivität automatisch aus.</div>
      </div>
    </body>
  </html>`);
});

app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    req.session.authenticated = true;
    return res.redirect('/');
  }
  return res.redirect('/login?error=1');
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

const isProd = process.argv.includes('--prod');
const isPublicRequest = (reqPath) => {
  return (
    reqPath === '/login' ||
    reqPath.startsWith('/robots.txt') ||
    reqPath.startsWith('/agent.txt') ||
    reqPath.startsWith('/src/') ||
    reqPath.startsWith('/@vite') ||
    reqPath.startsWith('/node_modules/') ||
    reqPath.startsWith('/assets/') ||
    reqPath.startsWith('/1654151182770.jpg') ||
    /\.(png|jpe?g|gif|svg|webp|ico|txt|json|css|js|map|woff2?)$/i.test(reqPath)
  );
};

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.session.authenticated && !isPublicRequest(req.path) && req.path !== '/login') {
    return res.redirect('/login');
  }
  next();
});

if (isProd) {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    if (req.path.startsWith('/assets') || req.path.startsWith('/src') || req.path.startsWith('/images') || req.path.startsWith('/')) {
      return res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);
  app.get('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const template = await vite.transformIndexHtml(url, `<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      next(e);
    }
  });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
