# MVP-14 モックデータ・Seedデータガイド

RentPassのMVPでは、実装・デモ・テストを高速に進めるために、代表的な申込ケースをfixturesとして用意します。

実装ファイル: `src/mocks/rentpass.ts`

## 目的

- 画面実装を実データなしで進められるようにする。
- 管理会社・オーナー向けデモで、RentPassらしいケースを見せられるようにする。
- 状態遷移、開示範囲、非預託支払いモデル、見守りアラートをテストできるようにする。

---

## 1. 用意したデモケース

### 1. 高齢単身者、見守りあり

| 項目 | 内容 |
| --- | --- |
| application id | `application-elderly-001` |
| tenant | 山田 太郎 |
| status | `condition_design` |
| 支払い | 6か月前払い条件、保証会社申請中 |
| 見守り | 週3回チェックイン |
| 緊急連絡先 | 2名確認済み |
| 使いどころ | 管理会社申込レビュー、条件ビルダー、オーナー説明 |

### 2. フリーランス、前払い6か月あり

| 項目 | 内容 |
| --- | --- |
| application id | `application-freelance-001` |
| tenant | 佐藤 花子 |
| status | `owner_review` |
| 支払い | 6か月前払い条件、保証会社承認済み、収納代行設定中 |
| 見守り | 利用なし |
| 使いどころ | オーナー向け入居安心レポート |

### 3. 入居後見守りアラート

| 項目 | 内容 |
| --- | --- |
| application id | `application-monitoring-alert-001` |
| tenant | 鈴木 一郎 |
| status | `active_tenancy` |
| 支払い | プレミアム、家賃リザーブ払い出し中 |
| 見守り | 毎日チェックイン |
| alert | `warning` |
| 使いどころ | 見守り一覧、アラート詳細、対応ログ |

---

## 2. エクスポート

| Export | 用途 |
| --- | --- |
| `demoTenants` | 入居希望者一覧 |
| `demoApplications` | 申込一覧・詳細・レポート |
| `demoAssuranceChecklist` | 入居安心チェックリスト表示 |

---

## 3. モックデータ設計ルール

- 実在個人の情報を使わない。
- 通帳画像や本人確認書類画像は置かない。
- オーナー向けに見せない情報はfixturesでも直接露出させない。
- `rentpassHoldsFunds` は必ず `false` にする。
- 職業名はリスクラベルではなく、必要書類・説明分岐のために使う。
- ステータスは `src/types/index.ts` の型に合わせる。

---

## 4. 今後追加したいfixtures

- オーナー条件追加パターン
- 書類追加提出依頼パターン
- 保証会社否認パターン
- 共有URL期限切れパターン
- 同意撤回パターン
- 緊急連絡先未確認パターン
- 収納代行設定失敗パターン
- 家賃リザーブ返還手続き中パターン

---

## 5. 将来のSeed化

今はTypeScript fixturesですが、Supabase連携後は以下の導線を検討します。

```bash
npm run seed
```

想定するseed対象:

- management_companies
- owners
- properties
- tenants
- lease_applications
- payment_assurances
- monitoring_plans
- emergency_contacts
- consent_records
- audit_logs

## 完了条件

- `src/mocks/rentpass.ts` に代表ケースがある。
- 画面実装がfixturesだけで始められる。
- 非預託支払いモデルと開示制限の前提がモックデータに反映されている。
