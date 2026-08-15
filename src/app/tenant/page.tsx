"use client";

import { useState } from "react";

export default function TenantPortalPage() {
  // Demo persona selector
  const [persona, setPersona] = useState<"senior" | "nightlife">("senior");
  
  // Daily check-in state
  const [checkInDone, setCheckInDone] = useState(false);
  const [checkInMessage, setCheckInMessage] = useState<string | null>(null);

  // Form states
  const [reserveMonths, setReserveMonths] = useState(6);
  const [monthlyRent, setMonthlyRent] = useState(persona === "senior" ? 75000 : 130000);
  const [monitoringTier, setMonitoringTier] = useState<"daily" | "weekly">(persona === "senior" ? "daily" : "weekly");
  const [residualAgreed, setResidualAgreed] = useState(true);

  // Switch persona handler
  const handlePersonaChange = (type: "senior" | "nightlife") => {
    setPersona(type);
    setCheckInDone(false);
    setCheckInMessage(null);
    if (type === "senior") {
      setMonthlyRent(75000);
      setReserveMonths(6);
      setMonitoringTier("daily");
    } else {
      setMonthlyRent(130000);
      setReserveMonths(6);
      setMonitoringTier("weekly");
    }
  };

  const handleCheckIn = (status: "ok" | "need_contact") => {
    setCheckInDone(true);
    if (status === "ok") {
      setCheckInMessage("✅ 本日の安否確認を完了しました。管理会社および見守りシステムに「正常」ステータスを送信しました。");
    } else {
      setCheckInMessage("⚠️ ご連絡を受け付けました。提携サポート窓口または管理会社より折り返しご連絡いたします。");
    }
  };

  const reservedTotal = monthlyRent * reserveMonths;

  return (
    <div className="container">
      {/* Top Banner / Persona Switcher */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>入居者ポータル (Tenant Portal)</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            あなたの信用パス（RentPass）の作成・確認と、日々の安心見守りチェックインを行えます。
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-card)", padding: "0.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>デモ切り替え:</span>
          <button
            onClick={() => handlePersonaChange("senior")}
            className={`btn btn-sm ${persona === "senior" ? "btn-primary" : "btn-outline"}`}
            id="btn-persona-senior"
          >
            🧓 単身シニア（田中様）
          </button>
          <button
            onClick={() => handlePersonaChange("nightlife")}
            className={`btn btn-sm ${persona === "nightlife" ? "btn-primary" : "btn-outline"}`}
            id="btn-persona-nightlife"
          >
            🍸 ナイトワーク・フリーランス（佐藤様）
          </button>
        </div>
      </div>

      {/* Safety Check-in Banner */}
      <div className="card" style={{ marginBottom: "2rem", borderLeft: "6px solid var(--success)", background: "linear-gradient(to right, #ffffff, #f0fdf4)" }} id="section-daily-checkin">
        <div className="card-header" style={{ borderBottom: "none", paddingBottom: 0 }}>
          <h2 className="card-title">
            <span>🕒 本日の安否確認チェックイン</span>
            <span className="badge badge-success">見守り稼働中</span>
          </h2>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>最終確認: 昨日 09:30</span>
        </div>
        <div style={{ margin: "1rem 0" }}>
          <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            {persona === "senior" ? "田中 太郎 様、本日の体調はいかがですか？" : "佐藤 健一 様、定期確認のタイミングです。"}
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
            ボタンを1回タップするだけで、管理会社およびご家族・支援法人へ正常ステータスが共有されます。
          </p>

          {!checkInDone ? (
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => handleCheckIn("ok")}
                className="btn btn-success btn-lg"
                id="btn-checkin-ok"
              >
                😊 元気です (ワンタップ報告)
              </button>
              <button
                onClick={() => handleCheckIn("need_contact")}
                className="btn btn-outline"
                id="btn-checkin-contact"
              >
                ⚠️ 相談・連絡を希望
              </button>
            </div>
          ) : (
            <div style={{ padding: "1rem", background: "var(--success-light)", border: "1px solid var(--success-border)", borderRadius: "var(--radius-sm)", color: "var(--success)", fontWeight: 600 }}>
              {checkInMessage}
            </div>
          )}
        </div>
      </div>

      {/* Grid: RentPass Card & Condition Customizer */}
      <div className="grid-cols-2">
        {/* Left: Interactive Pass Builder */}
        <div className="card" id="card-pass-builder">
          <h2 className="card-title" style={{ marginBottom: "1.25rem" }}>
            🛠️ 貸主安心条件のカスタマイズ
          </h2>
          <div className="form-group">
            <label className="form-label">想定家賃（月額）</label>
            <input
              type="number"
              className="form-input"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              id="input-monthly-rent"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              前払い家賃リザーブ月数: <strong>{reserveMonths} ヶ月分</strong> (¥{reservedTotal.toLocaleString()})
            </label>
            <input
              type="range"
              min={3}
              max={12}
              step={1}
              value={reserveMonths}
              onChange={(e) => setReserveMonths(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--primary)" }}
              id="slider-reserve-months"
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
              <span>3ヶ月 (ライト)</span>
              <span>6ヶ月 (標準推奨)</span>
              <span>12ヶ月 (完全信託)</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">見守り・安否確認の頻度</label>
            <select
              className="form-select"
              value={monitoringTier}
              onChange={(e) => setMonitoringTier(e.target.value as "daily" | "weekly")}
              id="select-monitoring-tier"
            >
              <option value="daily">毎日 1回 (単身高齢者推奨プラン)</option>
              <option value="weekly">週 1回 (フリーランス・単身者向け)</option>
            </select>
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <input
              type="checkbox"
              id="check-residual-agreement"
              checked={residualAgreed}
              onChange={(e) => setResidualAgreed(e.target.checked)}
              style={{ width: "1.2rem", height: "1.2rem", accentColor: "var(--primary)" }}
            />
            <label htmlFor="check-residual-agreement" style={{ fontSize: "0.9rem", color: "var(--text-primary)", cursor: "pointer" }}>
              国交省モデル条項に基づく「残置物処理委任合意」を付帯する
            </label>
          </div>

          <div style={{ padding: "1rem", background: "var(--bg-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            💡 <strong>安心設計ポイント:</strong> 前払い資金はRentPassではなく提携信託会社または保証会社にて分別管理されます。
          </div>
        </div>

        {/* Right: Issued RentPass Display */}
        <div className="card" style={{ border: "2px solid var(--primary)", background: "#ffffff" }} id="card-rentpass-display">
          <div className="card-header">
            <div>
              <span className="badge badge-primary" style={{ marginBottom: "0.25rem" }}>公式発行証</span>
              <h2 className="card-title" style={{ fontSize: "1.4rem" }}>🛡️ RentPass 信用証明書</h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--primary)" }}>
                {persona === "senior" ? "GRADE A+" : "GRADE AAA"}
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>貸主安心度 98%</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1rem 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>氏名 / 属性:</span>
              <strong>{persona === "senior" ? "田中 太郎 (72歳 / 単身)" : "佐藤 健一 (28歳 / 個人事業主)"}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>支払い担保 (リザーブ):</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                {reserveMonths}ヶ月分 (¥{reservedTotal.toLocaleString()}) 信託保全
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>見守り体制:</span>
              <span style={{ color: "var(--success)", fontWeight: 700 }}>
                {monitoringTier === "daily" ? "毎日チェックイン + 多段階駆けつけ" : "週1回チェックイン"}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>残置物処理合意:</span>
              <span style={{ color: residualAgreed ? "var(--success)" : "var(--danger)", fontWeight: 700 }}>
                {residualAgreed ? "✅ 国交省モデル条項 締結済" : "❌ 未合意"}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>本人確認・身元証明:</span>
              <span style={{ color: "var(--success)", fontWeight: 700 }}>✅ マイナンバー・口座残高認証済</span>
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "1rem", background: "var(--bg-subtle)", borderRadius: "var(--radius-sm)", marginTop: "1rem" }}>
            <div style={{ fontSize: "2rem", letterSpacing: "4px", marginBottom: "0.25rem" }}>🏁 QR-RP-884920</div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>管理会社・仲介業者提出用 QR認証コード</p>
          </div>

          <button
            onClick={() => alert("RentPass PDF 証明書をダウンロードしました。")}
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1.25rem" }}
            id="btn-download-pass-pdf"
          >
            📄 RentPass 証明書 (PDF) を出力
          </button>
        </div>
      </div>
    </div>
  );
}
