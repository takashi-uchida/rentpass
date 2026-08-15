-- ====================================================================
-- RentPass Core Database Schema
-- Version: 1.0.0
-- Created: 2026-08-15
-- Description: Initial migration for RentPass rental risk management SaaS
-- ====================================================================

-- 1. Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM types
CREATE TYPE user_role AS ENUM ('tenant', 'manager', 'broker', 'owner', 'admin');
CREATE TYPE organization_type AS ENUM ('management', 'broker', 'landlord', 'support_entity');
CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'condition_review', 'approved', 'active', 'terminated');
CREATE TYPE reserve_plan AS ENUM ('light', 'standard', 'premium');
CREATE TYPE reserve_status AS ENUM ('pending_deposit', 'active', 'depleting', 'refunded', 'closed');
CREATE TYPE alert_level AS ENUM ('level_0_ok', 'level_1_caution', 'level_2_warning', 'level_3_emergency');
CREATE TYPE safety_frequency AS ENUM ('daily', 'every_2_days', 'weekly');
CREATE TYPE safety_channel AS ENUM ('web', 'line', 'sms', 'iot_sensor');
CREATE TYPE safety_log_status AS ENUM ('checked_in', 'no_response', 'escalated', 'false_alarm', 'resolved');
CREATE TYPE occupancy_status AS ENUM ('vacant', 'applied', 'occupied');

-- 3. Organizations (Management companies, Brokers, Support entities)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    org_type organization_type NOT NULL DEFAULT 'management',
    corporate_number VARCHAR(20),
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. User Profiles (Tenants, PM Managers, Brokers, Owners)
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    role user_role NOT NULL DEFAULT 'tenant',
    full_name VARCHAR(100) NOT NULL,
    full_name_kana VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    birth_date DATE,
    occupation_category VARCHAR(100),
    solvency_metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Properties & Units
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    owner_profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    property_type VARCHAR(50) DEFAULT 'apartment',
    total_units INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    room_number VARCHAR(50) NOT NULL,
    rent_amount INTEGER NOT NULL,
    management_fee INTEGER NOT NULL DEFAULT 0,
    occupancy_status occupancy_status NOT NULL DEFAULT 'vacant',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Applications (RentPass Applications & Condition Packages)
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
    tenant_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status application_status NOT NULL DEFAULT 'draft',
    target_rent INTEGER NOT NULL,
    proposed_reserve_months INTEGER DEFAULT 6,
    proposed_reserve_plan reserve_plan DEFAULT 'standard',
    safety_monitoring_frequency safety_frequency DEFAULT 'daily',
    residual_goods_agreed BOOLEAN DEFAULT FALSE,
    condition_package JSONB DEFAULT '{}'::jsonb,
    verification_qr_token VARCHAR(255) UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Rent Reserves (Escrow / Trust & Guarantor balances)
CREATE TABLE rent_reserves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID UNIQUE NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    provider_type VARCHAR(100) NOT NULL DEFAULT 'trust_bank',
    escrow_account_ref VARCHAR(100),
    total_reserved_amount INTEGER NOT NULL DEFAULT 0,
    monthly_draw_amount INTEGER NOT NULL DEFAULT 0,
    remaining_months INTEGER NOT NULL DEFAULT 0,
    status reserve_status NOT NULL DEFAULT 'pending_deposit',
    last_disbursed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Safety Checks & Monitoring Logs
CREATE TABLE safety_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID UNIQUE NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    check_frequency safety_frequency NOT NULL DEFAULT 'daily',
    check_window_start TIME NOT NULL DEFAULT '08:00:00',
    check_window_end TIME NOT NULL DEFAULT '12:00:00',
    current_alert_level alert_level NOT NULL DEFAULT 'level_0_ok',
    last_checked_in_at TIMESTAMPTZ,
    next_expected_check_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE safety_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    safety_check_id UUID NOT NULL REFERENCES safety_checks(id) ON DELETE CASCADE,
    check_channel safety_channel NOT NULL DEFAULT 'web',
    status safety_log_status NOT NULL DEFAULT 'checked_in',
    notes TEXT,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Emergency Contacts
CREATE TABLE emergency_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    priority_order INTEGER NOT NULL DEFAULT 1,
    is_notified_on_warning BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Residual Goods Agreements (国交省残置物処理モデル契約条項)
CREATE TABLE residual_goods_agreements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID UNIQUE NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    agreement_version VARCHAR(50) NOT NULL DEFAULT 'mlit_2021_standard',
    assignee_name VARCHAR(100) NOT NULL,
    assignee_type VARCHAR(50) NOT NULL DEFAULT 'support_entity',
    electronic_signature_ref VARCHAR(255),
    agreed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Guarantee Contracts (家賃保証会社連携)
CREATE TABLE guarantee_contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID UNIQUE NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    guarantor_name VARCHAR(100) NOT NULL,
    contract_number VARCHAR(100),
    guarantee_plan VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'applied',
    annual_fee INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
    performed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Enable Row Level Security (RLS)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE rent_reserves ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE residual_goods_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE guarantee_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 14. Basic RLS Policies
CREATE POLICY "Public profiles can be viewed by authenticated users" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Applications viewable by tenant or management org" ON applications
    FOR ALL USING (
        auth.uid() = tenant_profile_id OR 
        EXISTS (
            SELECT 1 FROM units u 
            JOIN properties p ON p.id = u.property_id
            JOIN profiles pm ON pm.organization_id = p.organization_id
            WHERE u.id = applications.unit_id AND pm.id = auth.uid()
        )
    );
