import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div style={{ display: "inline-block", padding: "0.35rem 1rem", background: "var(--primary-light)", color: "var(--primary)", borderRadius: "var(--radius-full)", fontSize: "0.875rem", fontWeight: 700, marginBottom: "1rem" }}>
          PropTech × 居住支援 × 支払い信託保全
        </div>
        <h1 className="hero-title">
          「貸せない理由」を、<br />
          「貸せる条件」に変換する。
        </h1>
        <p className="hero-lead">
          単身シニア・フリーランス・ナイトワーク従事者など、従来の画一的な審査では部屋を借りにくかった人へ。
          支払い担保（外部信託保全）・見守り安否確認・残置物合意をパッケージ化し、貸主が安心して鍵を渡せる仕組みを提供します。
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/tenant" className="btn btn-primary btn-lg" id="hero-btn-tenant">
            入居者としてパスを作成
          </Link>
          <Link href="/management" className="btn btn-outline btn-lg" id="hero-btn-management">
            管理会社・仲介デモを見る
          </Link>
          <Link href="/owner" className="btn btn-outline btn-lg" id="hero-btn-owner">
            オーナー画面を見る
          </Link>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            RentPass が提供する4つの安心の柱
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "650px", margin: "0 auto" }}>
            審査で落とすのではなく、貸主が懸念するすべてのリスク項目に対策条件をセットします。
          </p>
        </div>

        <div className="grid-cols-2" style={{ marginBottom: "3rem" }}>
          <div className="card" id="pillar-card-safety">
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🧓</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              1. 見守り・安否確認システム
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "0.95rem" }}>
              LINE/SMS/Webでのワンタップ安否確認と、未応答時の多段階エスカレーション（本人催促 → 緊急連絡先 → 居住支援法人駆けつけ）。孤独死を未然に防ぎ、オーナーの不安を解消します。
            </p>
            <span className="badge badge-success">改正住宅セーフティネット法 準拠</span>
          </div>

          <div className="card" id="pillar-card-reserve">
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🏦</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              2. 家賃前払い・信託リザーブ保全
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "0.95rem" }}>
              資金決済法上のリスクを回避するため、自社で預からず外部の信託会社・保証会社と連携。3〜12ヶ月分の家賃を安全にリザーブし、毎月オーナーへ自動払い出しします。
            </p>
            <span className="badge badge-primary">資金非預託・信託分別管理</span>
          </div>

          <div className="card" id="pillar-card-solvency">
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📄</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              3. 資産・支払い能力の代替証明
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "0.95rem" }}>
              源泉徴収票に依存せず、預貯金残高・前払いコミットメント・確定申告書・クレジットカード枠を統合した「RentPass 信用サマリー」を発行します。
            </p>
            <span className="badge badge-warning">ナイトワーク・フリーランス対応</span>
          </div>

          <div className="card" id="pillar-card-residual">
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🤝</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              4. 残置物処理・死後事務委任合意
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "0.95rem" }}>
              国土交通省の残置物処理モデル契約条項に準拠した電子合意を即座に締結。万一の際の法的手続きや相続人捜索による空室停滞を防ぎます。
            </p>
            <span className="badge badge-success">国交省モデル条項準拠</span>
          </div>
        </div>

        {/* 3 Portals Quick Access */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>各ロール別デモ体験</h2>
        </div>

        <div className="grid-cols-3">
          <div className="card" style={{ borderTop: "4px solid var(--primary)" }}>
            <h3 className="card-title">入居者ポータル</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: "1rem 0" }}>
              信用パスの条件設計、資産証明の登録、日々のワンタップ安否確認チェックインを体験できます。
            </p>
            <Link href="/tenant" className="btn btn-primary" style={{ width: "100%" }} id="link-tenant-portal">
              入居者画面を開く →
            </Link>
          </div>

          <div className="card" style={{ borderTop: "4px solid var(--warning)" }}>
            <h3 className="card-title">管理・仲介ダッシュボード</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: "1rem 0" }}>
              審査パイプラインの管理、前払い月数や見守り条件のカスタマイズ、安否未応答アラートの監視を行えます。
            </p>
            <Link href="/management" className="btn btn-primary" style={{ width: "100%" }} id="link-management-portal">
              管理・仲介画面を開く →
            </Link>
          </div>

          <div className="card" style={{ borderTop: "4px solid var(--success)" }}>
            <h3 className="card-title">オーナーポータル</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: "1rem 0" }}>
              所有物件の入居状況、信託リザーブ保全残高、見守り安否確認ログをリアルタイムで閲覧できます。
            </p>
            <Link href="/owner" className="btn btn-primary" style={{ width: "100%" }} id="link-owner-portal">
              オーナー画面を開く →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
