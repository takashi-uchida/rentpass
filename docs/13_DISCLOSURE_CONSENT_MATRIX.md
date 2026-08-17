# MVP-10 情報開示・同意マトリクス

RentPassの中核は、入居希望者の情報を過剰に開示することではなく、貸主が判断できる **対策済み項目** に変換することです。このドキュメントでは、誰が何を見られるか、どの情報に同意が必要かを定義します。

## 設計原則

- オーナーには、通帳画像・本人確認書類画像・健康情報・詳細な家庭事情を原則表示しない。
- 管理会社は実務上必要な範囲で詳細確認できるが、閲覧は監査ログ対象にする。
- 保証会社・保険会社・居住支援法人への第三者提供は、目的別の同意に基づく。
- 入居希望者は、何を誰に見せるかを確認・撤回できる。
- 職業や年齢をリスクラベルとして第三者に提示しない。

---

## 1. Role定義

| Role | 説明 |
| --- | --- |
| `tenant` | 入居希望者/入居者本人 |
| `manager` | 管理会社・仲介会社の担当者 |
| `manager_admin` | 管理会社の管理者 |
| `owner` | 物件オーナー |
| `guarantor_partner` | 保証会社 |
| `insurance_partner` | 保険会社 |
| `support_partner` | 居住支援法人・見守り/訪問パートナー |
| `system_admin` | RentPass運用管理者 |

---

## 2. 開示レベル

| Level | 意味 |
| --- | --- |
| `none` | 閲覧不可 |
| `status_only` | 確認済み/未確認などのステータスのみ |
| `summary` | 金額レンジ、前払い月数、対策済み項目などの要約 |
| `masked_detail` | 一部マスクされた詳細 |
| `full_detail` | 生データまたは詳細情報 |
| `consent_required` | 本人同意がある場合のみ提供可能 |

---

## 3. 情報カテゴリ別マトリクス

| 情報カテゴリ | tenant | manager | owner | guarantor | insurance | support | system_admin | 備考 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 基本プロフィール | full_detail | full_detail | summary | consent_required | consent_required | consent_required | masked_detail | オーナーには年齢帯・世帯人数など最小限 |
| 本人確認ステータス | full_detail | full_detail | status_only | consent_required | none | none | masked_detail | オーナーには「本人確認済み」のみ |
| 本人確認書類画像 | full_detail | full_detail | none | consent_required | none | none | masked_detail | 閲覧はaudit log必須 |
| 収入確認ステータス | full_detail | full_detail | status_only | consent_required | none | none | masked_detail | オーナーには確認状態のみ |
| 収入証明書類 | full_detail | full_detail | none | consent_required | none | none | masked_detail | 保証会社提出時は目的別同意 |
| 資産確認ステータス | full_detail | full_detail | status_only | consent_required | none | none | masked_detail | オーナーには「資産確認済み」等のみ |
| 通帳・残高証明画像 | full_detail | full_detail | none | consent_required | none | none | masked_detail | オーナー開示禁止 |
| 前払い可能月数 | full_detail | full_detail | summary | consent_required | none | none | masked_detail | オーナーには「6か月前払い可能」など |
| 前払い実入金ステータス | full_detail | full_detail | summary | summary | none | none | masked_detail | RentPassは資金を保持しない |
| 保証会社ステータス | full_detail | full_detail | summary | full_detail | none | none | masked_detail | 保証会社には申込情報が必要 |
| 家賃リザーブ/信託ステータス | full_detail | full_detail | summary | none | none | none | masked_detail | 残高の生データは原則非表示 |
| 見守り設定 | full_detail | full_detail | summary | none | consent_required | consent_required | masked_detail | オーナーには頻度・実施状況のみ |
| 見守り履歴 | full_detail | full_detail | status_only | none | none | consent_required | masked_detail | 詳細な生活ログは制限 |
| 健康・生活上の詳細メモ | full_detail | restricted | none | none | none | consent_required | none | 原則MVPでは扱わない |
| 緊急連絡先詳細 | full_detail | full_detail | masked_detail | none | none | consent_required | masked_detail | オーナーには人数・確認済みのみ推奨 |
| 残置物/死後事務関連同意 | full_detail | full_detail | summary | none | consent_required | consent_required | masked_detail | 法務確認が必要 |
| 入居安心レポート | full_detail | full_detail | summary | none | none | none | masked_detail | オーナー共有の中心 |
| audit log | own_history | company_scope | own_report_views | own_shared_records | own_shared_records | own_shared_records | masked_detail | 操作証跡はロール別に制限 |

