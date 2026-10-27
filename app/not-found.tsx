import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { IconArrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="nf">
        <p className="nf-n" aria-hidden="true">404</p>
        <div className="wrap nf-in">
          <p className="eyebrow">Fuera de mapa</p>
          <h1>
            Esta ruta no <em>existe.</em>
          </h1>
          <p>El enlace puede estar mal escrito o la página se movió. Volvé al inicio y retomá el camino.</p>
          <div className="cta-row">
            <Link href="/" className="btn btn-sol">
              Ir al inicio <IconArrow />
            </Link>
            <Link href="/docs" className="btn btn-line">Ver la guía</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
