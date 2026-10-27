/**
 * Marca: el sol de Mendoza saliendo detrás de una cresta andina que dibuja una "M"
 * (Mendoza, MCP). Una sola idea, legible desde 16 px: disco dorado, montaña llena y trazo de cresta.
 */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="logo-mark">
      <rect width="32" height="32" rx="8" fill="#1d0a17" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="none" stroke="#f2b441" strokeOpacity=".28" />
      <circle cx="16" cy="13.2" r="9" fill="#f2b441" />
      <path d="M4.2 27 10.4 10.6 16 19.6 21.6 10.6 27.8 27Z" fill="#1d0a17" />
      <path
        d="M4.9 26.2 10.4 11.4 16 20.4 21.6 11.4 27.1 26.2"
        fill="none"
        stroke="#f4ecdd"
        strokeWidth="2.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
