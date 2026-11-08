import React from "react";

/**
 * Dispositivo 3D-plano (catálogo B, M9) `[impl.]`: moldura com bezel + ecrã (children escalados) + reflexo, em perspetiva CSS (rotateY/rotateX), com glow do ecrã por trás.
 * Medidas: monitor 1500×900 (ecrã 1400×800, pé), tablet 1100×760, telemóvel 380×780. O original é 3D fotorreal; isto é a versão de kit.
 */
export const DeviceMock: React.FC<{ kind?: "monitor" | "tablet" | "phone"; x?: number; y?: number; scale?: number; rotateY?: number; rotateX?: number; screen?: { w: number; h: number }; glow?: string; children?: React.ReactNode }> = ({ kind = "monitor", x = 960, y = 540, scale = 1, rotateY = 0, rotateX = 0, screen, glow = "rgba(67,105,248,0.5)", children }) => {
  const dims = kind === "monitor" ? { w: 1500, h: 900, bezel: 24, r: 28 } : kind === "tablet" ? { w: 1100, h: 760, bezel: 30, r: 40 } : { w: 380, h: 780, bezel: 18, r: 56 };
  const sw = screen?.w ?? 1920, sh = screen?.h ?? 1080;
  const iw = dims.w - 2 * dims.bezel, ih = dims.h - 2 * dims.bezel;
  const s = Math.min(iw / sw, ih / sh);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, perspective: 2200, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: -dims.w / 2, top: -dims.h / 2, width: dims.w, height: dims.h, transform: `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, transformStyle: "preserve-3d", willChange: "transform" }}>
        <div style={{ position: "absolute", left: -120, top: -80, right: -120, bottom: -120, borderRadius: "50%", background: `radial-gradient(ellipse at center, ${glow} 0%, transparent 70%)`, filter: "blur(16px)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: dims.r, background: "linear-gradient(180deg, #14161c, #050608)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 30px 80px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: dims.bezel, top: dims.bezel, width: iw, height: ih, borderRadius: dims.r - dims.bezel * 0.6, overflow: "hidden", background: "#000" }}>
          <div style={{ position: "absolute", left: (iw - sw * s) / 2, top: (ih - sh * s) / 2, width: sw, height: sh, transform: `scale(${s})`, transformOrigin: "0 0" }}>{children}</div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, transparent 35%)" }} />
        </div>
        {kind === "monitor" ? <div style={{ position: "absolute", left: dims.w / 2 - 70, top: dims.h - 2, width: 140, height: 170, background: "linear-gradient(180deg, #1a1d26, #0a0b10)", borderRadius: "0 0 12px 12px" }} /> : null}
      </div>
    </div>
  );
};
