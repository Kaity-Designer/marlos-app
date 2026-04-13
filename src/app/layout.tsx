import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marlos — Learn Your Way",
  description: "AI-powered personalised learning. Adaptive tutoring that understands how you think.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Marlos",
  },
  openGraph: {
    title: "Marlos",
    description: "AI-powered personalised learning",
    type: "website",
    url: "https://marlos.cloud",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0f0f10",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // iPhone 15 Pro logical dimensions
  // Screen: 393 × 852 pts. Frame adds ~22px each side + 14px top/bottom bezel
  const SCREEN_W = 393;
  const SCREEN_H = 852;
  const BEZEL_H = 14;   // top/bottom bezel
  const BEZEL_SIDE = 22; // left/right bezel
  const CORNER_OUTER = 54;
  const CORNER_INNER = 44;
  const PHONE_W = SCREEN_W + BEZEL_SIDE * 2;   // 437
  const PHONE_H = SCREEN_H + BEZEL_H * 2;      // 880

  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          /* Mobile phones: show real app full screen */
          @media (max-width: 768px) {
            #desktop-shell { display: none !important; }
            #app-root { display: block !important; }
          }
          /* Desktop / iPad: show the mockup shell */
          @media (min-width: 769px) {
            html, body { margin: 0; padding: 0; overflow: hidden; width: 100%; height: 100%; }
            #app-root { display: none !important; }
            #desktop-shell { display: flex !important; }
          }
          /* The iframe inside the phone must behave like a real phone screen */
          #phone-iframe {
            width: ${SCREEN_W}px;
            height: ${SCREEN_H}px;
            border: none;
            display: block;
            border-radius: ${CORNER_INNER}px;
          }
        `}</style>
      </head>
      <body>
        {/* ── Mobile: real app ── */}
        <div id="app-root">{children}</div>

        {/* ── Desktop / iPad: gradient bg + phone mockup ── */}
        <div
          id="desktop-shell"
          style={{
            display: "none",
            width: "100vw",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            background: "#0a0a0f",
          }}
        >
          {/* ── Background gradient blobs ── */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse 55% 65% at 8% 90%, rgba(155, 30, 110, 0.80) 0%, transparent 58%),
              radial-gradient(ellipse 50% 60% at 88% 15%, rgba(90, 65, 210, 0.75) 0%, transparent 58%),
              radial-gradient(ellipse 45% 55% at 92% 82%, rgba(160, 160, 220, 0.40) 0%, transparent 52%),
              radial-gradient(ellipse 35% 45% at 50% 50%, rgba(70, 50, 150, 0.25) 0%, transparent 70%)
            `,
          }} />

          {/* ── Phone frame — scales to fit viewport height with padding ── */}
          <div style={{
            position: "relative",
            zIndex: 10,
            /* Scale the whole phone so it always fits on screen with 40px padding */
            transform: `scale(min(1, calc((100vh - 80px) / ${PHONE_H}px)))`,
            transformOrigin: "center center",
            /* Make sure the scaled container doesn't take up extra space */
            width: `${PHONE_W}px`,
            height: `${PHONE_H}px`,
            flexShrink: 0,
          }}>
            {/* Outer drop-shadow wrapper */}
            <div style={{
              width: `${PHONE_W}px`,
              height: `${PHONE_H}px`,
              filter: `
                drop-shadow(0 48px 96px rgba(0,0,0,0.70))
                drop-shadow(0 0 80px rgba(110, 80, 220, 0.35))
              `,
            }}>
              {/* ── Phone body ── */}
              <div style={{
                width: `${PHONE_W}px`,
                height: `${PHONE_H}px`,
                borderRadius: `${CORNER_OUTER}px`,
                background: "linear-gradient(160deg, #2e2e34 0%, #1c1c22 35%, #111116 100%)",
                boxShadow: `
                  inset 0 0 0 1.5px rgba(255,255,255,0.13),
                  inset 0 1px 0 rgba(255,255,255,0.22),
                  inset 0 -1px 0 rgba(0,0,0,0.4),
                  0 0 0 1px rgba(0,0,0,0.6)
                `,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {/* Left buttons: silent + vol up + vol down */}
                {[
                  { top: 112, h: 34 },   // silent switch
                  { top: 178, h: 68 },   // vol up
                  { top: 258, h: 68 },   // vol down
                ].map((b, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    left: -4,
                    top: b.top,
                    width: 4,
                    height: b.h,
                    background: "linear-gradient(90deg, #1a1a20, #2a2a30)",
                    borderRadius: "3px 0 0 3px",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                  }} />
                ))}
                {/* Right button: power */}
                <div style={{
                  position: "absolute",
                  right: -4,
                  top: 200,
                  width: 4,
                  height: 90,
                  background: "linear-gradient(270deg, #1a1a20, #2a2a30)",
                  borderRadius: "0 3px 3px 0",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                }} />

                {/* ── Screen area ── */}
                <div style={{
                  width: `${SCREEN_W}px`,
                  height: `${SCREEN_H}px`,
                  borderRadius: `${CORNER_INNER}px`,
                  overflow: "hidden",
                  position: "relative",
                  background: "#000",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.8)",
                }}>
                  {/* Subtle screen glare */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: `${CORNER_INNER}px`,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%)",
                    zIndex: 20,
                    pointerEvents: "none",
                  }} />

                  {/* Dynamic Island */}
                  <div style={{
                    position: "absolute",
                    top: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 120,
                    height: 34,
                    background: "#000",
                    borderRadius: 20,
                    zIndex: 30,
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
                  }} />

                  {/* ── Live app iframe ── */}
                  <iframe
                    id="phone-iframe"
                    src="/auth"
                    title="Marlos App"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    style={{
                      width: `${SCREEN_W}px`,
                      height: `${SCREEN_H}px`,
                      border: "none",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
