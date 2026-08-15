"use client";

import { useState } from "react";

interface PipelineItem {
  id: string;
  name: string;
  age: number;
  attribute: string;
  property: string;
  room: string;
  rent: number;
  status: "new" | "reviewing" | "contracted";
  score: "AAA" | "A+" | "A";
  reserveMonths: number;
  monitoring: string;
  residualAgreed: boolean;
}

export default function ManagementDashboardPage() {
  const [pipeline, setPipeline] = useState<PipelineItem[]>([
    {
      id: "p1",
      name: "田中 太郎",
      age: 72,
      attribute: "単身シニア / 年金受給",
      property: "サンライズレジデンス三軒茶屋",
      room: "203号室",
      rent: 75000,
      status: "contracted",
      score: "A+",
      reserveMonths: 6,
      monitoring: "毎日 (Web/LINE)",
      residualAgreed: true,
    },
    {
      id: "p2",
      name: "佐藤 健一",
      age: 28,
      attribute: "ナイトワーク / 個人事業主",
      property: "プレール青山",
      room: "402号室",
      rent: 130000,
      status: "reviewing",
      score: "AAA",
      reserveMonths: 6,
      monitoring: "週1回",
      residualAgreed: true,
    },
    {
      id: "p3",
      name: "チャン・ミン",
      age: 24,
      attribute: "外国人留学生 / IT専修",
      property: "グランドメゾン中目黒",
      room: "105号室",
      rent: 88000,
      status: "new",
      score: "A",
      reserveMonths: 4,
      monitoring: "週1回",
      residualAgreed: false,
    },
  ]);

  // Alert State
  const [alertHandled, setAlertHandled] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState<PipelineItem | null>(null);

  const handleApproveCondition = (id: string) => {
    setPipeline(
      pipeline.map((item) =>
        item.id === id ? { ...item, status: "contracted" } : item
      )
    );
    setActiveModalItem(null);
    alert("オーナー承諾条件として承認し、電子契約および信託口座振込案内を送信しました。");
  };

  const handleDispatchEscalation = () => {
    setAlertHandled(true);
    alert("【緊急対応発注】提携居住支援法人（NPO居住支援ネット）へ現地駆けつけ安否確認を要請しました。");
  };

  return (
    <div className="container">
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>管理・仲介ダッシュボード (Biz Console)</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            東京プロパティマネジメント株式会社 (管理戸数: 2,450戸 / RentPass適用中: 182戸)
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="stat-box" style={{ padding: "0.5rem 1rem" }}>
            <div className="stat-value" style={{ fontSize: "1.25rem" }}>99.2%</div>
            <div className="stat-label">家賃回収率</div>
          </div>
          <div className="stat-box" style={{ padding: "0.5rem 1rem" }}>
            <div className="stat-value" style={{ fontSize: "1.25rem", color: "var(--success)" }}>0件</div>
            <div className="stat-label">孤独死事故</div>
          </div>
        </div>
      </div>

      {/* Safety Alert Console */}
      <div className="card" style={{ marginBottom: "2.5rem", borderLeft: "6px solid var(--danger)", background: "#fff5f5" }} id="section-safety-alerts">
        <div className="card-header" style={{ borderBottom: "none", paddingBottom: "0.5rem" }}>
          <h2 className="card-title" style={{ color: "var(--danger)" }}>
            <span>⚠️ 見守り・安否未応答アラート (警戒 Level 2)</span>
          </h2>
          <span className="badge badge-danger">未応答 26時間経過</span>
        </div>
        <div style={{ padding: "0.5rem 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                山本 花子 様 (81歳 / サンライズレジデンス三軒茶屋 102号室)
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                最終チェックイン: 昨朝 08:30 / 緊急連絡先（長男・山本隆様）へ自動SMS送信済（未応答）
              </p>
            </div>
            <div>
              {!alertHandled ? (
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    onClick={handleDispatchEscalation}
                    className="btn btn-danger"
                    id="btn-dispatch-escalation"
                  >
                    🚨 居住支援法人へ駆けつけ要請を発注
                  </button>
                  <button
                    onClick={() => { setAlertHandled(true); alert("管理会社より架電確認し、無事を確認しました。アラートを解除します。"); }}
                    className="btn btn-outline"
                    id="btn-resolve-alert"
                  >
                    📞 自社で電話確認・解除
                  </button>
                </div>
              ) : (
                <span className="badge badge-success" style={{ fontSize: "0.95rem", padding: "0.5rem 1rem" }}>
                  ✅ 駆けつけ・確認対応中 (ステータス: 調査中)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Applications Pipeline Table */}
      <div className="card" id="section-pipeline">
        <div className="card-header">
          <h2 className="card-title">📋 入居審査・リスク条件設計パイプライン</h2>
          <span className="badge badge-primary">全 {pipeline.length} 件</span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-color)", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                <th style={{ padding: "0.75rem" }}>入居希望者 / 属性</th>
                <th style={{ padding: "0.75rem" }}>希望物件 / 賃料</th>
                <th style={{ padding: "0.75rem" }}>RentPass スコア</th>
                <th style={{ padding: "0.75rem" }}>前払いリザーブ</th>
                <th style={{ padding: "0.75rem" }}>見守り設定</th>
                <th style={{ padding: "0.75rem" }}>ステータス</th>
                <th style={{ padding: "0.75rem", textAlign: "right" }}>アクション</th>
              </tr>
            </thead>
            <tbody>
              {pipeline.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "1rem 0.75rem" }}>
                    <strong>{item.name}</strong> ({item.age}歳)
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{item.attribute}</div>
                  </td>
                  <td style={{ padding: "1rem 0.75rem" }}>
                    {item.property} {item.room}
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>¥{item.rent.toLocaleString()}/月</div>
                  </td>
                  <td style={{ padding: "1rem 0.75rem" }}>
                    <span className="badge badge-primary" style={{ fontWeight: 800 }}>{item.score}</span>
                  </td>
                  <td style={{ padding: "1rem 0.75rem" }}>
                    <span style={{ fontWeight: 600, color: "var(--primary)" }}>
                      {item.reserveMonths}ヶ月 (¥{(item.rent * item.reserveMonths).toLocaleString()})
                    </span>
                  </td>
                  <td style={{ padding: "1rem 0.75rem" }}>
                    <span style={{ fontSize: "0.85rem" }}>{item.monitoring}</span>
                  </td>
                  <td style={{ padding: "1rem 0.75rem" }}>
                    {item.status === "contracted" && <span className="badge badge-success">契約・保全稼働中</span>}
                    {item.status === "reviewing" && <span className="badge badge-warning">条件設計・確認中</span>}
                    {item.status === "new" && <span className="badge badge-primary">新規申請受付</span>}
                  </td>
                  <td style={{ padding: "1rem 0.75rem", textAlign: "right" }}>
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="btn btn-outline btn-sm"
                      id={`btn-review-${item.id}`}
                    >
                      詳細・条件設計
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review & Customizer Modal */}
      {activeModalItem && (
        <div className="modal-overlay" onClick={() => setActiveModalItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title">🛠️ リスクヘッジ条件の確定・オーナー提案</h3>
              <button onClick={() => setActiveModalItem(null)} className="btn btn-outline btn-sm">✕</button>
            </div>
            <div style={{ margin: "1.5rem 0" }}>
              <p style={{ marginBottom: "1rem", fontSize: "1rem" }}>
                <strong>{activeModalItem.name} 様</strong> ({activeModalItem.attribute}) に対するリスク対策パッケージの確認:
              </p>

              <div style={{ background: "var(--bg-subtle)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", fontSize: "0.9rem" }}>
                <div style={{ marginBottom: "0.5rem" }}>🏢 <strong>対象物件:</strong> {activeModalItem.property} {activeModalItem.room}</div>
                <div style={{ marginBottom: "0.5rem" }}>💰 <strong>家賃:</strong> ¥{activeModalItem.rent.toLocaleString()}/月</div>
                <div style={{ marginBottom: "0.5rem" }}>🏦 <strong>家賃リザーブ預託:</strong> {activeModalItem.reserveMonths}ヶ月分 (¥{(activeModalItem.rent * activeModalItem.reserveMonths).toLocaleString()}) - 信託保全口座へ入金予定</div>
                <div style={{ marginBottom: "0.5rem" }}>🧓 <strong>見守りプラン:</strong> {activeModalItem.monitoring} + 段階的駆けつけ</div>
                <div>🤝 <strong>残置物電子同意:</strong> {activeModalItem.residualAgreed ? "合意済 (国交省標準モデル条項)" : "未合意 (契約時に付帯必須)"}</div>
              </div>

              <div style={{ borderLeft: "4px solid var(--success)", padding: "0.75rem 1rem", background: "var(--success-light)", color: "var(--success)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                <strong>貸主安心度判定:</strong> 滞納リスクおよび孤立死・残置物リスクが100%ヘッジされています。オーナーへの提案に最適です。
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                <button onClick={() => setActiveModalItem(null)} className="btn btn-outline">
                  閉じる
                </button>
                <button
                  onClick={() => handleApproveCondition(activeModalItem.id)}
                  className="btn btn-primary"
                  id="btn-confirm-condition"
                >
                  この条件でオーナーへ承諾依頼を送信
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
