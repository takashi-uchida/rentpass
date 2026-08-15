# 🛡️ RentPass（レントパス）

> **「貸せない理由」を、「貸せる条件」に変換する。**  
> 従来の入居審査では通りにくかった人に対し、支払い担保（外部信託・収納連携）・見守り安否確認・残置物合意・代替与信をパッケージ化し、貸主・管理会社が安心して貸せる条件を設計・管理する賃貸リスクマネジメントSaaS。

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📖 プロダクト概要

日本国内では単身高齢者、フリーランス、ナイトワーク従事者、外国人などの増加に伴い、「預貯金や支払い能力はあるのに、画一的な会社員向け審査基準で落とされる」賃貸難民問題が深刻化しています。また貸主側も、「孤独死」「家賃滞納」「残置物放置」への不安から空室でも受け入れを躊躇しています。

RentPassは、**「審査で落とす」のではなく「貸主が懸念するリスクを対策済み条件に変換して貸す」** アプローチを採用したプラットフォームです。

```
       ┌────────────────────────────────────────────────────────┐
       │                       RentPass                         │
       │           (賃貸リスク条件設計プラットフォーム)           │
       └────────────────────────────────────────────────────────┘
          ▲                    ▲                   ▲
          │                    │                   │
  ┌───────┴──────┐      ┌──────┴──────┐     ┌──────┴──────┐
  │  入居希望者  │      │  管理会社   │     │  貸主(オーナー)│
  │ (Tenant)     │      │  (Property) │     │  (Landlord) │
  └──────────────┘      └─────────────┘     └─────────────┘
          ▲                    ▲
          │                    │
          └──────────┬─────────┘
                     │
              ┌──────┴──────┐
              │  仲介会社   │
              │  (Broker)   │
              └─────────────┘
```

---

## 🌟 4つの安心の柱

1. **🧓 見守り・安否確認システム (Senior Safety)**
   - LINE / SMS / Web によるワンタップ定期安否確認。
   - 段階的エスカレーションフロー（12h 注意 → 24h 家族通知 → 48h 居住支援法人駆けつけ）。
   - 改正住宅セーフティネット法（居住サポート住宅）準拠。

2. **🏦 家賃前払い・信託リザーブ保全 (Payment & Trust)**
   - 資金決済法リスクを完全回避する**自社非預託**アーキテクチャ。
   - 提携信託会社（前払家賃保全信託）および保証会社＋収納代行とのAPI連携。
   - 3〜12ヶ月分の家賃リザーブと毎月の自動払い出し管理。

3. **📄 資産・支払い能力の代替証明 (Solvency Pass)**
   - 口座残高証明、確定申告書、前払いコミットメントを統合した「RentPass 信用サマリー」。
   - QRコード付きの真正性検証。

4. **🤝 残置物処理・死後事務委任合意 (Residual Goods Governance)**
   - 国土交通省「残置物の処理等に関するモデル契約条項」準拠の電子合意。

---

## 📂 リポジトリ構成

```
rentpass/
├── .github/                           # CI/CD & GitHub テンプレート
│   ├── workflows/ci.yml               # GitHub Actions (Lint, Typecheck, Build)
│   ├── ISSUE_TEMPLATE/                # バグ報告・機能提案テンプレート
│   └── pull_request_template.md
├── docs/                              # 完全版 仕様・事業戦略ドキュメント (全11編)
│   ├── 00_PRFAQ.md                    # Amazon式 PR/FAQ（プレスリリース & FAQ）
│   ├── 01_LEAN_CANVAS.md              # リーンキャンバス
│   ├── 02_VALUE_PROPOSITION.md        # 4ステークホルダー別バリュープロポジション
│   ├── 03_REQUIREMENTS.md             # 機能要件・非機能要件定義書 (BRD/PRD)
│   ├── 04_SCREEN_DESIGN.md            # 画面設計・UIコンポーネント・画面遷移図
│   ├── 05_GTM.md                      # GTM戦略・アライアンス計画
│   ├── 06_DATA_MODEL.md               # ER図・テーブル定義・RLSセキュリティ
│   ├── 07_COMPLIANCE_AND_RISK.md      # 関連法規分析（資金決済法・宅建業法・住宅セーフティネット法等）
│   ├── 08_USE_CASE_TRANSITIONS.md     # ユースケース別ライフサイクル状態遷移図
│   ├── 09_PAYMENT_TRUST.md            # 前払い家賃保全信託・エスクロー・収納代行詳細
│   └── 10_ROADMAP.md                  # フェーズ別開発・事業ロードマップ
├── supabase/                          # データベース定義 & シードデータ
│   ├── migrations/
│   │   └── 20260815000000_init_schema.sql  # DDL (テーブル, ENUM, RLS, トリガー)
│   └── seed.sql                       # リアルな検証用シードデータ
├── src/                               # Next.js / TypeScript アプリケーション
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                   # トップ / 概要 & ロール選択
│   │   ├── tenant/page.tsx            # 入居者ポータル (パス作成・安否チェックイン)
│   │   ├── management/page.tsx        # 管理・仲介ダッシュボード (条件設計・アラート監視)
│   │   └── owner/page.tsx             # オーナーポータル (収支・リザーブ保全状況)
│   ├── styles/globals.css             # Vanilla CSS デザインシステム
│   └── types/index.ts                 # TypeScript 型定義
├── package.json
├── tsconfig.json
├── next.config.mjs
└── README.md
```

---

## 🚀 クイックスタート (ローカル起動)

### 1. 依存パッケージのインストール
```bash
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```
ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 3. 型検査 & ビルド確認
```bash
npm run typecheck
npm run build
```

---

## 🔗 GitHub への Push 手順

本ディレクトリは Git 初期化および初期コミットが完了しています。GitHub 上で新規リポジトリを作成後、以下を実行してください。

### GitHub CLI (`gh`) を使用する場合:
```bash
gh repo create takashi-uchida/rentpass --public --source=. --remote=origin --push
```

### Git コマンド (SSH) を使用する場合:
```bash
git remote add origin git@github.com:takashi-uchida/rentpass.git
git branch -M main
git push -u origin main
```

### Git コマンド (HTTPS) を使用する場合:
```bash
git remote add origin https://github.com/takashi-uchida/rentpass.git
git branch -M main
git push -u origin main
```

---

## 📜 ライセンス
MIT License
