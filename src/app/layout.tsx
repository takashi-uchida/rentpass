import type { Metadata } from "next";
import Link from "next/link";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "RentPass | 賃貸リスク条件設計プラットフォーム",
  description: "従来の入居審査では通りにくい人に対し、支払い担保・見守り・残置物合意を組み合わせて貸せる条件を設計するSaaS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header className="navbar">
          <Link href="/" className="nav-brand" id="nav-brand-logo">
            <span>🛡️ RentPass</span>
            <span className="nav-badge">v1.0 Preview</span>
          </Link>
          <nav className="nav-links">
            <Link href="/" className="nav-link" id="nav-link-home">
              ホーム
            </Link>
            <Link href="/tenant" className="nav-link" id="nav-link-tenant">
              入居者ポータル
            </Link>
            <Link href="/management" className="nav-link" id="nav-link-management">
              管理・仲介ダッシュボード
            </Link>
            <Link href="/owner" className="nav-link" id="nav-link-owner">
              オーナーポータル
            </Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer style={{ borderTop: "1px solid var(--border-color)", padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem", background: "var(--bg-card)", marginTop: "4rem" }}>
          <p>© 2026 RentPass Inc. All rights reserved. | 住宅セーフティネット法準拠 / 資金非預託型信託・保証連携SaaS</p>
        </footer>
      </body>
    </html>
  );
}
