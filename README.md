# UTN FRM MCP — sitio de producto

Sitio independiente en Next.js App Router para presentar UTN FRM MCP y ayudar a conectar el servidor local con distintos asistentes compatibles con MCP. No pertenece a la Universidad Tecnológica Nacional.

## Requisitos

- Node.js 22.13 o posterior.
- npm.

## Ejecutar localmente

```powershell
cd "C:\Users\bauti\Downloads\Diagnostico_MCP_UTN_Mendoza_Windows\utn-mcp-mendoza-web"
npm install
npm run dev
```

Abrí http://localhost:3000. Para generar una compilación de producción:

```powershell
npm run lint
npm run typecheck
npm run build
npm start
```

## Contenido

- `/` presenta el valor del producto, ejemplos de uso, la conexión local, guías rápidas por cliente de IA, privacidad y preguntas frecuentes.
- `/docs` explica los requisitos, la instalación desde código fuente, clientes MCP, herramientas disponibles, privacidad y solución de problemas.
- `app/page.tsx` define la página de producto; `components/hero-demo.tsx` es la conversación de ejemplo del hero y `components/install.tsx` el selector de cliente y sistema.

La información del servidor se tomó del README disponible en el repositorio MCP local. No hay URL pública de descarga ni publicación npm verificadas, así que la guía describe una instalación desde el código fuente sin inventar enlaces.

Para generar metadatos Open Graph con el dominio definitivo, configurá `NEXT_PUBLIC_SITE_URL` con el origen HTTPS de publicación. En Vercel también se usa `VERCEL_URL`; localmente el fallback es `http://localhost:3000`.

## Rendimiento y seguridad

- **Todo estático**: las páginas se prerenderizan y se pueden servir desde un CDN. Sin pedidos a terceros: las fuentes (Fraunces, Geist y Geist Mono, licencia OFL en `app/fonts/`) están autoalojadas y precargadas.
- **Fondo animado liviano** (`components/terrain.tsx`): sin asignaciones por cuadro, 24 a 40 FPS según el dispositivo, resolución reducida en móviles, pausa fuera de pantalla o con la pestaña oculta, y un solo cuadro estático con "reducir movimiento" o ahorro de datos.
- **Cabeceras** en `next.config.ts`: CSP (sin terceros, sin `eval`, sin frames, `object-src none`, `connect-src self`), HSTS en producción, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y COOP. Los scripts propios llevan SRI.
- **Decisión sobre `script-src unsafe-inline`**: Next inyecta scripts en línea para hidratar y sin ellos la página queda muerta (se comprobó). Es aceptable acá porque el sitio es estático, sin cookies, cuentas ni formularios, sin contenido de terceros, sin `dangerouslySetInnerHTML` y sin ninguna entrada del usuario que llegue al DOM como HTML. Aun con un script inyectado, `connect-src`, `img-src`, `form-action` y `base-uri` impedirían sacar datos hacia otro origen, y no hay secretos que robar. Alternativas descartadas: nonces (obligan a renderizar cada pedido en el servidor y rompen el caché de CDN y `cacheComponents`) y hashes (cada página trae entre 11 y 23 scripts en línea que llevan sus propios datos, así que habría que recalcular y publicar los hashes de cada ruta tras cada cambio de contenido, y cualquier script que inyecte el hosting los rompería). **Si el sitio llega a tener cuentas, formularios, contenido generado por usuarios o scripts de terceros, hay que pasar a nonces.**
- - Dependencias mínimas (`npm audit`: 0 vulnerabilidades).

## Íconos

`app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` y `public/icons/*` (manifiesto) salen del mismo trazo. Para regenerarlos hay que volver a renderizar el SVG a PNG/ICO; Next los enlaza solo desde los metadatos.

## Contenido y fuente de verdad

Todo lo que la web afirma sale de `lib/content.ts`, que refleja el README y la release v2.0.0 de https://github.com/BautistaAlosMartorell/utnfrm-mcp (beta de solo lectura, Windows, probada con Codex, sin paquete en npm). Al publicar una versión nueva hay que actualizar `product` (versión, enlaces y SHA-256) y revisar los comandos, los clientes y las preguntas frecuentes.
