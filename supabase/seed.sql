-- ====================================================================
-- RentPass Seed Data
-- ====================================================================

-- 1. Insert Organizations
INSERT INTO organizations (id, name, org_type, corporate_number, phone, email, address) VALUES
('11111111-1111-1111-1111-111111111111', '東京プロパティマネジメント株式会社', 'management', '1234567890123', '03-1234-5678', 'info@tokyo-pm.co.jp', '東京都港区南青山2-1-1'),
('22222222-2222-2222-2222-222222222222', 'イーストエステート仲介', 'broker', '9876543210987', '03-9876-5432', 'contact@east-estate.jp', '東京都新宿区新宿3-2-1'),
('33333333-3333-3333-3333-333333333333', '特定非営利活動法人 日本居住支援ネットワーク', 'support_entity', '4567890123456', '03-5555-4444', 'support@residence-aid.or.jp', '東京都千代田区神田錦町1-1');

-- 2. Insert Profiles
INSERT INTO profiles (id, organization_id, role, full_name, full_name_kana, email, phone, birth_date, occupation_category, solvency_metadata) VALUES
-- PM Manager
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'manager', '山田 剛 (管理部)', 'ヤマダ ツヨシ', 'yamada@tokyo-pm.co.jp', '090-1111-2222', '1982-05-10', '会社員', '{}'),
-- Owner
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', NULL, 'owner', '鈴木 一朗 (物件オーナー)', 'スズキ イチロウ', 'suzuki.owner@example.com', '090-3333-4444', '1960-03-15', '不動産賃貸業', '{}'),
-- Tenant 1 (Senior Tenant - Tanaka Taro)
('cccccccc-cccc-cccc-cccc-cccccccccccc', NULL, 'tenant', '田中 太郎', 'タナカ タロウ', 'tanaka.taro@example.com', '090-5555-6666', '1954-04-12', '年金受給者 (単身シニア)', '{"pension_monthly": 180000, "savings_bracket": "5M_to_10M", "verification_status": "verified"}'::jsonb),
-- Tenant 2 (Nightlife / Freelance - Sato Kenichi)
('dddddddd-dddd-dddd-dddd-dddddddddddd', NULL, 'tenant', '佐藤 健一', 'サトウ ケンイチ', 'sato.kenichi@example.com', '090-7777-8888', '1998-09-20', '個人事業主 / ナイトワーク', '{"monthly_income_avg": 850000, "savings_bracket": "10M_plus", "verification_status": "verified"}'::jsonb);

-- 3. Insert Properties & Units
INSERT INTO properties (id, organization_id, owner_profile_id, name, address, property_type, total_units) VALUES
('e1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'サンライズレジデンス三軒茶屋', '東京都世田谷区三軒茶屋1-10-5', 'apartment', 12),
('e2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'プレール青山', '東京都港区南青山3-15-8', 'condominium', 20);

INSERT INTO units (id, property_id, room_number, rent_amount, management_fee, occupancy_status) VALUES
('u1111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', '203', 75000, 5000, 'occupied'),
('u2222222-2222-2222-2222-222222222222', 'e2222222-2222-2222-2222-222222222222', '402', 130000, 10000, 'applied');

-- 4. Insert Applications
INSERT INTO applications (id, unit_id, tenant_profile_id, status, target_rent, proposed_reserve_months, proposed_reserve_plan, safety_monitoring_frequency, residual_goods_agreed, condition_package) VALUES
-- Senior Application
('app11111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'active', 75000, 6, 'standard', 'daily', TRUE, '{"score": "A+", "trust_guarantee": "Casa Safety Plan", "escalation_support": "NPO Residence Aid"}'::jsonb),
-- Nightlife Application
('app22222-2222-2222-2222-222222222222', 'u2222222-2222-2222-2222-222222222222', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'condition_review', 130000, 6, 'premium', 'weekly', TRUE, '{"score": "AAA", "trust_guarantee": "Resona Escrow Trust", "reserve_secured": true}'::jsonb);

-- 5. Insert Rent Reserves
INSERT INTO rent_reserves (id, application_id, provider_type, escrow_account_ref, total_reserved_amount, monthly_draw_amount, remaining_months, status, last_disbursed_at) VALUES
('r1111111-1111-1111-1111-111111111111', 'app11111-1111-1111-1111-111111111111', 'rent_guarantor', 'CASA-DIRECT-884920', 480000, 80000, 5, 'active', NOW() - INTERVAL '10 days'),
('r2222222-2222-2222-2222-222222222222', 'app22222-2222-2222-2222-222222222222', 'trust_bank', 'RESONA-ESCROW-2026-0912', 840000, 140000, 6, 'pending_deposit', NULL);

-- 6. Insert Safety Checks & Logs
INSERT INTO safety_checks (id, application_id, check_frequency, check_window_start, check_window_end, current_alert_level, last_checked_in_at, next_expected_check_at, is_active) VALUES
('s1111111-1111-1111-1111-111111111111', 'app11111-1111-1111-1111-111111111111', 'daily', '08:00:00', '12:00:00', 'level_0_ok', NOW() - INTERVAL '2 hours', NOW() + INTERVAL '22 hours', TRUE);

INSERT INTO safety_logs (id, safety_check_id, check_channel, status, notes, recorded_at) VALUES
(uuid_generate_v4(), 's1111111-1111-1111-1111-111111111111', 'web', 'checked_in', '「元気です」ワンタップ確認', NOW() - INTERVAL '2 hours'),
(uuid_generate_v4(), 's1111111-1111-1111-1111-111111111111', 'line', 'checked_in', 'LINE挨拶応答', NOW() - INTERVAL '1 day 2 hours'),
(uuid_generate_v4(), 's1111111-1111-1111-1111-111111111111', 'web', 'checked_in', '「元気です」ワンタップ確認', NOW() - INTERVAL '2 days 2 hours');

-- 7. Insert Emergency Contacts
INSERT INTO emergency_contacts (id, application_id, name, relationship, phone, email, priority_order, is_notified_on_warning) VALUES
(uuid_generate_v4(), 'app11111-1111-1111-1111-111111111111', '田中 一郎', '長男', '090-8888-9999', 'ichiro.tanaka@example.com', 1, TRUE),
(uuid_generate_v4(), 'app22222-2222-2222-2222-222222222222', '佐藤 和美', '母', '090-7777-6666', 'kazumi.sato@example.com', 1, TRUE);

-- 8. Insert Residual Goods Agreements
INSERT INTO residual_goods_agreements (id, application_id, agreement_version, assignee_name, assignee_type, electronic_signature_ref, agreed_at) VALUES
(uuid_generate_v4(), 'app11111-1111-1111-1111-111111111111', 'mlit_2021_standard', '特定非営利活動法人 日本居住支援ネットワーク', 'support_entity', 'SIGN-SHA256-MLIT-TANAKA-2026', NOW() - INTERVAL '30 days');
