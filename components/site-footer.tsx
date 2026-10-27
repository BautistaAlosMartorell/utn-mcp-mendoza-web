import Link from "next/link";
import { LogoMark } from "./logo";
import { product } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <div className="ftr-brand">
          <Link href="/" className="brand" aria-label="UTN FRM MCP, inicio">
            <LogoMark size={26} />
            <span>UTN FRM <i>MCP</i></span>
          </Link>
          <p>El Campus, Autogestión y el correo de la UTN Facultad Regional Mendoza, dentro de tu asistente de IA.</p>
        </div>
        <nav className="ftr-cols" aria-label="Pie">
          <div>
            <h2>Producto</h2>
            <Link href="/#que-hace">Qué hace</Link>
            <Link href="/#como-funciona">Cómo funciona</Link>
            <Link href="/#control">Seguridad</Link>
          </div>
          <div>
            <h2>Empezar</h2>
            <Link href="/#empezar">Instalación</Link>
            <Link href="/docs">Guía completa</Link>
            <Link href="/docs#problemas">Solución de problemas</Link>
          </div>
          <div>
            <h2>Proyecto</h2>
            <a href={product.repo} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={product.release} target="_blank" rel="noreferrer">Release v{product.version} ↗</a>
            <a href={product.issues} target="_blank" rel="noreferrer">Reportar un problema ↗</a>
            <a href={product.security} target="_blank" rel="noreferrer">Seguridad ↗</a>
          </div>
        </nav>
      </div>
      <p className="ftr-giant" aria-hidden="true">UTN FRM <em>MCP</em></p>
      <div className="wrap ftr-legal">
        <p>
          Proyecto independiente y no oficial, sin afiliación ni aval de la Universidad Tecnológica Nacional. Licencia MIT.
        </p>
        <p>Hecho en Mendoza, Argentina.</p>
      </div>
    </footer>
  );
}
