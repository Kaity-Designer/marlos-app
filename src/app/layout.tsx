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
          /* Mobile: full screen app */
          @media (max-width: 768px) {
            #desktop-shell { display: none !important; }
            #app-root { display: block !important; }
          }
          /* Desktop/Tablet: gradient bg + phone mockup */
          @media (min-width: 769px) {
            body { margin: 0; padding: 0; overflow: hidden; }
            #app-root { display: none !important; }
            #desktop-shell { display: flex !important; }
          }
        `}</style>
      </head>
      <body>
        {/* ── Mobile App (phones only) ── */}
        <div id="app-root">
          {children}
        </div>

        {/* ── Desktop / iPad shell ── */}
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
            background: "#0f0f10",
          }}
        >
          {/* Gradient blobs — matching the reference image */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse 60% 70% at 10% 85%, rgba(160, 40, 120, 0.75) 0%, transparent 60%),
              radial-gradient(ellipse 55% 65% at 85% 20%, rgba(100, 80, 200, 0.7) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 90% 80%, rgba(180, 180, 210, 0.45) 0%, transparent 55%),
              radial-gradient(ellipse 40% 50% at 50% 50%, rgba(80, 60, 160, 0.3) 0%, transparent 70%)
            `,
          }} />

          {/* Subtle noise overlay for depth */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.5,
          }} />

          {/* Left side copy */}
          <div style={{
            position: "relative",
            zIndex: 10,
            color: "white",
            maxWidth: "400px",
            padding: "0 48px",
            marginRight: "40px",
          }}>
            <div style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "20px",
            }}>
              AI Learning for ages 10–15
            </div>
            <h1 style={{
              fontSize: "clamp(42px, 5vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
              background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Learn your<br />way with<br />
              <span style={{
                background: "linear-gradient(135deg, #a8d8f8 0%, #7ec8f5 50%, #b8a0f0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>marlos</span>
            </h1>
            <p style={{
              fontSize: "17px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 36px",
              maxWidth: "340px",
            }}>
              Adaptive AI tutoring that understands exactly how you think — personalised for every student.
            </p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
                padding: "12px 20px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(12px)",
              }}>
                📱 Open on your phone to get started
              </div>
            </div>
            <div style={{ marginTop: "24px", display: "flex", gap: "24px" }}>
              {["Adaptive AI Tutor", "400+ Topics", "Instant Feedback"].map((f) => (
                <div key={f} style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
                  <span style={{ color: "#a8d8f8", marginRight: "6px" }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>

          {/* iPhone mockup */}
          <div style={{
            position: "relative",
            zIndex: 10,
            filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.6)) drop-shadow(0 0 60px rgba(120,100,200,0.3))",
          }}>
            {/* Phone outer frame */}
            <div style={{
              width: "300px",
              height: "620px",
              background: "linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 40%, #111114 100%)",
              borderRadius: "48px",
              padding: "14px",
              boxShadow: `
                inset 0 0 0 1px rgba(255,255,255,0.12),
                inset 0 1px 0 rgba(255,255,255,0.2),
                0 0 0 1px rgba(0,0,0,0.5)
              `,
              position: "relative",
            }}>
              {/* Side buttons */}
              <div style={{
                position: "absolute",
                left: "-3px",
                top: "110px",
                width: "3px",
                height: "36px",
                background: "#2a2a2e",
                borderRadius: "2px 0 0 2px",
              }} />
              <div style={{
                position: "absolute",
                left: "-3px",
                top: "158px",
                width: "3px",
                height: "64px",
                background: "#2a2a2e",
                borderRadius: "2px 0 0 2px",
              }} />
              <div style={{
                position: "absolute",
                left: "-3px",
                top: "234px",
                width: "3px",
                height: "64px",
                background: "#2a2a2e",
                borderRadius: "2px 0 0 2px",
              }} />
              <div style={{
                position: "absolute",
                right: "-3px",
                top: "168px",
                width: "3px",
                height: "90px",
                background: "#2a2a2e",
                borderRadius: "0 2px 2px 0",
              }} />

              {/* Screen */}
              <div style={{
                width: "100%",
                height: "100%",
                background: "#0f0f10",
                borderRadius: "36px",
                overflow: "hidden",
                position: "relative",
              }}>
                {/* Dynamic Island */}
                <div style={{
                  position: "absolute",
                  top: "14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "110px",
                  height: "32px",
                  background: "#000",
                  borderRadius: "20px",
                  zIndex: 10,
                }} />

                {/* App content iframe */}
                <iframe
                  src="/"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "36px",
                  }}
                  scrolling="no"
                  title="Marlos App Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
