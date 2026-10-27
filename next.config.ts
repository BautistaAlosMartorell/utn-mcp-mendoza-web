import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * CSP de una página estática: sin terceros, sin eval, sin objetos ni frames y con origen único.
 * Next inyecta scripts en línea para hidratar y prohibirlos deja la página sin interactividad, por eso
 * script-src admite 'unsafe-inline'. Es adecuado porque no hay cookies, cuentas, formularios ni entradas
 * del usuario que lleguen al DOM como HTML, y connect-src/img-src/form-action/base-uri siguen cerrados.
 * Un nonce obligaría a renderizar cada pedido (sin CDN ni cacheComponents). Si el sitio suma cuentas,
 * formularios o contenido de terceros, hay que migrar a nonces. Detalle en el README.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  `style-src 'self'${isDev ? " 'unsafe-inline'" : ""}`,
  "style-src-attr 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "manifest-src 'self'",
  "media-src 'none'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), autoplay=(), bluetooth=(), browsing-topics=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), hid=(), magnetometer=(), microphone=(), midi=(), payment=(), serial=(), usb=(), xr-spatial-tracking=()",
  },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]),
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  experimental: {
    sri: { algorithm: "sha256" },
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/icons/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
