import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/** Fuentes autoalojadas: cero pedidos a terceros, precargadas y con fallback de métricas ajustadas. */
const serif = localFont({
  src: [
    { path: "./fonts/fraunces-latin-opsz-normal.woff2", style: "normal", weight: "100 900" },
    { path: "./fonts/fraunces-latin-opsz-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "serif"],
});
const sans = localFont({
  src: "./fonts/geist-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["system-ui", "sans-serif"],
});
const mono = localFont({
  src: "./fonts/geist-mono-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-mono",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial",
  fallback: ["ui-monospace", "Consolas", "monospace"],
});

const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const title = "UTN FRM MCP: tu facultad, dentro de tu IA";
const description =
  "Servidor MCP local e independiente que conecta tu asistente de IA con el Campus Virtual, Autogestión y el correo de la UTN Facultad Regional Mendoza, con tu propia cuenta. Solo lectura en el Campus y en Autogestión.";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: title, template: "%s | UTN FRM MCP" },
  description,
  applicationName: "UTN FRM MCP",
  keywords: ["UTN FRM", "Campus Virtual", "Autogestión", "Sysacad", "MCP", "Model Context Protocol", "Mendoza", "asistente de IA"],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: { type: "website", locale: "es_AR", siteName: "UTN FRM MCP", title, description },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: false, email: false, address: false },
  referrer: "strict-origin-when-cross-origin",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#12060e",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
