import { ImageResponse } from "next/og";

export const alt = "UTN FRM MCP: tu facultad, dentro de tu IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const rings = [120, 200, 280, 360, 440, 520, 600];

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        color: "#f4ecdd",
        background: "linear-gradient(135deg, #12060e 0%, #1b0914 55%, #431832 140%)",
        fontFamily: "sans-serif",
      }}
    >
      {rings.map((r, i) => (
        <div
          key={r}
          style={{
            position: "absolute",
            right: -r / 2 + 40,
            top: 40 - r / 3,
            width: r * 1.5,
            height: r * 1.2,
            borderRadius: "50%",
            border: `${i % 3 === 0 ? 2 : 1}px solid rgba(242,180,65,${i % 3 === 0 ? 0.5 : 0.22})`,
            display: "flex",
          }}
        />
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
        <svg width="50" height="50" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="8" fill="#1d0a17" stroke="#f2b441" strokeOpacity="0.4" />
          <circle cx="16" cy="13.2" r="9" fill="#f2b441" />
          <path d="M4.2 27 10.4 10.6 16 19.6 21.6 10.6 27.8 27Z" fill="#1d0a17" />
          <path d="M4.9 26.2 10.4 11.4 16 20.4 21.6 11.4 27.1 26.2" fill="none" stroke="#f4ecdd" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        UTN FRM MCP
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 700, lineHeight: 0.98, letterSpacing: -4 }}>
        <div style={{ display: "flex" }}>Tu facultad,</div>
        <div style={{ display: "flex", color: "#f2b441" }}>dentro de tu IA.</div>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#b9a9ae", letterSpacing: 3 }}>
        32°53′ S · 68°50′ O · MENDOZA, ARGENTINA
      </div>
    </div>,
    { ...size },
  );
}
