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
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          /* ── Mobile phones: full screen app ── */
          @media (max-width: 768px) {
            #desktop-shell { display: none !important; }
            #app-root { display: block !important; }
          }

          /* ── Desktop / iPad: show gradient + phone ── */
          @media (min-width: 769px) {
            html, body {
              margin: 0; padding: 0;
              width: 100%; height: 100%;
              overflow: hidden;
              background: #00c47a;
            }
            #app-root { display: none !important; }
            #desktop-shell {
              display: flex !important;
              width: 100vw;
              height: 100vh;
              align-items: center;
              justify-content: center;
              position: relative;
              overflow: hidden;
            }
          }

          /* Scale phone to always fit viewport with 48px vertical padding */
          .phone-scaler {
            /* fallback: no scale */
            transform-origin: center center;
          }

          @media (min-height: 980px) {
            .phone-scaler { transform: scale(1); }
          }
          @media (max-height: 979px) and (min-height: 880px) {
            .phone-scaler { transform: scale(0.92); }
          }
          @media (max-height: 879px) and (min-height: 800px) {
            .phone-scaler { transform: scale(0.84); }
          }
          @media (max-height: 799px) and (min-height: 720px) {
            .phone-scaler { transform: scale(0.76); }
          }
          @media (max-height: 719px) {
            .phone-scaler { transform: scale(0.68); }
          }

          /* Gradient background — brand green top to soft mint bottom */
          .desktop-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, #00c47a 0%, #00d990 35%, #00e5a0 60%, #7de8bc 85%, #b8f2d8 100%);
          }
        `}</style>
      </head>
      <body>
        {/* ── Mobile: real app ── */}
        <div id="app-root">{children}</div>

        {/* ── Desktop / iPad: gradient bg + phone mockup ── */}
        <div id="desktop-shell">
          {/* Background gradient */}
          <div className="desktop-bg" />

          {/* Phone mockup — 390×844 (iPhone 14/15 logical size, perfectly proportioned) */}
          <div className="phone-scaler" style={{ position: "relative", zIndex: 10, flexShrink: 0 }}>
            {/* Glow behind the phone */}
            <div style={{
              position: "absolute",
              inset: "-40px",
              borderRadius: "80px",
              background: "radial-gradient(ellipse at 50% 60%, rgba(0,80,40,0.25) 0%, transparent 70%)",
              filter: "blur(24px)",
              zIndex: 0,
            }} />

            {/* Phone outer body — 390+44 wide = 434, 844+28 tall = 872 */}
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "434px",
              height: "872px",
              borderRadius: "52px",
              background: "linear-gradient(160deg, #323238 0%, #1e1e24 30%, #111116 100%)",
              boxShadow: `
                0 0 0 1.5px rgba(255,255,255,0.14),
                0 1px 0 0 rgba(255,255,255,0.24) inset,
                0 -1px 0 0 rgba(0,0,0,0.5) inset,
                0 50px 100px rgba(0,0,0,0.75),
                0 20px 40px rgba(0,0,0,0.5)
              `,
            }}>

              {/* Left buttons */}
              {/* Silent switch */}
              <div style={{ position:"absolute", left:"-4px", top:"108px", width:"4px", height:"32px", background:"#2a2a30", borderRadius:"3px 0 0 3px", boxShadow:"0 0 0 0.5px rgba(255,255,255,0.07)" }} />
              {/* Vol up */}
              <div style={{ position:"absolute", left:"-4px", top:"168px", width:"4px", height:"66px", background:"#2a2a30", borderRadius:"3px 0 0 3px", boxShadow:"0 0 0 0.5px rgba(255,255,255,0.07)" }} />
              {/* Vol down */}
              <div style={{ position:"absolute", left:"-4px", top:"246px", width:"4px", height:"66px", background:"#2a2a30", borderRadius:"3px 0 0 3px", boxShadow:"0 0 0 0.5px rgba(255,255,255,0.07)" }} />
              {/* Power */}
              <div style={{ position:"absolute", right:"-4px", top:"196px", width:"4px", height:"88px", background:"#2a2a30", borderRadius:"0 3px 3px 0", boxShadow:"0 0 0 0.5px rgba(255,255,255,0.07)" }} />

              {/* Screen — inset 14px each side, 14px top/bottom */}
              <div style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                right: "14px",
                bottom: "14px",
                borderRadius: "40px",
                overflow: "hidden",
                background: "#000",
              }}>
                {/* Screen glare overlay — sits above iframe, pointer-events none */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "40px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 35%)",
                  zIndex: 20,
                  pointerEvents: "none",
                }} />

                {/* Dynamic Island */}
                <div style={{
                  position: "absolute",
                  top: "13px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "118px",
                  height: "34px",
                  background: "#000",
                  borderRadius: "20px",
                  zIndex: 30,
                  pointerEvents: "none",
                }} />

                {/* Live interactive iframe — exact iPhone screen dimensions */}
                <iframe
                  src="/auth"
                  title="Marlos App"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "406px",   /* screen area = 434 - 14 - 14 */
                    height: "844px",  /* screen area = 872 - 14 - 14 */
                    border: "none",
                    display: "block",
                    borderRadius: "40px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
