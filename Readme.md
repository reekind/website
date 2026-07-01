# Persönliche Homepage

Dieses Projekt ist eine einfache persönliche Homepage im Stil eines Lebenslaufs.
Es verwendet React mit TypeScript und Vite.

## Inhalte
- Berufliches Profil
- Kompetenzen
- Berufserfahrung
- Ausbildung
- Sprachen
- Werte & Arbeitsweise
- Links zu GitHub und LinkedIn

## Entwicklung

Installiere Abhängigkeiten:

```bash
npm install
```

Starte die Entwicklungsumgebung:

```bash
npm run dev
```

## Produktion

Baue das Projekt:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

## Container / Podman

Dieses Repository liefert ein statisches Build, das in einem Container mit einem non-root Nginx-Image bereitgestellt wird.

Baue das Image mit Podman:

```bash
podman build -t homepage:local .
```

Wichtig: das verwendete Image `nginxinc/nginx-unprivileged` hört im Container auf Port `8080` (nicht `80`).
Mappe daher den Host-Port auf den Container-Port 8080. Beispiel (nur auf localhost):

```bash
podman rm -f homepage_local
podman run -d --name homepage_local -p 127.0.0.1:8080:8080 homepage:local
```

Prüfen:

```bash
curl.exe -I http://127.0.0.1:8080
```

Alternativ kannst du Docker verwenden; passe dabei das Port-Mapping an (Host:Container 8080:8080) oder ändere das Dockerfile, falls du Port 80 bevorzugst.

Öffne im Browser: http://127.0.0.1:8080
