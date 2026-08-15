# RentPass: データモデル & データベース設計 (Data Model)

本ドキュメントでは、RentPassのエンティティ関係（ER）、テーブル定義、およびSupabase / PostgreSQLにおけるデータモデルを定義します。

---

## 1. エンティティ関連図 (Mermaid ERD)

```mermaid
erDiagram
    ORGANIZATIONS ||--o{ PROFILES : employs
    ORGANIZATIONS ||--o{ PROPERTIES : manages
    PROPERTIES ||--o{ UNITS : contains
    PROFILES ||--o{ APPLICATIONS : submits
    UNITS ||--o{ APPLICATIONS : targets
    APPLICATIONS ||--o| RENT_RESERVES : establishes
    APPLICATIONS ||--o| SAFETY_CHECKS : configures
    APPLICATIONS ||--o| RESIDUAL_GOODS_AGREEMENTS : binds
    APPLICATIONS ||--o{ EMERGENCY_CONTACTS : registers
    APPLICATIONS ||--o| GUARANTEE_CONTRACTS : links
    SAFETY_CHECKS ||--o{ SAFETY_LOGS : records
    APPLICATIONS ||--o{ AUDIT_LOGS : audits

    ORGANIZATIONS {
        uuid id PK
        string name
        string org_type "management | broker | landlord | support_entity"
        string corporate_number
        timestamp created_at
    }

    PROFILES {
        uuid id PK
        uuid organization_id FK
        string role "tenant | manager | broker | owner | admin"
        string full_name
        string full_name_kana
        string email
        string phone
        date birth_date
        string occupation_category
        jsonb solvency_metadata
        timestamp created_at
    }

    PROPERTIES {
        uuid id PK
        uuid organization_id FK
        uuid owner_profile_id FK
        string name
        string address
        string property_type
        timestamp created_at
    }

    UNITS {
        uuid id PK
        uuid property_id FK
        string room_number
        integer rent_amount
        integer management_fee
        string occupancy_status "vacant | applied | occupied"
        timestamp created_at
    }

    APPLICATIONS {
        uuid id PK
        uuid unit_id FK
        uuid tenant_profile_id FK
        string status "draft | submitted | condition_review | approved | active | terminated"
        integer target_rent
        integer proposed_reserve_months
        string proposed_reserve_plan "light | standard | premium"
        string safety_monitoring_tier "none | standard | strict"
        boolean residual_goods_agreed
        jsonb condition_package
        timestamp created_at
    }

    RENT_RESERVES {
        uuid id PK
        uuid application_id FK
        string provider_type "trust_bank | rent_guarantor | payment_gateway"
        string escrow_account_ref
        integer total_reserved_amount
        integer monthly_draw_amount
        integer remaining_months
        string status "pending_deposit | active | depleting | refunded | closed"
        timestamp last_disbursed_at
        timestamp created_at
    }

    SAFETY_CHECKS {
        uuid id PK
        uuid application_id FK
        string check_frequency "daily | every_2_days | weekly"
        time check_window_start
        time check_window_end
        string current_alert_level "level_0_ok | level_1_caution | level_2_warning | level_3_emergency"
        timestamp last_checked_in_at
        timestamp next_expected_check_at
        boolean is_active
        timestamp created_at
    }

    SAFETY_LOGS {
        uuid id PK
        uuid safety_check_id FK
        string check_channel "web | line | sms | iot_sensor"
        string status "checked_in | no_response | escalated | false_alarm | resolved"
        string notes
        timestamp recorded_at
    }

    EMERGENCY_CONTACTS {
        uuid id PK
        uuid application_id FK
        string name
        string relationship
        string phone
        string email
        integer priority_order
        boolean is_notified_on_warning
    }

    RESIDUAL_GOODS_AGREEMENTS {
        uuid id PK
        uuid application_id FK
        string agreement_version "mlit_2021_standard"
        string assignee_name
        string assignee_type "support_entity | relative | legal_representative"
        string electronic_signature_ref
        timestamp agreed_at
    }

    GUARANTEE_CONTRACTS {
        uuid id PK
        uuid application_id FK
        string guarantor_name "Casa | ZenHoren | JLease | NihonSafety"
        string contract_number
        string guarantee_plan
        string status "applied | approved | active | expired"
        integer annual_fee
    }

    AUDIT_LOGS {
        uuid id PK
        uuid application_id FK
        uuid performed_by FK
        string action_type
        jsonb details
        timestamp created_at
    }
```

---

## 2. セキュリティ & RLS (Row Level Security) 原則

1. **テナント分離**:
   入居者本人は自身のプロフィール、申請、安否ログ、リザーブ残高のみ閲覧・操作可能。
2. **管理会社スコープ**:
   自組織（Organization）が管理する物件・ユニット・申請・安否アラートのすべてを操作可能。
3. **オーナー権限**:
   自身が所有する物件に紐づくリザーブ保全状況および稼働状況を読み取り可能。
4. **個人情報保護**:
   機密情報（身分証、生年月日、口座番号）は暗号化フィールドに格納し、監査ログでアクセス履歴を追跡。