---

## 4. オーナー向けに表示してよい項目

オーナー画面では、原則として以下だけを表示します。

```text
本人確認：確認済み
資産確認：確認済み
前払い：6か月分対応可能
保証会社：申請中/承認済み
見守り：週3回設定済み
緊急連絡先：2名確認済み
保険：加入予定/推奨
残置物対策：同意済み/確認中
推奨条件：6か月前払い + 保証会社 + 週3回見守り
```

### 表示しない項目

- 本人確認書類画像
- 通帳・残高証明画像
- 詳細な収入証明書類
- 詳細な職業事情
- 健康情報
- 家族・支援関係の細かい事情
- 過去の審査落ち履歴
- 詳細な見守り生活ログ

---

## 5. 同意種別

| Consent type | 目的 | 共有先 | 必須/任意 |
| --- | --- | --- | --- |
| `service_terms` | RentPass利用 | RentPass | 必須 |
| `privacy_policy` | 個人情報取扱い | RentPass | 必須 |
| `manager_review` | 管理会社による申込確認 | 管理会社 | 必須 |
| `owner_report_share` | オーナー向け入居安心レポート共有 | オーナー | 必須 |
| `guarantor_application` | 保証会社申込 | 保証会社 | 任意/条件次第 |
| `insurance_application` | 保険申込 | 保険会社 | 任意/条件次第 |
| `monitoring_service` | 見守りチェックイン | RentPass/支援先 | 見守り利用時必須 |
| `support_partner_share` | 居住支援法人・訪問先連携 | 支援法人/訪問パートナー | 任意/条件次第 |
| `payment_status_share` | 支払い/リザーブステータス共有 | 管理会社/オーナー | 前払い利用時必須 |

---

## 6. 同意の状態

| Status | 意味 |
| --- | --- |
| `not_requested` | まだ依頼していない |
| `requested` | 同意依頼中 |
| `granted` | 同意済み |
| `revoked` | 撤回済み |
| `expired` | 有効期限切れ |

### 同意履歴に残す項目

```text
consent_id
tenant_id
consent_type
status
scope
shared_with
purpose
version
agreed_at
revoked_at
expires_at
created_at
updated_at
```

---

## 7. UIへの反映

### 入居者向け「開示範囲設定」

- 管理会社に見せる情報
- オーナーに見せる情報
- 保証会社に提出する情報
- 保険会社に提出する情報
- 見守り/支援先に共有する情報

入居者には、細かい法務文言ではなく、以下のように説明します。

```text
オーナーには、通帳画像や本人確認書類そのものは表示されません。
オーナーには「確認済み」「対策済み」などの要約情報だけが共有されます。
```

### 管理会社向け

- 詳細書類を閲覧する場合は audit log 対象。
- オーナー共有前に「共有される項目」のプレビューを表示する。
- 同意がない第三者提供は送信不可。

### オーナー向け

- 入居安心レポートのみ閲覧。
- 共有URLには有効期限を設定。
- 詳細個人情報を表示しない。

---

## 8. 実装方針

- `DisclosureRole`
- `InformationCategory`
- `DisclosureLevel`
- `ConsentType`
- `ConsentStatus`
- `DISCLOSURE_MATRIX`

を `src/types/index.ts` に定義します。

## 完了条件

- 情報カテゴリ別マトリクスが定義されている。
- オーナーに表示してよい項目/表示しない項目が明確になっている。
- 同意種別と状態が定義されている。
- UI、RLS、APIレスポンスに落とし込める型がある。
