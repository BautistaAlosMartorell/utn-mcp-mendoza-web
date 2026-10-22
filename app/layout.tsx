import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://utnmcp.com.ar"),
  title: {
    default: "UTN FRM MCP — El Campus, en contexto",
    template: "%s | UTN FRM MCP",
  },
  description:
    "Proyecto independiente que conecta el Campus Virtual UTN FRM con clientes de IA compatibles mediante un servidor MCP local.",
  applicationName: "UTN FRM MCP",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "UTN FRM MCP",
    title: "UTN FRM MCP — El Campus, en contexto",
    description:
      "Un puente local entre el Campus Virtual de UTN Mendoza y clientes de IA compatibles. Conocé su alcance y límites actuales.",
  },
  twitter: {
    card: "summary_large_image",
    title: "UTN FRM MCP — El Campus, en contexto",
    description:
      "Un servidor MCP local para consultar el Campus Virtual de UTN Mendoza.",
  },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
