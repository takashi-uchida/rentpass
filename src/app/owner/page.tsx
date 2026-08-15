"use client";

export default function OwnerPortalPage() {
  const properties = [
    {
      id: "prop1",
      name: "サンライズレジデンス三軒茶屋",
      unitsTotal: 12,
      unitsOccupied: 12,
      occupancyRate: "100%",
      monthlyIncome: 920000,
      rentpassTenants: [
        {
          room: "102号室",
          tenant: "山本 花子 (81歳)",
          rent: 70000,
          plan: "高齢者見守りプラン (毎日)",
          reserveStatus: "保証会社連携 (Casa)",
          safetyStatus: "⚠️ 26時間未応答 (管理会社対応中)",
        },
        {
          room: "203号室",
          tenant: "田中 太郎 (72歳)",
          rent: 75000,
          plan: "見守り + 6ヶ月リザーブ",
          reserveStatus: "保全残高: ¥450,000 (残5ヶ月)",
          safetyStatus: "✅ 正常 (本日 09:30 確認済)",
        },
      ],
    },
    {
      id: "prop2",
      name: "プレール青山",
      unitsTotal: 20,
      unitsOccupied: 19,
      occupancyRate: "95%",
      monthlyIncome: 2450000,
      rentpassTenants: [
        {
          room: "402号室",
          tenant: "佐藤 健一 (28歳 / 個人事業主)",
          rent: 130000,
          plan: "Premium 信託保全プラン",
          reserveStatus: "保全残高: ¥780,000 (残6ヶ月)",
          safetyStatus: "✅ 正常 (週1回確認)",
        },
      ],
    },
  ];

  return (
    <div className="container">
      {/* Top Banner */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>オーナーポータル (Landlord Portal)</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            鈴木 一朗 様 (所有棟数: 2棟 / 総戸数: 32戸 / 満室稼働率: 96.8%)
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="stat-box" style={{ padding: "0.5rem 1rem" }}>
            <div className="stat-value" style={{ fontSize: "1.25rem", color: "var(--primary)" }}>¥3,370,000</div>
            <div className="stat-label">月間想定家賃収入</div>
          </div>
          <div className="stat-box" style={{ padding: "0.5rem 1rem" }}>
            <div className="stat-value" style={{ fontSize: "1.25rem", color: "var(--success)" }}>¥1,230,000</div>
            <div className="stat-label">信託保全リザーブ総額</div>
          </div>
        </div>
      </div>

      {/* Trust & Peace of Mind Summary */}
      <div className="card" style={{ marginBottom: "2.5rem", background: "linear-gradient(135deg, #1e293b, #0f172a)", color: "#ffffff", border: "none" }} id="section-owner-summary">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <span className="badge" style={{ background: "rgba(37, 99, 235, 0.3)", color: "#60a5fa", border: "1px solid #2563eb", marginBottom: "0.5rem" }}>
              🛡️ RentPass 賃貸経営プロテクション
            </span>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginTop: "0.25rem" }}>
              「家賃滞納」と「孤独死・残置物リスク」が完全にヘッジされています
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "0.5rem", maxWidth: "680px" }}>
              信託会社に保全された家賃リザーブにより最長6ヶ月間の家賃が確定。日々の安否見守りログと国交省準拠の残置物電子委任により、事故物件化と法的手続きの停滞を未然に防ぎます。
            </p>
          </div>
          <div>
            <button
              onClick={() => alert("最新の月次収支および保全証明レポート (PDF) を出力しました。")}
              className="btn btn-primary"
              id="btn-owner-report"
            >
              📊 月次保全レポート (PDF) 出力
            </button>
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {properties.map((prop) => (
          <div key={prop.id} className="card" id={`card-property-${prop.id}`}>
            <div className="card-header">
              <div>
                <h3 className="card-title" style={{ fontSize: "1.25rem" }}>🏢 {prop.name}</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  総戸数: {prop.unitsTotal}戸 (入居中: {prop.unitsOccupied}戸 / 稼働率: {prop.occupancyRate})
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--primary)" }}>
                  ¥{prop.monthlyIncome.toLocaleString()} / 月
                </div>
                <span className="badge badge-success">管理委託: 東京PM</span>
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                RentPass 適用入居者の状況・保全残高:
              </h4>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)" }}>
                      <th style={{ padding: "0.5rem" }}>号室 / 入居者</th>
                      <th style={{ padding: "0.5rem" }}>賃料</th>
                      <th style={{ padding: "0.5rem" }}>適用プラン</th>
                      <th style={{ padding: "0.5rem" }}>家賃リザーブ保全状況</th>
                      <th style={{ padding: "0.5rem" }}>安否見守りステータス</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prop.rentpassTenants.map((t, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "0.75rem 0.5rem" }}>
                          <strong>{t.room}</strong> - {t.tenant}
                        </td>
                        <td style={{ padding: "0.75rem 0.5rem" }}>¥{t.rent.toLocaleString()}/月</td>
                        <td style={{ padding: "0.75rem 0.5rem" }}>
                          <span className="badge badge-primary">{t.plan}</span>
                        </td>
                        <td style={{ padding: "0.75rem 0.5rem" }}>
                          <strong style={{ color: "var(--primary)" }}>{t.reserveStatus}</strong>
                        </td>
                        <td style={{ padding: "0.75rem 0.5rem" }}>
                          <span>{t.safetyStatus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
